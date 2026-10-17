---
title: "How Music Adda Keeps YouTube Playback in Sync"
description: "How Music Adda uses React, Socket.io, and MongoDB to sync YouTube playback—and what the design’s trade-offs are."
excerpt: "Sharing a YouTube link is easy. Getting everyone to hear the same moment is harder. Here’s how Music Adda models room state, syncs playback, and handles drift."
date: "2026-10-17"
tags:
  - socket-io
  - react
  - nodejs
  - real-time
  - youtube-iframe-api
---

# How Music Adda Keeps YouTube Playback in Sync

Sharing a YouTube link sounds like the easy part of building a group listening room: paste a link, let everyone open it, and press play.

But that doesn’t mean everyone is listening together. One person might be halfway through the song while another is still loading it. The real challenge is coordinating the shared state: which track is playing, whether playback is paused, and where listeners should be in the video.

Music Adda tackles that problem with React, Vite, Express, Socket.io, and MongoDB. This post explains the room model, the playback-sync approach, and the trade-offs behind it.

## The architecture

A room contains its listeners, queue, current track, playback state, chat, and history. Each browser plays its own YouTube video; the server coordinates what those browsers should play.

- **Frontend:** React with Vite. Each browser embeds a YouTube player through the IFrame Player API.
- **Backend:** Express handles a small REST surface, such as creating and checking rooms. Socket.io handles real-time interactions.
- **Database:** MongoDB, accessed through Mongoose, is used for persistence.

The server doesn’t stream or relay the audio or video. Each listener’s browser loads the video from YouTube. The server coordinates the shared room state.

## Sharing a link isn’t the same as syncing playback

Adding a track starts with a request. The client emits `add-to-queue` with a URL, and the server extracts the YouTube video ID:

```js
const YOUTUBE_ID_REGEX =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

export function extractYoutubeId(url) {
  if (typeof url !== "string") return null;
  const match = url.trim().match(YOUTUBE_ID_REGEX);
  return match ? match[1] : null;
}
```

The server then requests the title and thumbnail from YouTube’s public oEmbed endpoint, which doesn’t require an API key. If that request fails, the track gets the fallback title “Untitled” and a thumbnail URL based on the video ID. A temporary metadata failure therefore doesn’t have to block adding the track to the queue.

The stored track details include its video ID, title, thumbnail, and who added it. That makes the track available to the room, but it doesn’t move anyone’s player. Playback synchronization is a separate part of the system.

## One room state, sent as a snapshot

Most room changes—joining, adding a track, voting, skipping, playing, or pausing—follow the same general path on the server:

1. Validate the input and check permissions.
2. Update the room in memory.
3. Broadcast a `sync-state` event with the current room state.

```js
function broadcastState(io, roomId) {
  const room = getRoom(roomId);
  if (!room) return;
  io.to(roomId).emit("sync-state", serializeRoom(room));
}
```

On the client, the `useRoomSocket` hook replaces its local room state when it receives a snapshot. The client doesn’t have to merge a series of small room-state patches.

This approach is straightforward, but it can send information a client already has, such as the queue and history. Chat is handled separately through `chat-message`, so each new chat message doesn’t require broadcasting the entire room state.

Identity is sent during the Socket.io handshake. The client generates a UUID, stores it in `localStorage`, and sends it when connecting. Middleware validates the ID and saves it to `socket.data`:

```js
io.use((socket, next) => {
  const clientId = validateClientId(socket.handshake.auth?.clientId);

  if (!clientId) {
    return next(new Error("Invalid or missing clientId in auth"));
  }

  socket.data.clientId = clientId;
  next();
});
```

Handlers read the client ID from `socket.data` instead of trusting an identity supplied in each event payload. This makes the identity consistent throughout the connection. It is worth being precise about what this does **not** provide: it’s an identity mechanism, not account-based authentication. Rooms don’t have user accounts.

## How playback stays in sync

The host’s player reports its state and current playback time. For example, when playback starts or pauses, the client calls the corresponding action:

```js
if (!isHostRef.current) return;

if (e.data === YT.PlayerState.PLAYING) {
  actions.play(playerRef.current.getCurrentTime());
} else if (e.data === YT.PlayerState.PAUSED) {
  actions.pause(playerRef.current.getCurrentTime());
}
```

On the server, `setPlayback` checks that the sender is a host before updating the room’s playback state:

```js
export function setPlayback(roomId, clientId, { isPlaying, timestamp }) {
  const room = rooms.get(roomId);
  if (!room) return null;
  if (!room.hostClientIds.has(clientId)) return null;

  room.playbackState = {
    isPlaying: isPlaying ?? room.playbackState.isPlaying,
    timestamp:
      typeof timestamp === "number" &&
      Number.isFinite(timestamp) &&
      timestamp >= 0
        ? timestamp
        : room.playbackState.timestamp,
    updatedAt: Date.now(),
  };

  persist(room);
  return room;
}
```

Instead of sending the playback position every second, the server stores a small anchor:

```js
{
  isPlaying,
  timestamp,
  updatedAt
}
```

Here, `timestamp` is the player position when the host last acted, and `updatedAt` is when the server recorded that state. A listener can estimate the current position like this:

```js
const { isPlaying, timestamp, updatedAt } = state.playbackState;

const expected = isPlaying
  ? timestamp + (Date.now() - updatedAt) / 1000
  : timestamp;
```

