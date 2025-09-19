"use client";

import { useState } from "react";

export default function FullMatch() {
    const [matchId, setMatchId] = useState("");
    const [data, setData] = useState<MembersResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleFetch() {
        if (!matchId) return;
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const res = await fetch(`/api/match/${matchId}`);
            if (!res.ok) throw new Error("Failed to fetch data");
            const json = await res.json();
            setData(json);
        } catch {
            setError("Could not load match data.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Enter Match ID"
                    value={matchId}
                    onChange={(e) => setMatchId(e.target.value)}
                    className="border rounded-xl px-3 py-2 flex-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                    onClick={handleFetch}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                >
                    Get Match
                </button>
            </div>

            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {data && (
                <div className="space-y-10">
                    <Group title="Group Alpha" color="text-yellow-300" members={data.alpha} />
                    <Group title="Group Bravo" color="text-blue-600" members={data.bravo} />
                </div>
            )}
        </div>
    );
}

function Group({
    title,
    color,
    members,
}: {
    title: string;
    color: string;
    members: MemberInfo[];
}) {
    return (
        <div>
            <h2 className={`text-xl font-bold mb-4 ${color}`}>{title}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((member) => (
                    <MemberCard key={member.discordId} member={member} />
                ))}
            </div>
        </div>
    );
}

function MemberCard({ member }: { member: MemberInfo }) {
    return (
        <div className="rounded-2xl shadow-md p-4 bg-white flex items-center space-x-4">
            <img
                src={`https://cdn.discordapp.com/avatars/${member.discordId}/${member.discordAvatar}.png`}
                alt={member.username}
                className="w-12 h-12 rounded-full"
            />
            <div>
                <p className="font-semibold">{member.username}</p>
                <p className="text-sm text-gray-500">{member.inGameName ?? "N/A"}</p>
                <p className="text-sm text-gray-900">DCID:{member.discordId}</p>
                {member.plusTier && (
                    <p className="text-xs text-purple-600">+{member.plusTier}</p>
                )}
            </div>
        </div>
    );
}
