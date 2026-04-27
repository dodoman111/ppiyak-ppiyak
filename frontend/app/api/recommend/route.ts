import { NextResponse } from "next/server";
import { recommend } from "@/lib/recommender";

export const runtime = "edge";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "잘못된 요청 본문입니다." },
      { status: 400 },
    );
  }

  const symptoms =
    body &&
    typeof body === "object" &&
    Array.isArray((body as { symptoms?: unknown }).symptoms)
      ? ((body as { symptoms: unknown[] }).symptoms.filter(
          (s): s is string => typeof s === "string",
        ) as string[])
      : [];

  return NextResponse.json(recommend(symptoms));
}
