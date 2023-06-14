"use server";
import prisma from "../../../../prisma/client";

export default async function getTodos() {
  const response = await prisma.task.findMany();
  if (!response) return [];

  return response;
}
