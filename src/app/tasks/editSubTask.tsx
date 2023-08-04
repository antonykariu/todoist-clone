"use client";

import React, { useReducer, useState } from "react";
import updateSubTask from "./lib/updateSubTask";

type UiTask = Omit<Task, "description | priority"> & {
  subTasks?: Task[];
  description: string | number | readonly string[] | undefined;
  priority: string | number | readonly string[] | undefined;
};

export default function EditSubTask({
  subtask,
  setEditSubTask,
}: {
  subtask: Partial<UiTask>;
  setEditSubTask: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [state, dispatch] = useReducer(
    (state: Partial<UiTask>, action: Partial<UiTask>) => ({
      ...state,
      ...action,
    }),
    subtask
  );

  const [editTaskLocal, setEditTaskLocal] = useState(false);

  function handleUpdateTask() {
    updateSubTask(state)
      .then((result) => console.log(result))
      .then(() => {
        dispatch({ ...subtask });
        setEditSubTask(false);
      });
  }

  console.log(state);

  return (
      <div className="min-w-[422px] pb-0 ">
        <div
          className={
            editTaskLocal ? "border rounded-xl border-divider-100 p-2" : ""
          }
        >
          <textarea
            onInput={(e) => {
              e.currentTarget.style.height = "";
              e.currentTarget.style.height =
                Math.min(e.currentTarget.scrollHeight, 150) + "px";
            }}
            className="w-full bg-primary-100 border-none focus:ring-0 text-lg text-content-100 placeholder:text-content-200 resize-none font-semibold p-0"
            onChange={(e) => dispatch({ title: e.target.value })}
            onClick={() => setEditTaskLocal(true)}
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
            className="w-full bg-primary-100 border-none focus:ring-0 text-[13px] text-divider-200 resize-none p-0 placeholder:text-content-200"
            onChange={(e) => dispatch({ description: e.target.value })}
            onClick={() => setEditTaskLocal(true)}
            value={state.description === "" ? "" : state.description}
            placeholder="Description"
            rows={1}
          ></textarea>
        </div>

        <div className="flex flex-1 justify-end p-[8px] pr-0 ">
          <button
            type="reset"
            className="bg-primary-300 hover:bg-divider-100 px-sm-2 rounded-md text-[13px] font-semibold border border-primary-100 mr-2 leading-8 h-8 w-[68px]"
            onClick={() => {
              setEditTaskLocal(false);
              setEditSubTask(false);
              dispatch({ ...subtask });
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-disabled-100  border border-disabled-100 px-sm-2 text-[13px] rounded-md font-semibold border border-primary-100 disabled:opacity-50 disabled:cursor-not-allowed leading-8 h-8 w-[77.8906px]"
            disabled={state.title === "" ? true : false}
            onClick={() => {
              handleUpdateTask();
            }}
          >
            Save
          </button>
        </div>
      </div>
  );
}
