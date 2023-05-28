import { addItem, listItem } from "@/database";
import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/d1";
import { users } from "@/schema/schema";

export async function GET(request: Request) {
  console.log("process.env.DB:", process.env.DB);
  const db = drizzle(process.env.DB as any);
  const data = await db.select().from(users).all();
  // const data = listItem();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const data = (await request.json()) as { item: string };
  // addItem(data.item);
  const db = drizzle(process.env.DB as any);
  await db
    .insert(users)
    .values({ name: data.item, email: `${data.item}@gmail.com` })
    .all();
  return NextResponse.json(null);
}
