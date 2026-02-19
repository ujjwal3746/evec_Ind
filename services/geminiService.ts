
import { GoogleGenAI, Type } from "@google/genai";
import { Article } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateArticle = async (topic: string): Promise<Article> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Write a high-quality, SEO-optimized blog article about the following EV topic: "${topic}". 
               The content should be professional, engaging, and suitable for a tech-focused mobility website.
               Include sections like Introduction, Key Features, and Future Outlook.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          summary: { type: Type.STRING },
          content: { type: Type.STRING },
          category: { type: Type.STRING },
        },
        required: ["title", "summary", "content", "category"],
      },
    },
  });

  const data = JSON.parse(response.text || "{}");
  
  return {
    id: Math.random().toString(36).substr(2, 9),
    title: data.title || "The Future of EVs",
    summary: data.summary || "Exploring the next generation of electric transportation.",
    content: data.content || "Content currently unavailable.",
    author: "Evec.in Editorial",
    date: new Date().toLocaleDateString(),
    category: data.category || "Technology",
    imageUrl: `https://picsum.photos/seed/${Math.random()}/800/450`,
  };
};

export const getSuggestedTopics = async (): Promise<string[]> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "List 6 trending and unique topics about Electric Vehicles (EVs) for a blog website. Return only the topics in an array.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
    },
  });
  
  return JSON.parse(response.text || "[]");
};
