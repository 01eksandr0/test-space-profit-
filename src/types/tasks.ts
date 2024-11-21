export type TaskStatus = "todo" | "inprogres" | "done";
export type Task = {
  id: number | string;
  title: string;
  description: string;
  status: TaskStatus;
};
