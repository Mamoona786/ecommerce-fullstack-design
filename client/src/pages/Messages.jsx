import React, { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import FooterSection from "../components/common/FooterSection";
import {
  createOrGetMyChat,
  sendMessageToChat,
} from "../services/messageService";

function Messages() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const data = await createOrGetMyChat();
        setChat(data.chat);
      } catch (error) {
        console.error("Failed to load chat:", error);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!chat?._id || !input.trim()) return;

    try {
      setSending(true);
      const data = await sendMessageToChat(chat._id, input.trim());
      setChat(data.chat);
      setInput("");
    } catch (error) {
      console.error("Failed to send message:", error);
      alert(error?.response?.data?.message || "Failed to send message");
    } finally {
      setSending(false);
    }
  };

  const messages = chat?.messages || [];

  return (
    <div
      className="messages-page"
      style={{ minHeight: "100vh", background: "#f8f9fa" }}
    >
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
              {loading ? (
                <p>Loading chat...</p>
              ) : messages.length === 0 ? (
                <p>No messages yet.</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg._id}
                    style={{
                      display: "flex",
                      justifyContent:
                        msg.sender === "user" ? "flex-end" : "flex-start",
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
                        border:
                          msg.sender !== "user" ? "1px solid #e5e7eb" : "none",
                        lineHeight: "1.5",
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
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
                disabled={sending}
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
                {sending ? "Sending..." : "Send"}
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
