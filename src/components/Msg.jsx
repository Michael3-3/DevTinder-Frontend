// src/components/Msg.jsx
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Msg = () => {
  const { id: targetId, name } = useParams(); // expecting /msg/:id/:name
  const user = useSelector((store) => store.user); // your slice returns the user object directly
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch history
  useEffect(() => {
    const fetchMessages = async () => {
      if (!userId || !targetId) return;
      setLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:3001/api/messages/${userId}/${targetId}`,
          { withCredentials: true }
        );
        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, [userId, targetId]);

  // Socket
  useEffect(() => {
    if (!userId || !targetId) return;

    if (!socketRef.current) {
      socketRef.current = createSocketConnection();
    }
    const socket = socketRef.current;

    socket.emit("joinChat", { userId, targetId });

    const onReceive = (newMsg) => setMessages((prev) => [...prev, newMsg]);
    socket.on("receiveMessage", onReceive);

    return () => {
      socket.off("receiveMessage", onReceive);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [userId, targetId]);

  // Send
  const handleSend = () => {
    if (!msg.trim() || !socketRef.current) return;

    // Emit in the shape backend accepts (A)
    socketRef.current.emit(
      "sendMessage",
      { userId, targetId, message: msg },
      (ack) => {
        if (!ack?.success) {
          console.error("Message failed:", ack?.error);
          return;
        }
        // Optimistic not strictly needed now (ACK returns the saved message),
        // but if you want instant feel, uncomment:
        // setMessages((prev) => [...prev, ack.message]);
      }
    );

    setMsg("");
  };

  const formatTime = (iso) =>
    new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const Bubble = ({ m }) => {
    const mine = m.sender === userId;
    return (
      <div
        className={`p-2 rounded-lg max-w-[75%] break-words ${
          mine ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-black self-start mr-auto"
        }`}
      >
        <p>{m.text}</p>
        <p className={`text-[10px] mt-1 text-right ${mine ? "text-gray-200" : "text-gray-600"}`}>
          {formatTime(m.createdAt || m.time)}
        </p>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 p-2">
      <div className="text-xl sm:text-2xl font-semibold bg-blue-700 text-white w-full sm:w-1/2 text-center py-3 rounded-t-2xl shadow-md">
        Chatting with {name}
      </div>

      <div className="h-96 w-full sm:w-1/2 bg-white flex flex-col p-3 overflow-y-auto shadow-md rounded-b-2xl">
        {loading ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-400">No messages yet. Start the chat!</p>
        ) : (
          messages.map((m) => <Bubble key={m._id || m.createdAt + m.text} m={m} />)
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="w-full sm:w-1/2 flex items-center justify-center mt-3 space-x-2">
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 border border-gray-300 rounded-lg text-gray-900 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Msg;
