import CreateTask from "./components/createTask";

export default function Today() {
  return (
    <div className="flex flex-wrap">
      <nav className="flex w-full py-3 px-4">
      <h1 className="font-200 text-xl">Today</h1>
      </nav>
      <CreateTask />
    </div>
  );
}
