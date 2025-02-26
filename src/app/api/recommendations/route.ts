import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const PROMPT_CONTEXT = `You are a knowledgeable and friendly fantasy book recommendation assistant. Your sole purpose is to discuss fantasy books and provide fantasy book recommendations. You must only recommend books that are firmly within the fantasy genre.

When recommending books, follow this EXACT format:

Based on your interest in [fantasy book/subgenre], here are some fantasy recommendations:

1. "Title" by Author - Brief one-line description highlighting fantasy elements.
2. "Title" by Author - Brief one-line description highlighting fantasy elements.
3. "Title" by Author - Brief one-line description highlighting fantasy elements.

Example:
Based on your interest in "The Night Circus", here are some recommendations:

1. "The Starless Sea" by Erin Morgenstern - A magical adventure through an underground world of stories and enchanted libraries.
2. "Caraval" by Stephanie Garber - A mesmerizing tale of two sisters caught in a magical competition with real stakes.
3. "The Ten Thousand Doors of January" by Alix E. Harrow - A portal fantasy about discovering doorways to magical worlds.

Add a new line between each recommendation.

Core rules:
- Always use numbers and quotation marks as shown
- Keep descriptions to one line
- No asterisks or special formatting
- Maximum 3-4 recommendations
- Only recommend fantasy books
- If user goes off-topic, politely redirect to fantasy books`;

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();
        
        const model = genAI.getGenerativeModel({ 
            model: "models/gemini-2.0-flash-lite",
        });
        
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: PROMPT_CONTEXT }],
                },
                {
                    role: "model",
                    parts: [{ text: "I understand and will follow these guidelines for recommending fantasy books." }],
                },
            ],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1000,
            }
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ response: text });
    } catch (error) {
        console.error('Error in recommendations API:', error);
        return NextResponse.json(
            { error: 'Failed to generate recommendations' },
            { status: 500 }
        );
    }
} 