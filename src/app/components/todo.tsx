"use client";
import React, { useTransition, useState } from "react";

import markCompleted from "../lib/markComplete";
import { useRouter } from "next/navigation";
import CreateTodo from "./createTodo";

export default function Todo({ tasks }: { tasks: Task[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [addTask, setAddTask] = useState(false);

  const isMutating = isFetching || isPending;

  async function handleComplete(id: number) {
    setIsFetching(true);

    await markCompleted(id).then((res) => {
      console.log(res);
    });

    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <ul>
      {tasks
        .filter((task) => !task.completed)
        .map((task) => (
          <li
            key={task.id}
            style={{ opacity: !isMutating ? 1 : 0.7 }}
            className="text-sm hover:cursor-pointer border-b-[1px] border-divider-100"
            onClick={() => handleComplete(task.id)}
          >
            {task.title}
          </li>
        ))}
      {!addTask && (<button
        className="bg-red-500 rounded p-1 px-2"
        onClick={() => {
          setAddTask(true);
        }}
      >
        Add task 
      </button>)}
      {addTask && <CreateTodo setAddTask={setAddTask} />}
    </ul>
  );
}
