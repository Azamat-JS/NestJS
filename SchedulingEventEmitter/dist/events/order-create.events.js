"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderCreateEvent = void 0;
class OrderCreateEvent {
    name;
    amount;
    totalPrice;
    constructor(name, amount, totalPrice) {
        this.name = name;
        this.amount = amount;
        this.totalPrice = totalPrice;
    }
}
exports.OrderCreateEvent = OrderCreateEvent;
//# sourceMappingURL=order-create.events.js.map