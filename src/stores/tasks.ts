import { defineStore } from "pinia";

export type TaskStatus = "todo" | "inprogres" | "done";
export interface Task {
  id: number | string;
  title: string;
  description: string;
  status: TaskStatus;
}
// @ts-ignore
export const useTasks = defineStore("tasks", {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    createTask(newTask: Task) {
      const id = crypto.randomUUID();
      this.tasks.push({ ...newTask, id });
    },

    deleteTask(id: string) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },

    changeTaskStatus(id: string, newStatus: TaskStatus) {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.status = newStatus;
      }
    },
  },
  getters: {
    getTasks: (s) => s.tasks,
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "tasks",
        storage: localStorage,
      },
    ],
  },
});
