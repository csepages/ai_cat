"use client";

import { useState } from "react";

export default function Home() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setResponse(""); // Clear previous response

        const res = await fetch("http://localhost:4000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt }),
        });

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        if (!reader) return;

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            setResponse((prev) => prev + decoder.decode(value));
        }
    };

    return (
        <main style={{ padding: "20px" }}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Ask Neko something..."
                    style={{ padding: "10px", width: "300px" }}
                />
                <button type="submit" style={{ marginLeft: "10px" }}>Send</button>
            </form>
            <div style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
                {response}
            </div>
        </main>
    );
}
