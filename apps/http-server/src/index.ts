import express from "express";
import { prismaClient } from "@repo/db/prismaClient";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await prismaClient.user.create({
    data: {
      username,
      password,
    },
  });

  res.json({
    success: true,
    id: user.id,
    message: "User created successfully",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});