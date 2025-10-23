"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
console.log("Loaded Config:", config_1.config);
app_1.default.get("/", (req, res) => {
    res.send("API Gateway");
});
app_1.default.listen(config_1.config.port, () => {
    console.log("Gateway Listening");
    console.log(config_1.config.port);
});
