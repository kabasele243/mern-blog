import express from "express";

const app = express();

app.get("/api/blogs", (_req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("Server is Running!");
});