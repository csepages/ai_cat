import { responder } from "./utils/responder";
import express from "express";
import cors from "cors";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.post("/chat", async (req:any, res:any) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
    }

    try {
        const responseText = await responder(prompt); 
        res.json({ response: responseText });
    } catch (error) {
        console.error("Error in /chat route:", error);
        res.status(500).json({ error: "Something went wrong", details: console.error });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
