/* eslint-disable @typescript-eslint/no-explicit-any */
// /app/api/agent-chat/route.ts
import { NextResponse } from "next/server";
import { processAgentMessage } from "@/lib/agent";

export async function POST(request: Request) {
  try {
    const { message, data } = await request.json();
    if (!message || !data || typeof message !== "string") {
      return NextResponse.json(
        { error: "Invalid request: missing or invalid 'message' field." },
        { status: 400 }
      );
    }
    const responseText = await processAgentMessage(message, data);
    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    console.error("Error in /api/agent-chat:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
