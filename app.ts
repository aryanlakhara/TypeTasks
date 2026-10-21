
import {
  type Task,
  type TaskStatus,
  addTask,
  advanceTask,
  deleteTask,
  filterByStatus
} from "./model.js";

let tasks: Task[] = [];
let currentFilter: "all" | TaskStatus = "all";

const titleInput = document.getElementById("title") as HTMLInputElement;
const statusInput = document.getElementById("status") as HTMLSelectElement;
const addButton = document.getElementById("add") as HTMLButtonElement;
const list = document.getElementById("list") as HTMLUListElement;
const chips = document.getElementById("chips") as HTMLDivElement;

const filters: ("all" | TaskStatus)[] = [
  "all",
  "todo",
  "in-progress",
  "done"
];

function render(): void {
  list.replaceChildren();

  const visibleTasks =
    currentFilter === "all"
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

  tasks = addTask(
    tasks,
    title,
    statusInput.value as TaskStatus
  );

  titleInput.value = "";
  render();
};

titleInput.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    addButton.click();
  }
});

render();
