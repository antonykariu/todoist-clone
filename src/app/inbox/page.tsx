"use client";
import createTask from "@/lib/createTask";
import React, { useReducer } from "react";

export default function Inbox() {
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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    createTask(state)
      .then((task) => {
        console.log(task);
        dispatch(initial);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex">
      <h1>Inbox</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label htmlFor="title">Title</label>
          <input
            className="text-gray-900 m-1 p-1 outline outline-offset-0 hover:outline-blue-200 focus:outline-blue-700"
            type="text"
            name="title"
            placeholder="Title"
            value={state.title}
            onChange={(e) => dispatch({ title: e.target.value })}
            required
          />
          <label htmlFor="description">Description</label>

          <input
            className="text-gray-900 m-1 p-1 outline outline-offset-0 hover:outline-blue-200 focus:outline-blue-700"
            type="text"
            name="description"
            placeholder="Description"
            value={state.description}
            onChange={(e) => dispatch({ description: e.target.value })}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="priority">Priority</label>

          <select
            className="text-gray-900 m-1 p-1 outline outline-offset-0 hover:outline-blue-200 focus:outline-blue-700"
            name="priority"
            onChange={(e) => dispatch({ priority: e.target.value })}
          >
            <option>Select</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
            <option value="4">High</option>
          </select>
          <input
            type="radio"
            name="completed"
            value={state.completed === true ? "true" : "false"}
            onChange={(e) =>
              dispatch({ completed: e.target.value === "true" ? true : false })
            }
          />
        </fieldset>

        <button
          type="submit"
          className="bg-blue-400 p-1 px-4 my-4 rounded-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
