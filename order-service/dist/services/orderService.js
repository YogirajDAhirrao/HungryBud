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
exports.orderService = void 0;
const orderContext_1 = require("../models/orderContext");
const stateFactory_1 = require("../models/stateFactory");
const client_1 = __importDefault(require("../prisma/client"));
// Order service — orchestrates DB + state transitions
exports.orderService = {
    createOrder(customerId, restaurantId, items) {
        return __awaiter(this, void 0, void 0, function* () {
            const totalAmount = items.reduce((sum, it) => sum + it.price * it.quantity, 0);
            // use transaction to ensure order and items are saved together
            const order = yield client_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const createdOrder = yield tx.order.create({
                    data: {
                        customerId,
                        restaurantId,
                        totalAmount,
                        status: "Placed",
                        items: {
                            create: items.map((it) => ({
                                menuItemId: it.menuItemId,
                                restaurantId: it.restaurantId,
                                quantity: it.quantity,
                                price: it.price,
                            })),
                        },
                    },
                    include: { items: true },
                });
                return createdOrder;
            }));
            return order;
        });
    },
    /**
     * Fetch order and load its state context
     */
    getOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield client_1.default.order.findUnique({
                where: { id: orderId },
                include: { items: true },
            });
            if (!order)
                throw new Error("Order not found");
            const state = (0, stateFactory_1.stateFromString)(order.status);
            const ctx = new orderContext_1.OrderContext(order.id, state, order);
            return { order, ctx };
        });
    },
    /**
     * Transition order to next or cancel state
     */
    transitionOrder(orderId, action) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const order = yield tx.order.findUnique({ where: { id: orderId } });
                if (!order)
                    throw new Error("Order not found");
                const state = (0, stateFactory_1.stateFromString)(order.status);
                const ctx = new orderContext_1.OrderContext(order.id, state, order);
                //perform transition
                if (action === "next")
                    yield ctx.getState().next(ctx);
                else
                    yield ctx.getState().cancel(ctx);
                //persist new state
                const updated = yield tx.order.update({
                    where: { id: orderId },
                    data: { status: ctx.getState().getStatus() },
                    include: { items: true },
                });
                return updated;
            }));
        });
    },
};
