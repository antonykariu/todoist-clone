import { Suspense } from "react";
import TodayView from "../components/todayView";

export default async function Today() {
  const today = new Date(Date.now()).toDateString().slice(0, 10);

  return (
    <div className="flex flex-wrap px-[55px] justify-center">
      <header className="flex pt-[36px] pb-2 w-[800px]">
        <h1 className="font-bold text-xl">
          Today <span className="text-xs text-divider-200 font-normal">{today}</span>
        </h1>
      </header>
      <main className="w-[800px]">
        <Suspense fallback={<div>Loading...</div>}>
          <TodayView />
        </Suspense>
      </main>
    </div>
  );
}
