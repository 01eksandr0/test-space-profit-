import { defineStore } from "pinia";
import { Task, TaskStatus } from "../types/tasks.ts";
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
    getTasks: (s): Task[] => s.tasks,
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