In plain English: **start with the saved position, then add the time that has passed since it was recorded.** If playback is paused, the saved position stays fixed.

The same calculation lets someone joining mid-song seek to the expected position:

```js
useEffect(() => {
  if (isHost) return;

  const player = playerRef.current;
  if (!player || !state?.currentTrack || !player.seekTo) return;

  const { isPlaying, timestamp, updatedAt } = state.playbackState;

  const expected = isPlaying
    ? timestamp + (Date.now() - updatedAt) / 1000
    : timestamp;

  player.seekTo(expected, true);

  if (isPlaying) {
    player.playVideo();
  } else {
    player.pauseVideo();
  }
}, [/* dependencies omitted */]);
```

Players can drift because of buffering or differences between devices. Followers check their position every four seconds and seek back when the difference is greater than 1.5 seconds:

```js
const id = setInterval(() => {
  const player = playerRef.current;
  if (!player || !player.getCurrentTime) return;

  const { timestamp, updatedAt } = state.playbackState;
  const expected = timestamp + (Date.now() - updatedAt) / 1000;
  const drift = Math.abs(player.getCurrentTime() - expected);

  if (drift > 1.5) {
    player.seekTo(expected, true);
  }
}, 4000);
```

This is approximate synchronization, not frame-perfect playback. The tolerance helps avoid constantly seeking over small differences, which could make playback feel jumpy.

## Hosts and handoffs

Playback controls are gated by `hostClientIds`, a set rather than a single host ID. That allows more than one host at a time. If a host disconnects, their ID is removed. If no connected host remains, the next connected user is promoted:

```js
user.connected = false;
room.hostClientIds.delete(clientId);

if (!hasConnectedHost(room)) {
  const nextUser = Array.from(room.users.entries()).find(
    ([, user]) => user.connected
  );

  if (nextUser) {
    room.hostClientIds.add(nextUser[0]);
  }
}
```

This helps ensure the room still has someone who can control playback. Voting and chat are available to everyone. Removing a queued track is limited to a host or the person who added it.

## Queue voting and duplicate tracks

Each queued item has a `votes` array of client IDs. Voting toggles a client’s ID in that array. The queue is sorted by vote count, with the time the track was added breaking ties. When a track is skipped or ends, the next item comes from the front of the queue.

If someone adds a track that is already playing or queued, Music Adda increments its repeat counter instead of adding another row. When a track ends, the server checks that counter before advancing.

The server also ignores `track-ended` events that arrive within three seconds of the previous one. Since any host’s player can report the end of a track, multiple hosts could send duplicate events. The guard helps prevent those duplicate reports from advancing the queue repeatedly.

## Three client-side issues I had to account for

### A stale host-status closure

The YouTube player registers its `onStateChange` callback once, when it mounts. That callback can capture the value of `isHost` from that moment. If the client is promoted to host later, the callback may still behave as if it isn’t a host, so its play, pause, and ended events won’t be sent to the server.

The fix was to keep the latest host status and room state in refs, updated by effects:

```js
const isHostRef = useRef(isHost);

useEffect(() => {
  isHostRef.current = isHost;
}, [isHost]);

const stateRef = useRef(state);

useEffect(() => {
  stateRef.current = state;
}, [state]);
```

The registered callback can then read the current values from those refs.

### Room state arriving before the player is ready

Room state can arrive before the YouTube iframe has finished loading. If an effect tries to load the current track while the player is still `null`, it can do nothing. If the track ID doesn’t change afterward, the effect may not run again, leaving the joiner with an empty player.

A `playerReady` state flag addresses that timing issue. Once the player reports that it’s ready, the effect runs again with the player available.

### A client identity that changed after reload

The client identity was originally stored in `sessionStorage`. In my testing, mobile browsers could reload backgrounded tabs, generating a new identity and making one person appear multiple times in the listener list. Moving the ID to `localStorage` kept it available across those reloads.

## Trade-offs and what I’d improve next

- **Client clock assumptions:** `updatedAt` is recorded using the server’s `Date.now()`, while followers compare it with their own clocks. If a listener’s device clock is off, the estimated position can be off too. The drift check uses the same calculation, so it doesn’t independently correct that issue. One possible future improvement—not implemented here—would be to estimate the client’s offset from the server clock and account for it.
- **Single-process room state:** The in-memory `Map` keeps room updates out of the database path, but each room belongs to one server process. Supporting multiple server instances would require shared room state and an appropriate Socket.io adapter.
- **Best-effort persistence:** Room mutations trigger a background upsert of the room document without waiting for the write to finish. That keeps persistence out of the immediate real-time path, but a failed write is only logged. Rewriting the whole document each time can also become more expensive as chat and history grow. Those collections are capped at 200 messages and 50 history items.
- **Full-state broadcasts:** Sending snapshots keeps the client update path simple, but can resend unchanged data.
- **Room eviction:** A periodic cleanup evicts empty rooms after a time-to-live and deletes their saved copies. That timeout determines how long a room remains available after everyone leaves.

## Takeaway

For a feature where everyone needs to see or hear the same thing, two choices did most of the work in Music Adda: keep one authoritative room state on the server, and store a playback position together with the time it was recorded. Each client can use that anchor to estimate where playback should be now.

Sharing a link is the easy part. Making a room feel like one shared listening session takes a clear state model, a sync strategy, and careful handling of timing issues in both the browser and the player. Music Adda’s approach is intentionally approximate; clock differences and single-process state are limitations I’d address as the system grows.
