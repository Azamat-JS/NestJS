export const showList = todos => 
    `Your todo list: \n\n${todos
    .map(todo => (todo.isCompleted ? '✅' : '📍') + ' ' + todo.name + `\n\n`).join('')}`


export const showTask = task => (task.isCompleted ? '✅' : '📍') + ' ' + task.name