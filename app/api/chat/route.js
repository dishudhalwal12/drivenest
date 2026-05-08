import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import connectDB from '@/lib/mongodb';
import Car from '@/models/Car';

export async function POST(request) {
  try {
    const body = await request.json();
    const { message, history = [] } = body;

    if (!message) {
      return NextResponse.json({ success: false, error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ success: false, error: 'GEMINI_API_KEY is not configured' }, { status: 500 });
    }

    // 1. Fetch available cars
    await connectDB();
    const availableCars = await Car.find({ available: true }).select('-reviews -assignedDriver');

    // Format car data for the prompt
    const carInventoryContext = availableCars.map(car => 
      `- ${car.brand} ${car.name} (${car.year}): ${car.category}, ${car.transmission}, ${car.fuelType}, ${car.seats} seats. Price: ₹${car.pricePerDay}/day. Location: ${car.location}`
    ).join('\n');

    // 2. Initialize Gemini API
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const systemInstruction = `
You are the official AI rental assistant for DriveNest, a premium car rental platform. 
Your goal is to help users find the best car for their needs from our live inventory.
Keep your responses fast, conversational, friendly, and concise. Don't use overly long paragraphs.

Here is the CURRENT LIVE INVENTORY of available cars:
${carInventoryContext || 'No cars currently available.'}

Instructions:
1. When a user asks for a car, ask clarifying questions if needed (e.g., "How many passengers?", "What is your budget?", "Do you prefer manual or automatic?").
2. Recommend SPECIFIC cars from the inventory above that match their needs. Mention the car's name, brand, price, and why it fits.
3. If they ask for something we don't have, politely let them know and suggest the closest alternative from the inventory.
4. If they just say "hi", greet them and ask how you can help them find a car today.
5. Format your responses with markdown for readability (e.g., bold car names).
`;

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: systemInstruction
    });

    // 3. Format history for Gemini API
    // Gemini history format: { role: 'user' | 'model', parts: [{ text: string }] }
    const formattedHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    // Gemini requires the first message in history to be from the 'user'
    if (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
      formattedHistory.unshift({
        role: 'user',
        parts: [{ text: "Hello" }]
      });
    }

    const chat = model.startChat({
      history: formattedHistory,
    });

    // 4. Send the new message
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ success: true, text });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
