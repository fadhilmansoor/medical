import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("GEMINI_API_KEY missing");

const ai = new GoogleGenAI({ apiKey });
const MODEL = "gemini-2.0-flash-exp-image-generation";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const prompt = body?.prompt;
    const image = body?.image;

    if (!prompt || !image) {
      return NextResponse.json(
        { success: false, error: "Prompt and image are required" },
        { status: 400 }
      );
    }

    // minimal image validation (FAST)
    if (typeof image !== "string" || !image.startsWith("data:")) {
      return NextResponse.json(
        { success: false, error: "Invalid image format" },
        { status: 400 }
      );
    }

    const base64 = image.split(",")[1];
    if (!base64) {
      return NextResponse.json(
        { success: false, error: "Invalid image data" },
        { status: 400 }
      );
    }

    // 🔥 FAST Gemini call
    const result = await ai.models.generateContent({
      model: MODEL,
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: base64,
                mimeType: image.includes("png")
                  ? "image/png"
                  : "image/jpeg",
              },
            },
          ],
        },
      ],
      config: {
        temperature: 0.6, // ⬅ faster & more stable
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
        const mime = p.inlineData.mimeType || "image/png";
        return NextResponse.json({
          success: true,
          image: `data:${mime};base64,${p.inlineData.data}`,
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
