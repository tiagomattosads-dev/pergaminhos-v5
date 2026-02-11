
import { GoogleGenAI } from "@google/genai";

// Funções de geração de imagem removidas para evitar erros RESOURCE_EXHAUSTED
// e permitir upload manual pelo usuário.

export async function generateContent(prompt: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error with Gemini API:", error);
    return null;
  }
}
