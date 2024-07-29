import { io } from "socket.io-client";

console.log("connecting now-");

const chatId = 63;

const socket = io("https://api.customerbot.ai", {
  query: `userId=${2}`,
});

socket.connect();

socket.on("chat:incoming-chat", (payload) => {
  console.log("Got an incoming chat - ", payload?.chat);
});

socket.emit("chat:typing", { chatId, isTyping: true });

setTimeout(() => {
  socket.emit("chat:send-message", { chatId, message: "I got you!" });
  socket.emit("chat:typing", { chatId, isTyping: false });
}, 10000);

socket.on("chat:new-message", (payload) => {
  console.log("Got new message - ", payload?.message || payload?.messages);

  if (payload.message) {
    setTimeout(() => {
      socket.emit("chat:update-message-status", {
        chatId,
        messageId: payload?.message.id,
        status: "Read",
      });
    }, 4000);
  } else if (payload.messages) {
    setTimeout(() => {
      payload.messages.forEach((message) => {
        socket.emit("chat:update-message-status", {
          chatId,
          messageId: message.id,
          status: "Read",
        });
      });
    }, 4000);
  }
});

socket.on("chat:update-message-status", (payload) => {
  console.log("Your message has been read - ", payload);
});

// socket.on("chat:typing", (payload) => {
//   console.log("on typing change - ", payload);
// });

// socket.on("chat:status-update", (payload) => {
//   console.log("Got chat status update - ", payload);
// });

socket.on("connect", () => {
  console.log("Connected to the server.");
});

// socket.on("connect_error", (error) => {
//   console.error("Connection error:", error);
// });
