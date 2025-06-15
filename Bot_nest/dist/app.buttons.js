"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionButtons = actionButtons;
exports.replyKeyboard = replyKeyboard;
exports.taskButtons = taskButtons;
const telegraf_1 = require("telegraf");
function actionButtons() {
    return telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback('Create a user', 'create'),
        telegraf_1.Markup.button.callback('update user', 'update'),
        telegraf_1.Markup.button.callback('remove user', 'remove'),
        telegraf_1.Markup.button.callback('Get users', 'users'),
    ], {
        columns: 3,
    });
}
function replyKeyboard() {
    return telegraf_1.Markup.keyboard([
        ['Todo list'],
        ['Edit task'],
        ['Delete task'],
        ['Get tasks'],
    ])
        .resize()
        .oneTime(true);
}
function taskButtons() {
    return telegraf_1.Markup.keyboard([
        ['✅ Completed tasks', '📜 All tasks'],
        ['✏️ Edit task', '🗑️ Remove task'],
        ['➕ Create task']
    ])
        .resize()
        .oneTime(true);
}
//# sourceMappingURL=app.buttons.js.map