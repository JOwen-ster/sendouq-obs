import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    context: { params: Promise<{ username: string }> }
) {
    const { username } = await context.params;

    try {
        const res = await fetch(`https://sendou.ink/u/${username}?_data`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: "Error fetching" }, { status: 500 });
    }
}
