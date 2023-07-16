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
type TaskObj = {
  title: string;
  description?: string;
  priority?: string;
  completed: boolean;
  dueDate?: Date;
};


