"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { IconContext } from "react-icons";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { HiOutlineSun } from "react-icons/hi2";
import { MdOutlineChair } from "react-icons/md";
import { CgCalendarNext } from "react-icons/cg";

const DueDate = (props: {
  popper: boolean;
  setPopper: Dispatch<SetStateAction<boolean>>;
}) => {
  const { popper, setPopper } = props;


  const [dueDate, setDueDate] = useState(1);

  return (
    <div className="max-w-max ">
      <div className="w-[72px] bg-primary-100 border border-divider-200 rounded focus:outline-none text-xs px-sm-3">
        <div className="py-1">
          <div
            className="bg-primary-100 focus:outline-none w-[60px] hover:cursor-pointer text-divider-200"
          >{
            dueDate === 1 ? "Due Date" : new Date(dueDate).toDateString().slice(4, 10)
          }</div>
        </div>
        <div
          className="absolute w-modal bg-primary-100 border border-divider-100 rounded-lg"
          style={{ display: popper ? "block" : "none" }}
        >
          <div className="flex py-sm-4 pr-[13px] pl-[10px]">
            <input
              placeholder="Type a due date"
              value={
                dueDate === 1
                  ? ""
                  : new Date(dueDate).toDateString().slice(4, 10)
              }
              className="w-full bg-primary-100 border-none focus:outline-none"
            />
          </div>
          <div className="border border-x-0 border-divider-100 py-1">
            <div className="flex items-center justify-between hover:cursor-pointer hover:bg-[rgba(255,255,255,0.1)] py-1 px-sm">
              <div
                className="flex items-center"
                onClick={() => {
                  setDueDate(Date.now()), setPopper(false);
                }}
              >
                <IconContext.Provider
                  value={{ color: "rgb(28,140,58)", size: "23px" }}
                >
                  <IoCalendarNumberOutline />
                </IconContext.Provider>
                <p className="p-0 ml-1 ">Today</p>
              </div>

              <div className="text-divider-200">
                {new Date().toDateString().slice(0, 3)}
              </div>
            </div>
            <div className="flex items-center justify-between hover:cursor-pointer hover:bg-[rgba(255,255,255,0.1)] py-1 px-sm">
              <div
                className="flex items-center"
                onClick={() => setDueDate(Date.now() + 86400000)}
              >
                <IconContext.Provider
                  value={{ color: "rgb(235, 134, 0)", size: "23px" }}
                >
                  <HiOutlineSun />
                </IconContext.Provider>
                <p className="p-0 ml-1 ">Tomorrow</p>
              </div>

              <div className="text-divider-200">
                {new Date(Date.now() + 86400000).toDateString().slice(0, 3)}
              </div>
            </div>
            <div className="flex items-center justify-between hover:cursor-pointer hover:bg-[rgba(255,255,255,0.1)] py-1 px-sm">
              <div
                className="flex items-center"
                onClick={() =>
                  setDueDate(
                    new Date(Date.now()).setDate(
                      new Date(Date.now()).getDate() +
                        ((new Date(Date.now()).getDay() - 2) % 7)
                    )
                  )
                }
              >
                <IconContext.Provider
                  value={{ color: "rgb(41, 126, 255)", size: "23px" }}
                >
                  <MdOutlineChair />
                </IconContext.Provider>
                <p className="p-0 ml-1 ">This weekend</p>
              </div>

              <div className="text-divider-200">
                {new Date(
                  new Date(Date.now()).setDate(
                    new Date(Date.now()).getDate() +
                      ((new Date(Date.now()).getDay() - 2) % 7)
                  )
                )
                  .toDateString()
                  .slice(0, 3)}
              </div>
            </div>
            <div className="flex items-center justify-between hover:cursor-pointer hover:bg-[rgba(255,255,255,0.1)] py-1 px-sm">
              <div
                className="flex items-center"
                onClick={() =>
                  setDueDate(
                    new Date(Date.now()).setDate(
                      new Date(Date.now()).getDate() +
                        ((new Date(Date.now()).getDay() - 0) % 7)
                    )
                  )
                }
              >
                <IconContext.Provider
                  value={{ color: "rgb(145, 71, 255)", size: "24px" }}
                >
                  <CgCalendarNext />
                </IconContext.Provider>
                <p className="p-0 ml-1 ">Next week</p>
              </div>

              <div className="text-divider-200">
                {new Date(
                  new Date(Date.now()).setDate(
                    new Date(Date.now()).getDate() +
                      ((new Date(Date.now()).getDay() - 0) % 7)
                  )
                )
                  .toDateString()
                  .slice(0, 3)}
              </div>
            </div>
          </div>
          <div>some</div>
          <div>something</div>
        </div>
      </div>
    </div>
  );
};

export default DueDate;
