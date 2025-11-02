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
exports.OrderContext = void 0;
const client_1 = __importDefault(require("../prisma/client"));
// Order context (holds state + order data)
class OrderContext {
    constructor(orderId, state, orderData) {
        this.orderId = orderId;
        this._state = state;
        this.orderData = orderData;
    }
    getState() {
        return this._state;
    }
    setState(state) {
        this._state = state;
    }
    getStatus() {
        return this._state.getStatus();
    }
    // persist the state to DB (atomic usage recommended in service layer)
    persistStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            yield client_1.default.order.update({
                where: { id: this.orderId },
                data: { status: this._state.getStatus() },
            });
        });
    }
    // helper to perform transition and persist in DB atomically (but see service for transaction)
    transitionAndPersist(action) {
        return __awaiter(this, void 0, void 0, function* () {
            if (action === "next")
                yield this._state.next(this);
            else
                yield this._state.cancel(this);
            yield this.persistStatus();
        });
    }
}
exports.OrderContext = OrderContext;
