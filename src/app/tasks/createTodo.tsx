"use client";
import React, { useReducer, useState, useTransition } from "react";

import { addTask } from "./lib/addTask";
import { useRouter } from "next/navigation";
import DueDate from "./dueDate";

export default function CreateTodo({
  setAddTask,
}: {
  setAddTask: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const d = new Date();
  const initial = {
    title: "",
    description: "",
    dueDate: d,
    priority: "p4",
    completed: false,
  };

  const [state, dispatch] = useReducer(
    (state: Partial<UiTask>, action: Partial<UiTask>) => ({
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
        setAddTask(false);
      })
      .catch((error) => console.log(error));
    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="container w-full flex">
      <form
        onSubmit={handleSubmit}
        className="w-full border border-divider-100 rounded-xl"
      >
        <div className="flex flex-wrap">
          <div className="w-full px-sm pt-sm">
            <textarea
              onInput={(e) => {
                e.currentTarget.style.height = "";
                e.currentTarget.style.height =
                  Math.min(e.currentTarget.scrollHeight, 150) + "px";
              }}
              className="w-full bg-primary-100 border-none focus:ring-0 text-sm text-content-100 placeholder:text-content-200 resize-none font-semibold p-0"
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
              className="w-full bg-primary-100 border-none focus:ring-0 text-[13px] resize-none p-0 placeholder:text-content-200"
              onChange={(e) => dispatch({ description: e.target.value })}
              value={state.description}
              placeholder="Description"
              rows={1}
            ></textarea>
          </div>
          <div className="w-full flex px-[10px] border-b border-divider-100 pb-[12px]">
            <DueDate />
            <select
              className="border-divider-100 bg-none bg-primary-100 p-0 px-2 rounded text-[13px] h-[28px] text-content-200"
              onChange={(e) => dispatch({ priority: e.target.value })}
            >
              <option value="p1">P1</option>
              <option value="p2">p2</option>
              <option value="p3">p3</option>
              <option value="p4" defaultValue={"p4"}>
                Priority
              </option>
            </select>
          </div>
          <div className="w-full flex flex-1 justify-end p-[8px] pr-[12px] ">
            <button
              type="reset"
              className="bg-primary-300 hover:bg-divider-100 px-sm-2 rounded-md text-[13px] font-semibold border border-primary-100 mr-2 leading-8 h-8 w-[68px]"
              onClick={() => {
                setAddTask(false);
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-disabled-100  border border-disabled-100 px-sm-2 text-[13px] rounded-md font-semibold border border-primary-100 disabled:opacity-50 disabled:cursor-not-allowed leading-8 h-8 w-[77.8906px]"
              disabled={state.title === "" ? true : false}
            >
              Add task
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
