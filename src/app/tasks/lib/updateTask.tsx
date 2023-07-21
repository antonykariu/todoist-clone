"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function updateTask(task: Partial<Task>) {
  const response = await prisma.task.update({
    where: {
      id: task.id,
    },
    data: {
      title: task.title,
      description: task.description,
      priority: task.priority,
      completed: task.completed,
      dueDate: task.dueDate,
    },
  });
  if (!response) return [];

  return response;
}
