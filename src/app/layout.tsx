// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
    title: "Sendou User Lookup",
    description: "Fetch usernames and Discord IDs from sendou.ink",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-gray-950 text-white"><ToastContainer />{children}</body>
        </html>
    );
}
