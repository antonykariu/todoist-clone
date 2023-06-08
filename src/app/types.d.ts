type Task = {
    id: string,
    title: string,
    description?: string,
    priority?: string,
    dueDate?: Date,
    completed: boolean,
    createdAt: Date,
    updatedAt: Date,
}
type TaskObj = {
    title: string;
    description?: string;
    priority?: string;
    completed: boolean;
    dueDate?: Date;
  };