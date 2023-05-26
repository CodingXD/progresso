import { listItem } from "@/database";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = listItem();
  return NextResponse.json(data);
}
