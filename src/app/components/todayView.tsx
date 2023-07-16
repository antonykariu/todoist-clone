"use client";

import { Suspense, useEffect, useState } from "react";
import getTodos from "../lib/getTodos";
import WowSuchEmpty from "./wowSuchEmpty";
import Todo from "./todo";

export default async function TodayView() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const userTasks: Promise<Task[]> = getTodos();
      const list = await userTasks;
      console.log(list);
      setTasks(list);
    })();
  }, [setTasks]);

  if (tasks.length > 1)
    return (
      <div>
            <Todo tasks={tasks}/>
      </div>
    );
  else return <>Loading something...</>;
}
