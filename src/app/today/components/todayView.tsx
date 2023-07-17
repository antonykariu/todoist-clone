"use client";

import { Suspense, useEffect, useState } from "react";
import getTodos from "../../tasks/getTodos";
import WowSuchEmpty from "./wowSuchEmpty";
import TaskList from "../../tasks/taskList";

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
        <TaskList tasks={tasks} />
      </div>
    );
  else return <>Loading something...</>;
}
