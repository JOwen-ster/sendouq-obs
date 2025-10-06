import { NextResponse } from "next/server";

function extractMembers(data: any): { alpha: MemberInfo[]; bravo: MemberInfo[] } {
    const pickFields = (member: any): MemberInfo => ({
        username: member.username,
        discordId: member.discordId,
        discordAvatar: member.discordAvatar,
        inGameName: member.inGameName ?? null, // undefined -> null (always resent in JSON)
        plusTier: member.plusTier, // can be undefined (only present if isPlus = true - isPlus is always defined)
    });

    return {
        alpha: data.groupAlpha.members.map(pickFields),
        bravo: data.groupBravo.members.map(pickFields),
    };
}

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;

    try {
        const res = await fetch(`https://sendou.ink/q/match/${id}?_data`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
        }

        const data = await res.json();

        // Extract member
        const members = extractMembers(data);

        return NextResponse.json(members);
    } catch (err) {
        return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
    }
}
