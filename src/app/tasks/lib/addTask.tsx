"use server";
import { PrismaClient } from "@prisma/client";

const prisma  = new PrismaClient()

export async function addTask(task: UpdateTask) {
  const response = await prisma.task.create({
    data: task,
  });

  if (!response) throw new Error("Failed to create task");
  return response;
}