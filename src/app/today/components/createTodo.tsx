"use client";
import React, { useReducer, useState, useTransition } from "react";
import { addTask } from "./addTask";
import { useRouter } from "next/navigation";

export default function CreateTodo() {
  const initial = {
    title: "",
    description: "",
    priority: "0",
    completed: false,
  };

  const [state, dispatch] = useReducer(
    (state: TaskObj, action: Partial<TaskObj>) => ({
      ...state,
      ...action,
    }),
    initial
  );
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);

  const isMutating = isFetching || isPending;

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setIsFetching(true);

    await addTask(state)
      .then((task) => {
        console.log(task);
        dispatch(initial);
      })
      .catch((error) => console.log(error));
    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        className="w-4xl border border-divider-100 rounded-xl"
      >
        <div className="flex flex-wrap px-sm pt-sm">
          <div className="mb-sm w-full">
            <textarea
              onInput={(e) => {
                e.currentTarget.style.height = "";
                e.currentTarget.style.height =
                  Math.min(e.currentTarget.scrollHeight, 150) + "px";
              }}
              className="w-full bg-primary-100 border-none focus:ring-0 text-sm resize-none font-semibold"
              onChange={(e) => dispatch({ title: e.target.value })}
              value={state.title}
              placeholder="Task name"
              rows={1}
            ></textarea>
            <textarea
              onInput={(e) => {
                e.currentTarget.style.height = "";
                e.currentTarget.style.height =
                  Math.min(e.currentTarget.scrollHeight, 150) + "px";
              }}
              className="w-full bg-primary-100 border-none focus:ring-0 text-xs resize-none"
              onChange={(e) => dispatch({ description: e.target.value })}
              value={state.description}
              placeholder="Description"
              rows={1}
            ></textarea>
          </div>
          <div className="mb-sm w-full">
            <select
              className="bg-primary-100 border border-divider-100 rounded-md px-2 py-1 text-xs"
              name="priority"
              onChange={(e) => dispatch({ priority: e.target.value })}
            >
              <option>Select</option>
              <option value="1">🏳</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
              <option value="4">High</option>
            </select>
          </div>
          <div className="mb-sm w-full flex flex-1 justify-end">
            <button
              type="reset"
              className="bg-divider-100 px-sm-2 rounded-md text-sm mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-disabled-100 border border-disabled-100 px-sm-2 py-1 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={state.title === "" ? true : false}
            >
              Add Task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
