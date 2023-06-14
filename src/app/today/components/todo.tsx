"use client";
import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import markCompleted from "./markComplete";

export default function Todo(task: Taskdb) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  async function handleClick(
    event: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) {
    console.log(event.currentTarget.value);
    setIsFetching(true);

    await markCompleted(task.id)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));

    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <li className="flex items-center border-b border-divider-100 pt-2 pb-4">
      <input
        type="checkbox"
        className="form-checkbox rounded-full bg-primary-100 border-divider-200 text-divider-100 hover:bg-divider-100 hover:cursor-pointer   mr-2"
        onClick={handleClick}
      />
      {task.title}
    </li>
  );
}
