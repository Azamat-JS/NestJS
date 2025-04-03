"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.generateHashPassword = void 0;
const bcrypt = require("bcrypt");
const generateHashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
exports.generateHashPassword = generateHashPassword;
const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};
exports.comparePassword = comparePassword;
//# sourceMappingURL=password-manager.js.map