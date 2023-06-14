"use server";
import prisma from "../../../../prisma/client";

export async function addTask(task: TaskObj) {
  "use server";
  const response = await prisma.task.create({
    data: task,
  });

  if (!response) throw new Error("Failed to create task");
  return response;
}
