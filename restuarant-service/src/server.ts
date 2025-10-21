import app from "./app";
app.get("/", (req, res) => {
  res.send(" Restaurant Test");
});
app.listen(3002, () => {
  console.log("Started");
});
