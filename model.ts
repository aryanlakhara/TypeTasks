
export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

let nextId = 1;

export function addTask(
  tasks: Task[],
  title: string,
  status: TaskStatus = "todo"
): Task[] {
  const newTask: Task = {
    id: nextId++,
    title,
    status
  };

  return [...tasks, newTask];
}

export function completeTask(
  tasks: Task[],
  id: number
): Task[] {
  return tasks.map(task =>
    task.id === id ? { ...task, status: "done" } : task
  );
}

export function filterByStatus(
  tasks: Task[],
  status: TaskStatus
): Task[] {
  return tasks.filter(task => task.status === status);
}

export function deleteTask(
  tasks: Task[],
  id: number
): Task[] {
  return tasks.filter(task => task.id !== id);
}

export function advanceTask(
  tasks: Task[],
  id: number
): Task[] {
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

export function countByStatus(
  tasks: Task[],
  status: TaskStatus
): number {
  return tasks.filter(task => task.status === status).length;
}
