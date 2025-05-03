import { usePomodoro } from "../contexts/Pomodoro";

function Heading() {
  const { options, fullOption, dispatch, initialFont, initialColor } =
    usePomodoro();

  return (
    <section className="flex flex-col gap-6 items-center">
      <img src="/assets/logo.svg" />
      <div
        className={`flex gap-3 font-${initialFont} text-white bg-[#161932]  rounded-full py-[11px] px-[9px] text-[14.5px] md:text-[18px] md:py-3 md:px-3`}
      >
        {fullOption.map((s, index) => {
          return (
            <button
              key={index}
              className={`${
                options === s.name
                  ? `bg-[${initialColor}] rounded-full py-[11px] px-[9px] md:py-2 md:px-5 font-bold cursor-pointer`
                  : " py-[11px] px-[9px] md:py-2 md:px-5 font-bold cursor-pointer "
              }`}
              onClick={() => dispatch({ type: "options", payload: s.name })}
            >
              {s.name}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default Heading;
