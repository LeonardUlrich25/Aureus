import { NextResponse } from "next/server";

type ReqBody = {
  prompt: string;
  max_tokens?: number;
};

export async function POST(req: Request) {
  try {
    const { prompt, max_tokens }: ReqBody = await req.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;
    const model = process.env.CLAUDE_MODEL || "claude-2";

    if (!apiKey) {
      return NextResponse.json({ error: "Missing ANTHROPIC_API_KEY" }, { status: 500 });
    }

    const body = {
      model,
      prompt,
      max_tokens: max_tokens ?? 300,
      temperature: 0.2,
    };

    const resp = await fetch("https://api.anthropic.com/v1/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return NextResponse.json({ error: text }, { status: resp.status });
    }

    const data = await resp.json();
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 });
  }
}
