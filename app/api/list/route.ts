import { addItem, listItem } from "@/database";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: Request) {
  const data = listItem();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const data = await request.json();
  addItem(data.item);
  revalidateTag("list");
  return NextResponse.json(null);
}
