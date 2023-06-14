import React, { Suspense } from "react";
import getTodos from "./components/getTodos";
import CreateTodo from "./components/createTodo";
import Todo from "./components/todo";

export default async function Today() {
  const todos = await getTodos();

  return (
    <div className="flex flex-wrap">
      <nav className="flex w-full py-3 px-4">
        <h1 className="font-200 text-xl">Today</h1>
      </nav>
      <Suspense fallback={<div>Loading...</div>}>
        <ul className="w-4xl">
          {todos.filter(todo => !todo.completed).map((todo) => (
            <Todo {...todo} key={todo.id} />
          ))}
        </ul>
      </Suspense>

      <CreateTodo />
    </div>
  );
}
