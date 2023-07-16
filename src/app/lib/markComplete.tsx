"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function markCompleted(id: number) {
  const response = await prisma.task.update({
    where: {
      id,
    },
    data: {
      completed: true,
    },
  });
  if (!response) return [];

  return response;
}
