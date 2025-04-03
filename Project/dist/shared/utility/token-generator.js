"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.generateToken = void 0;
const jwt = require("jsonwebtoken");
const generateToken = (id, type) => {
    return jwt.sign({ id, type }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIME });
};
exports.generateToken = generateToken;
const decodeToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
exports.decodeToken = decodeToken;
//# sourceMappingURL=token-generator.js.map