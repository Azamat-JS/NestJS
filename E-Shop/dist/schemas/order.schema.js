"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.OrderSchema = void 0;
const mongoose_1 = require("mongoose");
exports.OrderSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});
exports.OrderSchema.pre('save', function (next) {
    let totalPrice = 0;
    this.products.forEach(product => {
        totalPrice += product.price * product.quantity;
    });
    this.totalPrice = totalPrice;
    next();
});
exports.Order = mongoose_1.default.model('Order', exports.OrderSchema);
//# sourceMappingURL=order.schema.js.map