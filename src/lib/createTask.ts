"use server"
import prisma from "../../prisma/client";

export default async function createTask(task: TaskObj) {
  const response = await prisma.task.create({
    data: task,
  });

  if (!response) throw new Error("Failed to create task");
  return response;
}
