import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateSupportReply = async ({
  userMessage,
  recentMessages = [],
  orderSummary = null,
  userSummary = null,
}) => {
  const developerInstruction = `
You are an e-commerce customer support assistant.
Be concise, helpful, and accurate.
Never invent order status, payment status, refund policy, or delivery dates.
Only use the provided store context.
If store context is missing, ask a short follow-up question.
If the user asks for escalation, say that human support can review the chat.
`;

  const contextText = JSON.stringify(
    {
      userSummary,
      orderSummary,
      recentMessages,
    },
    null,
    2
  );

  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
    input: [
      {
        role: "developer",
        content: developerInstruction,
      },
      {
        role: "user",
        content: `Store context:\n${contextText}\n\nUser message:\n${userMessage}`,
      },
    ],
  });

  return response.output_text || "I’m sorry, I could not generate a reply right now.";
};
