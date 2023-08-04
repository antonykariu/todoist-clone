"use client";
import React, { useTransition, useState } from "react";

import markCompleted from "./lib/markComplete";
import { useRouter } from "next/navigation";
import CreateTodo from "./createTodo";
import EditTask from "./editTask";
import EditSubTask from "./editSubTask";

export default function TaskList({
  tasks,
  isSubTask,
}: {
  tasks: Task[];
  isSubTask: boolean;
}) {
  const initial = {
    title: "",
    description: "",
    priority: "p4",
    completed: false,
  };

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const [addTask, setAddTask] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [editSubTask, setEditSubTask] = useState(false);
  const [selected, setSelected] = useState<Partial<UiTask>>(initial);
  const [selectedSub, setSelectedSub] = useState<Partial<UiTask>>(initial);

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

  const today = new Date();

  console.log(tasks);

  return (
    <ul>
      {tasks
        .filter((task) => !task.completed)
        .map((task) => (
          <li
            key={task.id}
            style={{ opacity: !isMutating ? 1 : 0.7 }}
            className="flex  items-center mb-2 text-sm text-divider-200 border-b-[1px] border-divider-100"
          >
            <input
              type="radio"
              name="complete"
              id="complete"
              className="mr-2 bg-primary-200 hover:cursor-pointer"
              onClick={() => handleComplete(task.id)}
            />
            <p
              className="w-full py-1 hover:cursor-pointer"
              onClick={() => {
                isSubTask
                  ? setSelectedSub(task as UiTask)
                  : setSelected(task as UiTask);
                isSubTask ? setEditSubTask(true) : setEditTask(true);
              }}
            >
              {task.title}
            </p>
          </li>
        ))}
      {editSubTask && (
        <EditSubTask subtask={selectedSub} setEditSubTask={setEditSubTask} />
      )}

      {!isSubTask && <h3 className="">Completed</h3>}

      {!isSubTask &&
        tasks
          .filter(
            (task) =>
              task.completed &&
              today.toDateString() === task.updatedAt.toDateString()
          )
          .map((task) => (
            <li
              key={task.id}
              style={{ opacity: !isMutating ? 1 : 0.7 }}
              className="text-sm text-divider-200 hover:cursor-pointer border-b-[1px] border-divider-100 line-through decoration-divider-200 py-2"
            >
              {task.title}
            </li>
          ))}
      {!addTask && !isSubTask && (
        <button
          className="bg-red-500 rounded p-1 px-2"
          onClick={() => {
            setAddTask(true);
          }}
        >
          Add task
        </button>
      )}
      {addTask && (
        <CreateTodo setAddTask={setAddTask} isSubTask={false} taskId={0} />
      )}
      {editTask && !isSubTask && (
        <EditTask task={selected} setEditTask={setEditTask} />
      )}
    </ul>
  );
}
