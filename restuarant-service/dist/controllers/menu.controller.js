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
exports.deleteMenuItem = exports.updateMenuItem = exports.addMenuItem = exports.getRestaurantMenu = void 0;
const menu_service_js_1 = require("../services/menu.service.js");
const getRestaurantMenu = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantId } = req.params;
        const menu = yield menu_service_js_1.menuService.getRestaurantMenu(restaurantId);
        res.status(200).json(menu);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch restaurant menu" });
    }
});
exports.getRestaurantMenu = getRestaurantMenu;
const addMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { restaurantId } = req.params;
        const { name, description, price, imageUrl } = req.body;
        // optional: verify req.userId === restaurant.ownerId before adding
        const newItem = yield menu_service_js_1.menuService.addMenuItem(restaurantId, name, description, price, imageUrl);
        res.status(201).json(newItem);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add menu item" });
    }
});
exports.addMenuItem = addMenuItem;
const updateMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId } = req.params;
        const updatedItem = yield menu_service_js_1.menuService.updateMenuItem(itemId, req.body);
        res.status(200).json(updatedItem);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update menu item" });
    }
});
exports.updateMenuItem = updateMenuItem;
const deleteMenuItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId } = req.params;
        const result = yield menu_service_js_1.menuService.deleteMenuItem(itemId);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to delete menu item" });
    }
});
exports.deleteMenuItem = deleteMenuItem;
