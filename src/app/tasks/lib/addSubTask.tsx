"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function addSubTask({
  task,
  taskId,
}: {
  task: UiTask;
  taskId: number;
}) {
  const response = await prisma.subTask.create({
    data: {
      task: {
        connect: {
          id: taskId
        }
      },
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
      completed: task.completed,

    }
  })

  if (!response) throw new Error("Failed to create sub task");
  return response;
}
