import express from "express";
import app from "./app";

app.get("/", (req, res) => {
  res.send("Test");
});
app.listen(3001, () => {
  console.log("Started");
});
