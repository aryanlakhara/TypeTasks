let nextId = 1;
export function addTask(tasks, title, status = "todo") {
    const newTask = {
        id: nextId++,
        title,
        status
    };
    return [...tasks, newTask];
}
export function completeTask(tasks, id) {
    return tasks.map(task => task.id === id ? { ...task, status: "done" } : task);
}
export function filterByStatus(tasks, status) {
    return tasks.filter(task => task.status === status);
}
export function deleteTask(tasks, id) {
    return tasks.filter(task => task.id !== id);
}
export function advanceTask(tasks, id) {
    return tasks.map(task => {
        if (task.id !== id)
            return task;
        if (task.status === "todo") {
            return { ...task, status: "in-progress" };
        }
        if (task.status === "in-progress") {
            return { ...task, status: "done" };
        }
        return task;
    });
}
export function countByStatus(tasks, status) {
    return tasks.filter(task => task.status === status).length;
}
