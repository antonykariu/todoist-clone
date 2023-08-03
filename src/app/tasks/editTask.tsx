"use client";

import React, { useReducer, useState } from "react";
import updateTask from "./lib/updateTask";
import Select from "react-select";

type UiTask = Omit<Task, "description | priority"> & {
  description: string | number | readonly string[] | undefined;
  priority: string | number | readonly string[] | undefined;
};

export default function EditTask({
  task,
  setEditTask,
}: {
  task: Partial<UiTask>;
  setEditTask: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [state, dispatch] = useReducer(
    (state: Partial<UiTask>, action: Partial<UiTask>) => ({
      ...state,
      ...action,
    }),
    task
  );

  const [editTaskLocal, setEditTaskLocal] = useState(false);

  function handleUpdateTask() {
    updateTask(state)
      .then((result) => console.log(result))
      .then(() => {
        dispatch({ ...task });
        setEditTask(false);
      });
  }

  const options = [
    { value: "P1", label: "P1" },
    { value: "P2", label: "P2" },
    { value: "P3", label: "P3" },
    { value: "P4", label: "Priority" },
  ];

  console.log(state.priority);
  return (
    <>
      <div
        className="absolute w-full left-0 bg-primary-400  h-full top-0 p-[32px] flex flex-wrap justify-center"
        onClick={() => setEditTask(false)}
      ></div>
      <div className="absolute top-11 border border-divider-100 rounded-lg max-w-[867px] bg-primary-100 flex">
        <div className="min-w-[472px] pb-0 p-[16px]">
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
              className="w-full bg-primary-100 border-none focus:ring-0 text-[13px] resize-none p-0 placeholder:text-content-200"
              onChange={(e) => dispatch({ description: e.target.value })}
              onClick={() => setEditTaskLocal(true)}
              value={state.description === "" ? "" : state.description}
              placeholder="Description"
              rows={1}
            ></textarea>
          </div>

          {editTaskLocal && (
            <div className="flex flex-1 justify-end p-[8px] pr-0 ">
              <button
                type="reset"
                className="bg-primary-300 hover:bg-divider-100 px-sm-2 rounded-md text-[13px] font-semibold border border-primary-100 mr-2 leading-8 h-8 w-[68px]"
                onClick={() => {
                  setEditTaskLocal(false);
                  dispatch({ ...task });
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
          )}
        </div>
        <div className="pb-0 p-[16px] flex flex-wrap min-w-[260px] bg-primary-200">
          <Select
            className="border-t-0 border-x-0 border-divider-100 disabled:cursor-no-drop w-full bg-none bg-primary-200 p-0 px-2  text-[13px] h-[28px] text-content-200"
            onChange={(OnChangeValue) =>
              dispatch({ priority: OnChangeValue?.value })
            }
            options={options}
            isDisabled={editTaskLocal ? true : false}
            defaultValue={{value: state.priority}}
          />
        </div>
      </div>
    </>
  );
}
