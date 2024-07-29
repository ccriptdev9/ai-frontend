import { io } from "socket.io-client";

console.log("connecting now-");

const socket = io("http://localhost:8080", {
  query: `userId=chat-${9}`,
});

socket.connect();

socket.on("hi", () => {
  console.log("Got hi from the server.");
});

// socket.on("chat:incoming-chat", (payload) => {
//   console.log("Got an incoming chat - ", payload?.chat);
// });

// socket.emit(
//   "chat:send-message",
//   { chatId: 1, message: "I got you!" },
//   (message) => {
//     console.log("message object - ", message);
//   }
// );

// socket.emit("chat:typing", { chatId: 1, isTyping: true });

socket.on("chat:new-message", (payload) => {
  console.log("Got new chat message - ", payload?.message || payload?.messages);
});

socket.on("chat:update-message-status", (payload) => {
  console.log("Got message status update", payload);
});

socket.on("chat:update-status", (payload) => {
  console.log("Update chat status - ", payload);
});

socket.on("chat:typing", (payload) => {
  console.log("on typing change - ", payload);
});

socket.on("chat:status-update", (payload) => {
  console.log("Got chat status update - ", payload);
});

socket.on("connect", () => {
  console.log("Connected to the server.");
});

// socket.on("connect_error", (error) => {
//   console.error("Connection error:", error);
// });
