// Chatbot.js
import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://127.0.0.1:8000/answer_question", {
        question: input,
        user_pn: "010-2345-6789"  // 사용자의 휴대폰 번호를 여기에 입력 (또는 로그인 정보를 통해 자동으로 가져오기)
      });

      const botMessage = { sender: "bot", text: response.data.response };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("메시지 전송 오류:", error);
    }
    setInput("");
  };

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "user" ? "user-message" : "bot-message"}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="질문을 입력하세요..."
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
};

export default Chatbot;
