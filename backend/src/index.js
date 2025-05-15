const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/follow", async (req, res) => {
  const { followerId, followeeId } = req.body;
  await prisma.follow.create({ data: { followerId, followeeId } });
  res.send({ success: true });
});

app.post("/post", async (req, res) => {
  const { authorId, content } = req.body;
  const post = await prisma.post.create({ data: { authorId, content } });

  const followers = await prisma.follow.findMany({
    where: { followeeId: authorId },
  });

  for (const follower of followers) {
    await prisma.notification.create({
      data: {
        type: "NEW_POST",
        senderId: authorId,
        receiverId: follower.followerId,
        postId: post.id,
      },
    });
  }

  res.send(post);
});

app.get("/notifications/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const notifications = await prisma.notification.findMany({
    where: { receiverId: userId },
    include: { sender: true, post: true },
    orderBy: { createdAt: "desc" },
  });
  res.send(notifications);
});

app.post("/user", async (req, res) => {
  const { name } = req.body;
  const user = await prisma.user.create({ data: { name } });
  res.json(user);
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
