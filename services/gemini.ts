
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getShoppingAdvice(query: string, products: Product[]): Promise<string> {
    const productList = products.map(p => `- ${p.name} ($${p.price}): ${p.description}`).join('\n');
    
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `I am a shopping assistant. The user is asking: "${query}". 
        Here is our product catalog:
        ${productList}
        
        Please provide a helpful, friendly recommendation based only on these products. If no products match, suggest something similar or ask for clarification. Limit to 3 sentences.`,
      });
      return response.text || "I'm sorry, I couldn't process that request right now.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Hello! I'm your Lumina assistant. How can I help you find the perfect item today?";
    }
  }
}

export const geminiService = new GeminiService();
