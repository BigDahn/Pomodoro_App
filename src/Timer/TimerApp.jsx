import React, { useEffect } from "react";
import { usePomodoro } from "../contexts/Pomodoro";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

function TimerApp() {
  const { timer, dispatch, status, maxValue, initialFont, initialColor } =
    usePomodoro();

  const MaxValue = maxValue * 60;
  const mins = Math.floor(timer / 60);
  const sec = timer % 60;

  useEffect(() => {
    //dispatch({ type: "on" });
    if (status) {
      const time = setInterval(() => {
        dispatch({ type: "on" });
      }, 1000);
      return () => clearInterval(time);
    }
  }, [status, dispatch]);

  const radius = window.innerWidth < 460 ? 117 : 170;

  const circumference = 2 * Math.PI * radius;
  const strokeOffset = ((MaxValue - timer) / MaxValue) * circumference;

  return (
    <div>
      {timer === 0 ? (
        <button
          className="h-[25rem] w-[25rem] bg-[#1E213F] rounded-full flex  m-auto  items-center justify-center shadow-2xl shadow-[#2E325A]"
          role="button"
          onClick={() => {
            dispatch({ type: "restart" });
          }}
        >
          <div className=" h-[22.6rem] w-[22.6rem] bg-[#161932] rounded-full relative flex flex-col">
            <svg className="h-full w-full absolute rotate-[270deg] ">
              <circle
                cy="50%"
                cx="50%"
                r={radius}
                className="circle"
                stroke="white"
                strokeWidth={10}
                fill="none"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: 0,
                }}
              />
            </svg>
            <div className="flex flex-col cursor-pointer m-auto items-center  ">
              <div
                className={`text-[4.5rem] text-white font-bold text-center ${initialFont} flex items-center gap-1 w-[14rem] justify-evenly   m-auto`}
              >
                <h2
                  className={`text-[5rem] text-white font-bold text-center ${initialFont}`}
                >
                  {mins < 10 ? `0${mins}` : mins}:{sec < 10 ? `0${sec}` : sec}
                </h2>
              </div>

              <h4
                className={`text-[25px] font-bold text-white ${initialFont} tracking-[10px] text-center ml-6 `}
              >
                RESTART
              </h4>
            </div>
          </div>
        </button>
      ) : (
        <button
          className="h-[25rem] w-[25rem] bg-[#1E213F] rounded-full flex  m-auto  items-center justify-center shadow-2xl shadow-[#2E325A]"
          role="button"
          onClick={() => {
            dispatch({ type: "start/pause" });
          }}
          disabled={timer <= 0}
        >
          <div className=" h-[22.6rem] w-[22.6rem] bg-[#161932] rounded-full relative flex flex-col">
            <svg className="h-full w-full absolute rotate-[270deg] ">
              <circle
                cy="50%"
                cx="50%"
                r={radius}
                className="circle"
                stroke={initialColor.fill}
                strokeWidth={10}
                fill="none"
                style={{
                  strokeDasharray: circumference,
                  strokeDashoffset: strokeOffset,
                }}
              />
            </svg>
            <div className="flex flex-col cursor-pointer m-auto items-center  ">
              <div
                className={`text-[4.5rem] text-white font-bold text-center ${initialFont} flex items-center gap-1 w-[14rem] justify-evenly   m-auto`}
              >
                <h4 className="w-[7rem]">{mins < 10 ? `0${mins}` : mins}</h4>:
                <h3
                  className={`${
                    mins < 1 && sec < 30
                      ? "w-[7rem] text-red-600 animate-pulse"
                      : "w-[7rem] "
                  }`}
                >
                  {" "}
                  {sec < 10 ? `0${sec}` : sec}
                </h3>
              </div>
              <h4
                className={`text-[25px] font-bold text-white ${initialFont} tracking-[10px] text-center ml-3 `}
              >
                {status ? "PAUSE" : "START"}
              </h4>
            </div>
          </div>
        </button>
      )}
    </div>
  );
}

export default TimerApp;
