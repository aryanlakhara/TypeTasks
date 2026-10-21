import { addTask, advanceTask, deleteTask, filterByStatus } from "./model.js";
let tasks = [];
let currentFilter = "all";
const titleInput = document.getElementById("title");
const statusInput = document.getElementById("status");
const addButton = document.getElementById("add");
const list = document.getElementById("list");
const chips = document.getElementById("chips");
const filters = [
    "all",
    "todo",
    "in-progress",
    "done"
];
function render() {
    list.replaceChildren();
    const visibleTasks = currentFilter === "all"
        ? tasks
        : filterByStatus(tasks, currentFilter);
    visibleTasks.forEach(task => {
        const item = document.createElement("li");
        item.className = "task";
        const name = document.createElement("span");
        name.textContent = task.title;
        const badge = document.createElement("small");
        badge.textContent = task.status;
        const advanceButton = document.createElement("button");
        advanceButton.textContent = "Advance →";
        advanceButton.disabled = task.status === "done";
        advanceButton.onclick = () => {
            tasks = advanceTask(tasks, task.id);
            render();
        };
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => {
            tasks = deleteTask(tasks, task.id);
            render();
        };
        item.append(name, badge, advanceButton, deleteButton);
        list.appendChild(item);
    });
    chips.replaceChildren();
    filters.forEach(filter => {
        const button = document.createElement("button");
        button.textContent = filter;
        button.className = currentFilter === filter ? "active" : "";
        button.onclick = () => {
            currentFilter = filter;
            render();
        };
        chips.appendChild(button);
    });
}
addButton.onclick = () => {
    const title = titleInput.value.trim();
    if (!title) {
        titleInput.focus();
        return;
    }
    tasks = addTask(tasks, title, statusInput.value);
    titleInput.value = "";
    render();
};
titleInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addButton.click();
    }
});
render();
