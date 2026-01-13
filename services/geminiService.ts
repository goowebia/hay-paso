
import { GoogleGenAI, Type } from "@google/genai";
import { TrafficStatus, UserReport } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const summarizeTraffic = async (reports: UserReport[]): Promise<string> => {
  const reportsContext = reports.map(r => 
    `[${r.timestamp.toISOString()}] ${r.userName}: ${r.description} (${r.status})`
  ).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analiza los siguientes reportes de la carretera Manzanillo-Guadalajara y genera un resumen muy breve y directo para conductores. Indica si hay paso libre, tráfico pesado o bloqueos totales.\n\nReportes:\n${reportsContext}`,
      config: {
        systemInstruction: "Eres un analista de tráfico experto en la carretera Colima-Guadalajara. Eres conciso, usas lenguaje local y priorizas la seguridad vial.",
      }
    });
    return response.text || "No hay suficiente información para un resumen en este momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error al procesar el resumen de tráfico.";
  }
};

export const parseSocialReport = async (text: string): Promise<{ description: string, status: TrafficStatus }> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Extrae la información relevante de este post de Facebook de grupos de tráfico: "${text}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            status: { 
              type: Type.STRING, 
              enum: [
                TrafficStatus.FLUID, 
                TrafficStatus.SLOW, 
                TrafficStatus.STALL, 
                TrafficStatus.ACCIDENT, 
                TrafficStatus.CLOSURE
              ] 
            }
          },
          required: ["description", "status"]
        }
      }
    });
    
    return JSON.parse(response.text);
  } catch (error) {
    return { description: text, status: TrafficStatus.SLOW };
  }
};
