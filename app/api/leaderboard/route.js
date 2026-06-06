import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

const DB_NAME = "portfolio";
const COLLECTION = "leaderboard";

// GET — Fetch top 10 scores
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const scores = await db
      .collection(COLLECTION)
      .find({})
      .sort({ score: -1 })
      .limit(10)
      .toArray();

    // Serialize _id to string
    const serialized = scores.map((s) => ({
      ...s,
      _id: s._id.toString(),
    }));

    return NextResponse.json(serialized, { status: 200 });
  } catch (error) {
    console.error("Leaderboard GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}

// POST — Submit a new score
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, score } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }
    if (typeof score !== "number" || score < 0) {
      return NextResponse.json(
        { error: "Valid score is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const entry = {
      name: name.trim().substring(0, 20), // Cap name at 20 chars
      score,
      date: new Date(),
    };

    await db.collection(COLLECTION).insertOne(entry);

    return NextResponse.json(
      { message: "Score submitted!", entry: { ...entry, _id: undefined } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Leaderboard POST error:", error);
    return NextResponse.json(
      { error: "Failed to submit score" },
      { status: 500 }
    );
  }
}
