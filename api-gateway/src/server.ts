import app from "./app";
import { config } from "./config";

console.log("Loaded Config:", config);

app.get("/", (req, res) => {
  res.send("API Gateway");
});

app.listen(config.port, () => {
  console.log("Gateway Listening");
  console.log(config.port);
});
