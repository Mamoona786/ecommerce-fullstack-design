import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from environment variables");
  }

  return new GoogleGenAI({ apiKey });
};

export const generateSupportReply = async ({
  userMessage,
  recentMessages = [],
  orderSummary = null,
  userSummary = null,
}) => {
  const ai = getClient();

  const prompt = `
You are an e-commerce customer support assistant.

Rules:
- Be concise, helpful, and accurate.
- Never invent order status, payment status, refund policy, or delivery dates.
- Only use the provided store context.
- If store context is missing, ask a short follow-up question.
- If the user asks for escalation, say that human support can review the chat.

Store context:
${JSON.stringify(
  {
    userSummary,
    orderSummary,
    recentMessages,
  },
  null,
  2
)}

User message:
${userMessage}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text || "I’m sorry, I could not generate a reply right now.";
};
