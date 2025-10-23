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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuService = void 0;
const client_1 = __importDefault(require("../prisma/client"));
exports.menuService = {
    // Get all menu items for a specific restaurant
    getRestaurantMenu(restaurantId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const menu = yield client_1.default.menuItem.findMany({
                    where: { restaurantId },
                });
                return menu;
            }
            catch (error) {
                console.error("Error fetching restaurant menu:", error);
                throw new Error("Failed to fetch restaurant menu");
            }
        });
    },
    // Add a new menu item (owner only)
    addMenuItem(restaurantId, name, description, price, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newItem = yield client_1.default.menuItem.create({
                    data: {
                        name,
                        description,
                        price,
                        imageUrl,
                        restaurantId,
                    },
                });
                return newItem;
            }
            catch (error) {
                console.error("Error adding menu item:", error);
                throw new Error("Failed to add menu item");
            }
        });
    },
    // Update menu item
    updateMenuItem(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedItem = yield client_1.default.menuItem.update({
                    where: { id },
                    data,
                });
                return updatedItem;
            }
            catch (error) {
                console.error("Error updating menu item:", error);
                throw new Error("Failed to update menu item");
            }
        });
    },
    // Delete menu item
    deleteMenuItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client_1.default.menuItem.delete({
                    where: { id },
                });
                return { message: "Menu item deleted successfully" };
            }
            catch (error) {
                console.error("Error deleting menu item:", error);
                throw new Error("Failed to delete menu item");
            }
        });
    },
};
