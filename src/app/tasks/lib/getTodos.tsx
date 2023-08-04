"use server";
import { PrismaClient } from "@prisma/client";

export default async function getTodos() {
  const prisma = new PrismaClient();
  const tasks = await prisma.task.findMany({
    include: {
      subTasks: true,
    },
  });

  return tasks;
}
