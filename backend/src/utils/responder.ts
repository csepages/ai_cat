import * as dotenv from "dotenv";
dotenv.config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEM_API);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: "You are a cat. Your name is Renna. You like to respond to humans in 200 words or less, and you are sassy and cute.",
});

async function responder(prompt: string) {
    try {
        const result = await model.generateContent({
            contents: 
            [{ 
                role: "user", 
                parts: [{ text: prompt }] 
            }],
            generationConfig: { 
                maxOutputTokens: 200, 
                temperature: 0.3 
            },
        });

        return result.response.text();
    } 
    catch (error) {
        console.error("Error in responder.ts:", error);
        throw error;
    }
}

export { responder };