import { GoogleGenAI } from "@google/genai";

export const generateCityBlueprint = async (apiKey: string): Promise<string> => {
  if (!apiKey) throw new Error("API Key is required");

  const ai = new GoogleGenAI({ apiKey });
  
  // Updated prompt for "Purple/Pink Data City" aesthetic
  const prompt = `
    A cinematic, high-fidelity AR concept art in 8k.
    
    Subject: An abstract, isometric data-cityscape.
    
    Key Elements:
    1. Structure: instead of realistic buildings, the city is made of translucent, glowing purple and pink geometric cubes and data blocks.
    2. Connection: A complex web of glowing cyan and white lines (code paths) connects these blocks like a neural network or circuit board.
    3. Atmosphere: Deep void background with volumetric purple fog.
    4. Lighting: Neon pink and cyber-blue highlights.
    5. Perspective: Isometric or high-angle bird's eye view.
    
    Style: Cyberpunk interface design, holographic, futuristic data visualization, "Watch Dogs" or "Cyberpunk 2077" hacking mode aesthetic.
    Aspect Ratio: Ultra-wide (21:9).
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [{ text: prompt }],
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9", 
          imageSize: "1K"
        }
      }
    });

    let imageUrl = '';
    
    // Iterate to find the image part
    for (const candidate of response.candidates || []) {
      for (const part of candidate.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!imageUrl) {
      throw new Error("No image data received from Gemini.");
    }

    return imageUrl;
  } catch (error) {
    console.error("Gemini generation error:", error);
    throw error;
  }
};