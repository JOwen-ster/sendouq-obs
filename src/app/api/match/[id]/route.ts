import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    try {
        const res = await fetch(`https://sendou.ink/match/${id}?_data`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
        }

        const data = await res.json();
        console.log(data)
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
    }
}
