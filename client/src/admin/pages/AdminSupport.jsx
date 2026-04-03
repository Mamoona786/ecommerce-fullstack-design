import React, { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import {
  getAdminChats,
  getAdminChatById,
  replyAsAdmin,
  updateChatStatus,
} from "../../services/messageService";
import "../styles/adminSupport.css";

function AdminSupport() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const loadChats = async () => {
    try {
      setLoading(true);
      const data = await getAdminChats();
      setChats(data?.chats || []);
    } catch (error) {
      console.error("Failed to load chats:", error);
      alert(error?.response?.data?.message || "Failed to load chats");
    } finally {
      setLoading(false);
    }
  };

  const loadSingleChat = async (chatId) => {
    try {
      const data = await getAdminChatById(chatId);
      setSelectedChat(data?.chat || null);
    } catch (error) {
      console.error("Failed to load chat:", error);
      alert(error?.response?.data?.message || "Failed to load chat");
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  const handleSelectChat = async (chatId) => {
    await loadSingleChat(chatId);
  };

  const handleReply = async (e) => {
    e.preventDefault();

    if (!selectedChat?._id) return;
    if (!replyText.trim()) return;

    try {
      setSending(true);

      const data = await replyAsAdmin(selectedChat._id, replyText.trim());
      setSelectedChat(data?.chat || null);
      setReplyText("");
      await loadChats();
    } catch (error) {
      console.error("Failed to send admin reply:", error);
      alert(error?.response?.data?.message || "Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    if (!selectedChat?._id) return;

    try {
      const data = await updateChatStatus(selectedChat._id, {
        status: newStatus,
      });

      setSelectedChat(data?.chat || null);
      await loadChats();
    } catch (error) {
      console.error("Failed to update status:", error);
      alert(error?.response?.data?.message || "Failed to update chat status");
    }
  };

  const handleAiToggle = async () => {
    if (!selectedChat?._id) return;

    try {
      const data = await updateChatStatus(selectedChat._id, {
        aiEnabled: !selectedChat.aiEnabled,
      });

      setSelectedChat(data?.chat || null);
      await loadChats();
    } catch (error) {
      console.error("Failed to update AI setting:", error);
      alert(error?.response?.data?.message || "Failed to update AI setting");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fb" }}>
      <Header />

      <main style={{ padding: "24px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h1 style={{ marginBottom: "20px" }}>Admin Support Panel</h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "360px 1fr",
              gap: "20px",
              alignItems: "start",
            }}
          >
            <section
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <div style={{ padding: "16px", borderBottom: "1px solid #e5e7eb" }}>
                <h2 style={{ margin: 0, fontSize: "18px" }}>All Chats</h2>
              </div>

              <div style={{ maxHeight: "700px", overflowY: "auto" }}>
                {loading ? (
                  <p style={{ padding: "16px" }}>Loading chats...</p>
                ) : chats.length === 0 ? (
                  <p style={{ padding: "16px" }}>No chats found.</p>
                ) : (
                  chats.map((chat) => (
                    <button
                      key={chat._id}
                      type="button"
                      onClick={() => handleSelectChat(chat._id)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "14px 16px",
                        border: "none",
                        borderBottom: "1px solid #f0f0f0",
                        background:
                          selectedChat?._id === chat._id ? "#eef4ff" : "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>
                        {chat?.user?.username || "User"}
                      </div>
                      <div style={{ fontSize: "13px", color: "#666", marginTop: "4px" }}>
                        {chat?.user?.email || "No email"}
                      </div>
                      <div style={{ fontSize: "13px", color: "#444", marginTop: "6px" }}>
                        Status: {chat.status}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </section>

            <section
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                minHeight: "700px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {!selectedChat ? (
                <div style={{ padding: "24px" }}>
                  <h2>Select a chat</h2>
                  <p>Choose a chat from the left side to view messages.</p>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      padding: "16px 20px",
                      borderBottom: "1px solid #e5e7eb",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <h2 style={{ margin: 0 }}>
                        {selectedChat?.user?.username || "User"}
                      </h2>
                      <p style={{ margin: "6px 0 0", color: "#666" }}>
                        {selectedChat?.user?.email}
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <select
                        value={selectedChat.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        style={{
                          height: "40px",
                          padding: "0 12px",
                          borderRadius: "8px",
                          border: "1px solid #d1d5db",
                        }}
                      >
                        <option value="open">open</option>
                        <option value="waiting_admin">waiting_admin</option>
                        <option value="resolved">resolved</option>
                      </select>

                      <button
                        type="button"
                        onClick={handleAiToggle}
                        style={{
                          height: "40px",
                          padding: "0 14px",
                          borderRadius: "8px",
                          border: "none",
                          background: selectedChat.aiEnabled ? "#dcfce7" : "#fee2e2",
                          cursor: "pointer",
                        }}
                      >
                        AI: {selectedChat.aiEnabled ? "ON" : "OFF"}
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      flex: 1,
                      padding: "20px",
                      overflowY: "auto",
                      background: "#f9fafb",
                    }}
                  >
                    {(selectedChat.messages || []).map((msg) => (
                      <div
                        key={msg._id}
                        style={{
                          display: "flex",
                          justifyContent:
                            msg.sender === "admin"
                              ? "flex-end"
                              : "flex-start",
                          marginBottom: "14px",
                        }}
                      >
                        <div
                          style={{
                            maxWidth: "70%",
                            padding: "12px 14px",
                            borderRadius: "12px",
                            background:
                              msg.sender === "admin"
                                ? "#2563eb"
                                : msg.sender === "assistant"
                                ? "#ffffff"
                                : "#e5e7eb",
                            color: msg.sender === "admin" ? "#fff" : "#111827",
                            border:
                              msg.sender === "assistant"
                                ? "1px solid #e5e7eb"
                                : "none",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "12px",
                              fontWeight: 700,
                              marginBottom: "6px",
                              textTransform: "capitalize",
                              opacity: 0.8,
                            }}
                          >
                            {msg.sender}
                          </div>
                          <div>{msg.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <form
                    onSubmit={handleReply}
                    style={{
                      padding: "16px",
                      borderTop: "1px solid #e5e7eb",
                      display: "flex",
                      gap: "12px",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Write admin reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      style={{
                        flex: 1,
                        height: "46px",
                        border: "1px solid #d1d5db",
                        borderRadius: "10px",
                        padding: "0 14px",
                        outline: "none",
                      }}
                    />

                    <button
                      type="submit"
                      disabled={sending}
                      style={{
                        height: "46px",
                        padding: "0 18px",
                        border: "none",
                        borderRadius: "10px",
                        background: "#111827",
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      {sending ? "Sending..." : "Send"}
                    </button>
                  </form>
                </>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminSupport;
