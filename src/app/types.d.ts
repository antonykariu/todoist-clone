type Task = {
  id: number;
  title: string;
  description: string | null;
  priority: string | null;
  dueDate: Date | null;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type UiTask = Omit<Task, "description | priority"> & {
  description: string | number | readonly string[] | undefined;
  priority: string | number | readonly string[] | undefined;
}

