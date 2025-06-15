import { Markup } from "telegraf";

export function actionButtons(){
    return Markup.inlineKeyboard(
        [
            Markup.button.callback('Create a user', 'create'),
            Markup.button.callback('update user', 'update'),
            Markup.button.callback('remove user', 'remove'),
            Markup.button.callback('Get users', 'users'),
        ],
        {
            columns: 3,
        }
    )
}

export function replyKeyboard(){
    return Markup.keyboard([
        ['Todo list'],
        ['Edit task'],
        ['Delete task'],
        ['Get tasks'],
    ])
    .resize()
    .oneTime(true)
}


export function taskButtons(){
    return Markup.keyboard([
        ['✅ Completed tasks', '📜 All tasks'],
        ['✏️ Edit task', '🗑️ Remove task'],
        ['➕ Create task']
    ])
    .resize()
    .oneTime(true)
}