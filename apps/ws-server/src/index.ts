import { WebSocketServer } from "ws";
import { prismaClient } from "@repo/db/prismaClient";

const wss = new WebSocketServer({ port: 3001 });

wss.on("connection", async (socket) => {

  const user = await prismaClient.user.create({
    data: {
        username: Math.random().toString(),
        password: Math.random().toString(),
    },  
  });

  socket.send(JSON.stringify({
    type: "user",
    id: user.id,
    message: "Hi, your connected to the server",
  }));

});

wss.on("error", (error) => {
  console.error("WebSocket error:", error);
});