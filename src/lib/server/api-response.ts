import { NextResponse } from "next/server";

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

export function ok<T extends JsonValue>(data: T, init?: ResponseInit) {
  return NextResponse.json({ success: true, data }, { status: 200, ...init });
}

export function fail(message: string, status = 400, details?: JsonValue) {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        details: details ?? null,
      },
    },
    { status },
  );
}
