---
summary: "A room-based listening experience where friends share YouTube tracks, control playback together, and decide what plays next."
---

## The problem

Sending the same video link to a group is easy. Getting everyone to the same moment is not. Each browser has its own YouTube player, its own buffering behavior, and its own playback clock. A useful listening room also needs shared context around the video: who is in the room, what is queued, and what the group wants to hear next.

Music Adda turns that into a shared-room problem. A host creates a room and shares its link; listeners join without creating accounts. Every browser plays YouTube locally, while the app coordinates room state.

## The product approach

The room is the main unit of collaboration. People can add YouTube links, vote on queued tracks, chat, send reactions, and revisit session history. Hosts can control playback and grant host access to other listeners. If every host disconnects, a connected listener is promoted.

The queue avoids duplicate rows for the same video. Adding a track that is already playing or queued increments its repeat count instead. Voting is open to everyone, and tracks are ordered by votes, with add time breaking ties.

Music Adda also supports study rooms. They keep the shared video, chat, and reactions, and add PDF sharing through MongoDB GridFS.

## Architecture: each browser plays, the server coordinates

The client embeds the YouTube IFrame Player API; it does not send media through the app server. React and Vite power the frontend, while an Express server exposes room creation and Socket.io handles live room events.

The server keeps active room state in an in-memory `Map`. MongoDB persistence is optional and writes in the background, so live room updates do not wait for a database round trip. Without a Mongo connection, rooms still work but are reset when the server restarts.

Most room changes are sent to clients as a complete `sync-state` snapshot. Clients replace their local room state with that snapshot instead of applying a sequence of partial patches. Chat uses its own event so each message does not resend the full room.

## Playback sync: store an anchor, not a ticking clock

The playback state is small:

```js
{
  isPlaying,
  timestamp,
  updatedAt
}
```

`timestamp` is the player position when the host last changed playback. `updatedAt` records when the server stored that change. While a track is playing, a client estimates the current position as:

```js
const expected = isPlaying
  ? timestamp + (Date.now() - updatedAt) / 1000
  : timestamp;
```

That gives a late joiner a position to seek to without the server broadcasting a new timestamp every second. Followers also check for playback drift every four seconds and seek when they are more than 1.5 seconds away from the expected position. It is intentionally approximate rather than frame-perfect.

## Challenges I worked through

### Keeping host permissions current

The YouTube player registers a state-change callback when it is created. A callback that captures an old `isHost` value can miss a later host promotion. I keep the current host status and room state in refs so the registered callback reads the latest values.

### Waiting for the player and the room

Socket room state and the YouTube iframe can become ready in either order. If the track arrives before the iframe is ready, an effect can run without a player to control. A `playerReady` flag lets the track-loading effect run again once the iframe is available.

### Handling reconnects without duplicating a listener

The client identity is stored in `localStorage`, rather than `sessionStorage`, so a browser reload can keep the same listener identity. This matters on mobile browsers that may reload a backgrounded tab.

### Preventing repeated queue advances

More than one host can report that a track ended. The server ignores duplicate `track-ended` events arriving within a short three-second window, which prevents a single end from advancing the queue multiple times.

## Trade-offs

- **One server process owns the live room map.** This keeps the real-time path straightforward, but a multi-instance deployment would need shared room state and a Socket.io adapter.
- **MongoDB persistence is best-effort.** Writes run in the background to keep database latency out of live interactions. A failed write can mean a room update is not saved across a restart.
- **Full snapshots favor simplicity over bandwidth.** Clients get a consistent room state, but unchanged queue or history data can be resent.
- **Client clocks are part of the sync estimate.** The server records `updatedAt`, while followers compare it with their own `Date.now()`. A clock offset between devices can affect the estimate; the current drift check uses the same time basis.
- **Browser identity is not account authentication.** Music Adda does not require accounts for listeners, so a stored client ID provides continuity, not proof of a real-world identity.

## What I learned

Real-time collaboration is less about sending more events and more about deciding which state is authoritative. Music Adda keeps that authority on the server, sends snapshots when room state changes, and uses a timestamped playback anchor so each browser can estimate where the video should be.

That design keeps the product approachable—create a room, share a link, start listening—while making its constraints visible. If the system needed to scale across multiple server instances, the room-state and clock assumptions would be the first things I would revisit.
