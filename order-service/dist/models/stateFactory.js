"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stateFromString = stateFromString;
const CancelledState_1 = require("./states/CancelledState");
const ConfirmedState_1 = require("./states/ConfirmedState");
const DeliveredState_1 = require("./states/DeliveredState");
const OutForDeliveryState_1 = require("./states/OutForDeliveryState");
const PendingState_1 = require("./states/PendingState");
const PreparingState_1 = require("./states/PreparingState");
function stateFromString(s) {
    switch (s) {
        case "Pending":
            return new PendingState_1.PendingState();
        case "Confirmed":
            return new ConfirmedState_1.ConfirmedState();
        case "Preparing":
            return new PreparingState_1.PreparingState();
        case "Out_for_delivery":
            return new OutForDeliveryState_1.OutForDeliveryState();
        case "Delivered":
            return new DeliveredState_1.DeliveredState();
        case "Cancelled":
            return new CancelledState_1.CancelledState();
        default:
            return new PendingState_1.PendingState();
    }
}
