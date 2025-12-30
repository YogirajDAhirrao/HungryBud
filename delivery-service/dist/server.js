import app from "./app.js";
import { config } from "./config/index.js";
app.get("/", (req, res) => {
    res.send("Delivery service");
});
app.listen(config.port, () => {
    console.log("started");
});
