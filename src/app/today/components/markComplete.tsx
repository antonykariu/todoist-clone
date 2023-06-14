"use server";
import prisma from "../../../../prisma/client";

export default async function markCompleted(id: string) {
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
