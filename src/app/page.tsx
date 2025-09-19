"use client";

import { useState } from "react";

interface User {
  id: number;
  username: string;
  discordId: string;
}

export default function HomePage() {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState<string | null>(null);

  async function fetchUser(name: string) {
    try {
      const res = await fetch(`/api/users/${name}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();

      if (data?.user && !users.some((u) => u.discordId === data.user.discordId)) {
        setUsers([
          ...users,
          {
            id: data.user.id,
            username: data.user.username,
            discordId: data.user.discordId,
          },
        ]);
        setUsername(data.user.username);
      }
    } catch (err) {
      // send toast that user does not exist
      console.error(err);
    }
  }

  async function fetchMatch(id: number) {
    try {
      const res = await fetch(`/api/users/${id}`);
      const data = await res.json();
      console.log(data)
    } catch ( err ) {
      console.error(err);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Sendou User Lookup</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            fetchUser(input.trim());
          }
        }}
        className="flex gap-2 mb-6"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter Sendou username"
          className="px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 font-medium"
        >
          Search
        </button>
      </form>

      {username && (
        <div className="w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2">
            Result for <span className="text-blue-400">{username}</span>
          </h2>
          <ul className="space-y-2">
            {users.length > 0 ? (
              users.map((u) => (
                <li
                  key={u.id}
                  className="p-3 rounded-xl bg-gray-800 border border-gray-700 flex justify-between"
                >
                  <span>{u.username}</span>
                  <span className="text-gray-400 text-sm">{u.discordId}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-400">No users found</li>
            )}
          </ul>
        </div>
      )}
    </main>
  );
}
