import React, { useState } from "react";
import Header from "../components/layout/Header";
import FooterSection from "../components/common/FooterSection";
import { generateAutoReply } from "../services/messageService";

function Messages() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hello! Welcome to customer support. How can I help you today?",
    },
  ]);

  useEffect(() => {
  const init = async () => {
    const data = await createOrGetMyChat();
    setChat(data.chat);
  };
  init();
}, []);

const handleSend = async () => {
  const data = await sendMessageToChat(chat._id, input);
  setChat(data.chat);
  setInput("");
};

  return (
    <div className="messages-page" style={{ minHeight: "100vh", background: "#f8f9fa" }}>
      <Header />

      <main style={{ padding: "30px 0" }}>
        <div
          className="container"
          style={{
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                padding: "18px 22px",
                borderBottom: "1px solid #e5e7eb",
                background: "#ffffff",
              }}
            >
              <h1 style={{ margin: 0, fontSize: "24px", color: "#1f2937" }}>
                Messages
              </h1>
              <p style={{ margin: "6px 0 0", color: "#6b7280" }}>
                Ask anything related to your order, payment, cart, or account.
              </p>
            </div>

            <div
              style={{
                height: "420px",
                overflowY: "auto",
                padding: "20px",
                background: "#f9fafb",
              }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                    marginBottom: "14px",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "70%",
                      padding: "12px 16px",
                      borderRadius: "14px",
                      background: msg.sender === "user" ? "#2563eb" : "#ffffff",
                      color: msg.sender === "user" ? "#ffffff" : "#1f2937",
                      border: msg.sender === "bot" ? "1px solid #e5e7eb" : "none",
                      lineHeight: "1.5",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form
              onSubmit={handleSend}
              style={{
                display: "flex",
                gap: "12px",
                padding: "16px",
                borderTop: "1px solid #e5e7eb",
                background: "#ffffff",
              }}
            >
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{
                  flex: 1,
                  height: "46px",
                  border: "1px solid #d1d5db",
                  borderRadius: "10px",
                  padding: "0 14px",
                  outline: "none",
                  fontSize: "15px",
                }}
              />

              <button
                type="submit"
                style={{
                  border: "none",
                  borderRadius: "10px",
                  padding: "0 22px",
                  background: "#2563eb",
                  color: "#fff",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}

export default Messages;
