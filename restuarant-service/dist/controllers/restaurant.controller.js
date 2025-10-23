"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantByName = exports.getRestaurants = exports.registerRestaurant = void 0;
const restaurant_service_1 = require("../services/restaurant.service");
const registerRestaurant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, address, phone } = req.body;
        if (req.userType !== "RESTAURANT_OWNER") {
            return res
                .status(403)
                .json({ error: "Only restaurant owners can register" });
        }
        const owner = req.userId;
        if (!owner) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const result = yield restaurant_service_1.restaurantService.createRestaurant(name, address, phone, owner);
        res.status(201).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to register restaurant" });
    }
});
exports.registerRestaurant = registerRestaurant;
const getRestaurants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield restaurant_service_1.restaurantService.getAllRestaurant();
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error fetching restaurants:", error);
        res.status(500).json({ error: "Failed to get all restaurants" });
    }
});
exports.getRestaurants = getRestaurants;
const getRestaurantByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.name;
        const result = yield restaurant_service_1.restaurantService.getRestaurantByName(name);
        if (!result) {
            return res.status(404).json({ error: "Restaurant not found" });
        }
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error fetching restaurant by name:", error);
        res.status(500).json({ error: "Failed to get restaurant by name" });
    }
});
exports.getRestaurantByName = getRestaurantByName;
