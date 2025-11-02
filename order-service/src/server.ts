import app from "./app";
import { config } from "./config";

app.get("/", (req, res) => {
  res.send("Order Service");
});

app.listen(config.port, () => {
  console.log("Order Service Started");
});
