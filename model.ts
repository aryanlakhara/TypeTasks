
type TaskStatus = "todo" | "in-progress" | "done";

interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

let nextId = 1;

// Add a new task
function addTask(tasks: Task[], title: string): Task[] {
  const newTask: Task = {
    id: nextId++,
    title: title,
    status: "todo"
  };

  return [...tasks, newTask];
}

// Mark a task as done
function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map(task =>
    task.id === id
      ? { ...task, status: "done" }
      : task
  );
}

// Filter tasks by status
function filterByStatus(
  tasks: Task[],
  status: TaskStatus
): Task[] {
  return tasks.filter(task => task.status === status);
}

// Extra operation 1: Delete a task
function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter(task => task.id !== id);
}

// Extra operation 2: Advance task to the next status
function advanceTask(tasks: Task[], id: number): Task[] {
  return tasks.map(task => {
    if (task.id !== id) return task;

    if (task.status === "todo") {
      return { ...task, status: "in-progress" };
    }

    if (task.status === "in-progress") {
      return { ...task, status: "done" };
    }

    return task;
  });
}

// Extra operation 3: Count tasks by status
function countByStatus(
  tasks: Task[],
  status: TaskStatus
): number {
  return tasks.filter(task => task.status === status).length;
}

// Example usage
let tasks: Task[] = [];

tasks = addTask(tasks, "Learn TypeScript");
tasks = addTask(tasks, "Build TypeTasks");
tasks = advanceTask(tasks, 1);
tasks = completeTask(tasks, 2);

console.log("All tasks:", tasks);
console.log("Todo tasks:", filterByStatus(tasks, "todo"));
console.log("In progress:", filterByStatus(tasks, "in-progress"));
console.log("Done count:", countByStatus(tasks, "done"));

tasks = deleteTask(tasks, 1);
console.log("After deletion:", tasks);
