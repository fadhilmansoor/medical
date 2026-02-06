import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
const MODEL = "gemini-2.0-flash-exp-image-generation";

export async function POST(req: NextRequest) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "GEMINI_API_KEY missing" },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const body = await req.json();
    const prompt = body?.prompt;
    const image = body?.image;

    if (!prompt || !image) {
      return NextResponse.json(
        { success: false, error: "Prompt and image are required" },
        { status: 400 }
      );
    }

    if (typeof image !== "string" || !image.startsWith("data:image/")) {
      return NextResponse.json(
        { success: false, error: "Invalid image format" },
        { status: 400 }
      );
    }

    const match = image.match(/^data:(image\/[a-zA-Z0-9.+-]+);base64,/);
    if (!match) {
      return NextResponse.json(
        { success: false, error: "Invalid image data URL" },
        { status: 400 }
      );
    }

    const mimeType = match[1];
    const base64 = image.replace(/^data:image\/[a-zA-Z0-9.+-]+;base64,/, "");
    if (!base64) {
      return NextResponse.json(
        { success: false, error: "Invalid image data" },
        { status: 400 }
      );
    }

    const MAX_BASE64 = 7_000_000;
    if (base64.length > MAX_BASE64) {
      return NextResponse.json(
        { success: false, error: "Image too large. Upload a smaller photo." },
        { status: 413 }
      );
    }

    const finalPrompt = `
You are an image editor. Keep the same person and photo composition.
Only apply this change: ${prompt}
Do not change background, identity, face structure, lighting, or age.
Return a single edited image.
`;

    const result = await ai.models.generateContent({
      model: MODEL,
      contents: [
        {
          role: "user",
          parts: [
            { text: finalPrompt },
            {
              inlineData: {
                data: base64,
                mimeType,
              },
            },
          ],
        },
      ],
      config: {
        temperature: 0.4,
        topK: 20,
        topP: 0.9,
        responseModalities: ["Text", "Image"],
      },
    });

    const parts = result?.candidates?.[0]?.content?.parts;
    if (!parts) {
      return NextResponse.json(
        { success: false, error: "No response from AI" },
        { status: 500 }
      );
    }

    for (const p of parts) {
      if ("inlineData" in p && p.inlineData?.data) {
        const outMime = p.inlineData.mimeType || "image/png";
        return NextResponse.json({
          success: true,
          image: `data:${outMime};base64,${p.inlineData.data}`,
        });
      }
    }

    return NextResponse.json(
      { success: false, error: "No image generated" },
      { status: 500 }
    );
  } catch (err: any) {
    console.error("AI error:", err);
    return NextResponse.json(
      { success: false, error: err?.message || "Server error" },
      { status: 500 }
    );
  }
}
