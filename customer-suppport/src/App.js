import { useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("https://localhost:7182/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      setChat(prev => [
        ...prev,
        { role: "user", text: message },
        { role: "bot", text: data.reply }
      ]);

      setMessage("");
    } catch (error) {
      setChat(prev => [
        ...prev,
        { role: "bot", text: "Server error. Please try again." }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="chat-container">
      <h2>Customer Support AI</h2>

      <div className="chat-box">
        {chat.map((c, i) => (
          <div key={i} className={c.role}>
            <b>{c.role === "user" ? "You" : "AI Assistant"}:</b> {c.text}
          </div>
        ))}
        {loading && <div className="bot">AI is typing...</div>}
      </div>

      <div className="input-area">
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;