import { NextResponse } from "next/server";
import { listSymptoms } from "@/lib/recommender";

export const runtime = "edge";

export function GET() {
  return NextResponse.json({ symptoms: listSymptoms() });
}
