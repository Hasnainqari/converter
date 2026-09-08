import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "convertly",
    time: new Date().toISOString(),
  });
}
