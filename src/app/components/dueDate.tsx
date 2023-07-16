import { useState } from "react";

import { Calendar, theme } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';

export default function DueDate() {
  const [open, setOpen] = useState(false);
  const { token } = theme.useToken();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('YYYY-MM-DD'), mode);
  };

  const wrapperStyle: React.CSSProperties = {
    width: 252,
  };

  return (
    <div>
      <button
        className="border border-divider-100  px-2 rounded text-[13px] mr-3 h-[28px] text-content-200"
        type="button"
        onClick={handleOpen}
      >
        Due date
      </button>
      {open && (
        <div
          className=" flex flex-wrap absolute shadow-lg top-0 translate-x-[154px] translate-y-[49px] right-auto bottom-auto left-0 rounded-lg w-[252px] h-[427px] border border-divider-100 flex flex-wrap bg-primary-200"
          onMouseLeave={() => handleClose()}
        >
          <div className="h-[43px] w-full border-b border-divider-100 flex p-2 pl-[13px] pr-[10px]">
            <input
              type="text"
              className="bg-primary-300 border-none text-sm py-[1px] px-[2px] w-full placeholder:text-divider-200 text-white focus:ring-0"
              placeholder="Today"
            />
          </div>
          <div style={wrapperStyle}>
          <Calendar fullscreen={false} onPanelChange={onPanelChange} />
          </div>
        </div>
      )}
    </div>
  );
}


