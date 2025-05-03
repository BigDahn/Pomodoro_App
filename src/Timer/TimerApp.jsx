import React, { useEffect } from "react";
import { usePomodoro } from "../contexts/Pomodoro";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

function TimerApp() {
  const { timer, dispatch, status, maxValue, initialFont, initialColor } =
    usePomodoro();

  const mins = Math.floor(timer / 60);
  const sec = timer % 60;

  const value = mins < 1 ? sec : mins;

  const MaxValue = mins > 1 && maxValue;

  useEffect(() => {
    //dispatch({ type: "on" });
    if (status) {
      const time = setInterval(() => {
        dispatch({ type: "on" });
      }, 1000);
      return () => clearInterval(time);
    }
  }, [status, dispatch]);

  return (
    <div>
      <h5>{timer}</h5>
      {timer === 0 ? (
        <button
          className="h-[22rem] w-[22rem] bg-[#1E213F] rounded-full flex flex-col m-auto  items-center justify-center shadow-2xl shadow-[#2E325A]"
          role="button"
          onClick={() => {
            dispatch({ type: "restart" });
          }}
        >
          <div className=" h-[19rem] w-[19rem] bg-[#161932] rounded-full">
            <CircularProgressbarWithChildren
              value={mins}
              maxValue={maxValue}
              styles={{
                // Customize the root svg element
                root: {},
                // Customize the path, i.e. the "completed progress"
                path: {
                  // Path color
                  stroke: `${initialColor}`,
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: "round",
                  // Customize transition animation
                  transition: "stroke-dashoffset 0.5s ease 0s",
                  // Rotate the path

                  transformOrigin: "center center",
                },
                // Customize the circle behind the path, i.e. the "total progress"
                trail: {
                  // Trail color
                  stroke: "#d6d6d6",
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: "round",
                  // Rotate the trail
                  transform: "rotate(0.25turn)",
                  transformOrigin: "center center",
                },
                // Customize the text
                text: {
                  // Text color
                  fill: "#f88",
                  // Text size
                  fontSize: "16px",
                },
                // Customize background - only used when the `background` prop is true
                background: {
                  fill: "#3e98c7",
                },
              }}
            >
              <div className="flex flex-col">
                <h2
                  className={`text-[5rem] text-white font-bold text-center font-${initialFont}`}
                >
                  {mins < 10 ? `0${mins}` : mins}:{sec < 10 ? `0${sec}` : sec}
                </h2>
                <h4
                  className={`text-[20px] font-bold text-white font-${initialFont} tracking-[5px] text-center`}
                >
                  RESTART
                </h4>
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </button>
      ) : (
        <button
          className="h-[22rem] w-[22rem] bg-[#1E213F] rounded-full flex flex-col m-auto  items-center justify-center shadow-2xl shadow-[#2E325A]"
          role="button"
          onClick={() => {
            dispatch({ type: "start/pause" });
          }}
          disabled={timer <= 0}
        >
          <div className=" h-[19rem] w-[19rem] bg-[#161932] rounded-full">
            <CircularProgressbarWithChildren
              value={value}
              maxValue={MaxValue}
              styles={{
                // Customize the root svg element
                root: {},
                // Customize the path, i.e. the "completed progress"
                path: {
                  // Path color
                  stroke: `${initialColor}`,
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: "round",
                  // Customize transition animation
                  transition: "stroke-dashoffset 0.5s ease 0s",
                  // Rotate the path

                  transformOrigin: "center center",
                },
                // Customize the circle behind the path, i.e. the "total progress"
                trail: {
                  // Trail color
                  stroke: "#d6d6d6",
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: "round",
                  // Rotate the trail
                  transform: "rotate(0.25turn)",
                  transformOrigin: "center center",
                },
                // Customize the text
                text: {
                  // Text color
                  fill: "#f88",
                  // Text size
                  fontSize: "16px",
                },
                // Customize background - only used when the `background` prop is true
                background: {
                  fill: "#3e98c7",
                },
              }}
            >
              <div className="flex flex-col">
                <h2
                  className={`text-[5rem] text-white font-bold text-center font-${initialFont}`}
                >
                  {mins < 10 ? `0${mins}` : mins}:{sec < 10 ? `0${sec}` : sec}
                </h2>
                <h4
                  className={`text-[20px] font-bold text-white font-${initialFont} tracking-[5px] text-center`}
                >
                  {status ? "PAUSE" : "START"}
                </h4>
              </div>
            </CircularProgressbarWithChildren>
          </div>
        </button>
      )}
    </div>
  );
}

export default TimerApp;
