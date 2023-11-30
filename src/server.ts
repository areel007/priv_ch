import { createServer } from "http";
import { Server } from "socket.io";
import { app } from "./app";
import { Text } from "./models/chat";

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Connecting DB
import { connectDatabase } from "./config/DB";
connectDatabase();

io.on("connection", (socket) => {
  console.log("A user is connected");

  // Handle chatMessage event
  socket.on("chatMessage", async (message) => {
    try {
      // Save the message to MongoDB
      const newText = new Text({
        username: message.username,
        text: message.text,
      });
      await newText.save();

      // Retrieve all messages after saving
      const messages = await Text.find();

      // Emit the message to all connected clients except the sender
      socket.broadcast.emit("chatMessage", message);

      // Send the updated messages to all clients
      io.emit("updateMessages", messages);
    } catch (error: any) {
      console.error("Error handling chatMessage:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

httpServer.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
