import React from "react";
import { usePomodoro } from "../contexts/Pomodoro";

function SettingsModal() {
  const { dispatch, initialFont, fonts } = usePomodoro();

  console.log(initialFont);
  return (
    <div
      className={`bg-white w-[540px] h-[470px] fixed   m-auto z-[99999] rounded-3xl bottom-[100px] font-${initialFont} `}
    >
      <div className="flex items-center justify-between py-6 border-b border-gray-300 ">
        <h3
          className={`text-[#161932] font-bold font-${initialFont} text-4xl px-6`}
        >
          Settings
        </h3>
        <img
          src="/assets/icon-close.svg"
          className="px-6 cursor-pointer"
          role="button"
          onClick={() => dispatch({ type: "closeModal" })}
        />
      </div>
      <section className="px-6 py-7">
        <div
          className={`flex flex-col gap-3 border-b pb-5 border-gray-300 font-${initialFont} font-bold text-[#161932]`}
        >
          <h2>TIME (MINUTES)</h2>
          <div className="flex gap-5 items-center justify-evenly">
            <div className="flex flex-col gap-2">
              <label htmlFor="pomodoro" className="text-gray-400">
                pomodoro
              </label>
              <input
                type="text"
                className="bg-gray-300 h-10 w-[9rem] rounded-md outline-none px-4 relative"
                name="pomodoro"
              />
              <div className="absolute bottom-[15.7rem] left-[9.4rem] flex flex-col gap-3">
                <img src="/assets/icon-arrow-up.svg" />
                <img src="/assets/icon-arrow-down.svg" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="short break" className="text-gray-400">
                short break
              </label>
              <input
                type="text"
                className="bg-gray-300 h-10 w-[9rem] rounded-md outline-none px-4 relative"
                name="short break"
              />
              <div className="absolute bottom-[15.7rem] right-[13rem] flex flex-col gap-3">
                <img src="/assets/icon-arrow-up.svg" />
                <img src="/assets/icon-arrow-down.svg" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="long break" className="text-gray-400">
                long break
              </label>
              <input
                type="text"
                className="bg-gray-300 h-10 w-[9rem] rounded-md outline-none px-4 relative"
                name="long break"
              />
              <div className="absolute bottom-[15.7rem] right-[2.3rem] flex flex-col gap-3">
                <img src="/assets/icon-arrow-up.svg" />
                <img src="/assets/icon-arrow-down.svg" />
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex items-center justify-between py-7 border-b border-gray-300 font-${initialFont} font-bold text-[#161932]`}
        >
          <h3>FONTS</h3>
          <div className="flex justify-evenly items-center gap-2">
            {fonts.map((s, i) => {
              return (
                <div
                  key={i}
                  className={`h-[40px] w-[40px] rounded-full bg-red-500 flex items-center justify-center font-bold font-${s}`}
                  role="button"
                  onClick={() => dispatch({ type: "font", payload: s })}
                >
                  Aa
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-between py-7 font-bold font-Kumbh_Sans text-[#161932]">
          <h3>COLOR</h3>
          <div className="flex justify-evenly items-center gap-2">
            <div className="h-[40px] w-[40px] rounded-full bg-[#f87070]  flex items-center justify-center font-bold">
              Aa
            </div>
            <div className="h-[40px] w-[40px] rounded-full bg-red-500 flex items-center justify-center font-bold">
              Aa
            </div>
            <div className="h-[40px] w-[40px] rounded-full bg-red-500 flex items-center justify-center font-bold">
              Aa
            </div>
          </div>
        </div>
      </section>
      <button
        className={`px-9 py-2.5 bg-[#f87070] rounded-full relative left-[13.5rem] top-[-20px] font-${initialFont} text-white font-bold `}
      >
        Apply
      </button>
    </div>
  );
}

export default SettingsModal;
