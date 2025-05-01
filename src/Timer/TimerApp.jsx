import React, { useEffect } from "react";
import { usePomodoro } from "../contexts/Pomodoro";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";

function TimerApp() {
  const { timer, dispatch, status, maxValue, initialFont } = usePomodoro();

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

  return (
    <div>
      <button
        className="h-[22rem] w-[22rem] bg-[#1E213F] rounded-full flex flex-col m-auto  items-center justify-center shadow-2xl shadow-[#2E325A]"
        role="button"
        onClick={() => {
          dispatch({ type: "start/pause" });
        }}
        disabled={timer <= 0}
      >
        <div className=" h-[19rem] w-[19rem] bg-[#161932] rounded-full">
          <CircularProgressbarWithChildren value={timer} maxValue={maxValue}>
            {" "}
            <div className="flex flex-col">
              <h2
                className={`text-[5rem] text-white font-bold text-center font-${initialFont}`}
              >
                {mins < 10 ? `0${mins}` : mins}:{sec < 10 ? `0${sec}` : sec}
              </h2>
              <h4
                className={`text-[20px] font-bold text-white font-${initialFont}`}
              >
                {status ? "pause" : "start"}
              </h4>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </button>
    </div>
  );
}

export default TimerApp;
