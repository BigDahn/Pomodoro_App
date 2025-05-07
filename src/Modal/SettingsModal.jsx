import React, { useState } from "react";
import { usePomodoro } from "../contexts/Pomodoro";
import { FaCheck } from "react-icons/fa";

function SettingsModal() {
  const {
    dispatch,
    initialFont,
    fonts,
    initialColor,
    color,
    fullOptions,
    isModal,
  } = usePomodoro();

  const [changedFont, setChangedFonts] = useState(initialFont);
  const [changedColor, setChangedColor] = useState(initialColor);
  const [changeTime, setChangeTime] = useState(
    fullOptions.map((s) => {
      return {
        ...s,
        defaultTime: Math.floor(s.defaultTime / 60),
      };
    })
  );

  const IncreaseButton = (name) => {
    const newTime = changeTime.map((s) => {
      if (s.name === name) {
        return {
          ...s,
          defaultTime:
            (s.name === "pomodoro" && s.defaultTime < 25
              ? 25
              : s.defaultTime + 1) ||
            (s.name === "short break" && s.defaultTime < 5
              ? 5
              : s.defaultTime + 1) ||
            (s.name === "long break" && s.defaultTime < 15
              ? 10
              : s.defaultTime + 1),
        };
      }
      return s;
    });

    setChangeTime(newTime);
  };
  const DecreaseButton = (name) => {
    const newTime = changeTime.map((s) => {
      if (s.name === name) {
        return {
          ...s,
          defaultTime: s.defaultTime - 1,
        };
      }
      return s;
    });

    setChangeTime(newTime);
  };

  const handleSubmit = () => {
    const data = {
      changeTime,
      changedColor,
      changedFont,
    };

    dispatch({ type: "apply", payload: data });
  };

  return (
    <>
      <div
        className={`bg-white w-[100%] h-[575px] md:w-[540px] lg:h-[470px] absolute top-0 left-0 right-0 bottom-0 m-auto z-[99999] rounded-3xl `}
      >
        <div className="flex items-center justify-between  md:py-6 border-b border-gray-300 py-5">
          <h3
            className={`text-[#161932] font-bold ${initialFont} text-4xl px-6`}
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
        <section className="px-6 py-5 md:py-8 lg:py-7">
          <div
            className={`flex flex-col  md:items-start gap-3 border-b pb-3 md:pb-7 lg:pb-5 border-gray-300 ${initialFont} font-bold text-[#161932]`}
          >
            <h2 className=" m-auto md:m-0 lg:m-0">TIME (MINUTES)</h2>
            <div className="flex flex-col gap-4 md:flex md:flex-row  md:gap-5 lg:gap-7 items-center justify-evenly">
              {changeTime.map((s, i) => {
                const { name, defaultTime } = s;

                return (
                  <div
                    className="flex flex-row w-[100%] gap-3 md:flex-col justify-between md:gap-2 lg:gap-2"
                    key={i}
                  >
                    <label htmlFor={name} className="text-gray-400">
                      {name}
                    </label>
                    <input
                      type="text"
                      className="bg-gray-300 h-10 w-[10rem] md:w-[9.4rem] lg:w-[9rem] rounded-md outline-none px-4 relative disabled:cursor-not-allowed"
                      name={name}
                      value={defaultTime}
                      disabled
                    />
                    {name === "pomodoro" && (
                      <div
                        className={`absolute md:bottom-[61.5%] lg:bottom-[53.4%] bottom-[70.3%] left-[87%] md:left-[28%] lg:left-[27%] flex flex-col gap-3`}
                      >
                        <button
                          onClick={() => IncreaseButton(name)}
                          className="cursor-pointer"
                        >
                          <img src="/assets/icon-arrow-up.svg" />
                        </button>

                        <button
                          onClick={() => DecreaseButton(name)}
                          className="cursor-pointer disabled:cursor-not-allowed"
                          disabled={defaultTime === 25}
                        >
                          <img src="/assets/icon-arrow-down.svg" />
                        </button>
                      </div>
                    )}
                    {name === "short break" && (
                      <div
                        className={`absolute md:bottom-[61.5%] lg:bottom-[53.4%] bottom-[60.4%] left-[87%] md:left-[59%] lg:left-[59%] flex flex-col gap-3`}
                      >
                        <button
                          onClick={() => IncreaseButton(name)}
                          className="cursor-pointer"
                        >
                          <img src="/assets/icon-arrow-up.svg" />
                        </button>
                        <button
                          onClick={() => DecreaseButton(name)}
                          className="cursor-pointer disabled:cursor-not-allowed"
                          disabled={defaultTime <= 1}
                        >
                          <img src="/assets/icon-arrow-down.svg" />
                        </button>
                      </div>
                    )}
                    {name === "long break" && (
                      <div
                        className={`absolute md:bottom-[61.5%] lg:bottom-[53.4%]  bottom-[51%] left-[87%] md:left-[91.5%] lg:left-[90.4%]  flex flex-col gap-3`}
                      >
                        <button
                          onClick={() => IncreaseButton(name)}
                          className="cursor-pointer"
                        >
                          <img src="/assets/icon-arrow-up.svg" />
                        </button>
                        <button
                          onClick={() => DecreaseButton(name)}
                          disabled={defaultTime === 15}
                          className="cursor-pointer disabled:cursor-not-allowed"
                        >
                          <img src="/assets/icon-arrow-down.svg" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={`flex flex-col gap-2 md:flex md:flex-row items-center justify-between py-5 md:py-8 lg:py-7 border-b border-gray-300 ${initialFont} font-bold text-[#161932]`}
          >
            <h3>FONTS</h3>
            <div className="flex justify-evenly items-center gap-5 md:gap-2">
              {fonts.map((s, i) => {
                return (
                  <div
                    key={i}
                    className={`${
                      changedFont === s
                        ? "h-[40px] w-[40px] rounded-full bg-[#161932] text-white cursor-pointer  flex items-center justify-center font-bold font-${s}"
                        : "h-[40px] w-[40px] rounded-full bg-gray-200 cursor-pointer flex items-center justify-center font-bold font-${s}"
                    }`}
                    role="button"
                    onClick={() => setChangedFonts(s)}
                  >
                    <p className={`${s}`}>Aa</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={`flex flex-col gap-2 md:flex md:flex-row items-center justify-between py-5 md:py-8 lg:py-7 font-bold ${initialFont} text-[#161932]`}
          >
            <h3>COLOR</h3>
            <div className="flex justify-evenly items-center md:gap-2 gap-5">
              {color.map((s, index) => {
                return (
                  <div
                    key={index}
                    className={`h-[40px] w-[40px] rounded-full cursor-pointer ${s.color} flex items-center justify-center font-bold`}
                    onClick={() => setChangedColor(s)}
                  >
                    {changedColor === s && <FaCheck />}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <button
          className={`px-9 py-2.5 ${initialColor.color} rounded-full relative left-[36.5%] top-[5px] md:left-[40.5%] md:top-[9%] lg:left-[13rem] lg:top-[-20px] ${initialFont} text-white font-bold `}
          onClick={() => handleSubmit()}
        >
          Apply
        </button>
      </div>
    </>
  );
}

export default SettingsModal;
