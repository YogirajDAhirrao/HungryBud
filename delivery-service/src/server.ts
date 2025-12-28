import app from "./app";
import { config } from "./config/index";

app.get("/", (req, res) => {
  res.send("Delivery service");
});
app.listen(config.port, () => {
  console.log("started");
});
