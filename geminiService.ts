
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getIslamicMotivation = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a short, inspiring Islamic motivational quote for Ramadan. Keep it under 100 characters. Return only the quote.",
    });
    return response.text || "Patience is a pillar of faith.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Allah is with those who have patience.";
  }
};

export const getRamadanTip = async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Give a quick health or spiritual tip for someone fasting during Ramadan in 15 words or less.",
    });
    return response.text || "Stay hydrated during Suhoor for energy.";
  } catch (error) {
    return "Focus on sincere prayers and good deeds.";
  }
};

export const getHealthyMealPlan = async (goal: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a healthy Ramadan meal plan for ${goal}. 
      Include 1 Suhoor item and 1 Iftar item with simple Bengali-style ingredients. 
      Keep the explanation brief (under 100 words).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suhoor: { type: Type.STRING },
            iftar: { type: Type.STRING },
            healthBenefit: { type: Type.STRING }
          },
          required: ["suhoor", "iftar", "healthBenefit"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Meal Planner Error:", error);
    return {
      suhoor: "Oats with dates and milk.",
      iftar: "Grilled chicken, fresh salad, and plenty of water.",
      healthBenefit: "Maintains steady energy levels throughout the day."
    };
  }
};
