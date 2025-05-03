import { usePomodoro } from "../contexts/Pomodoro";

function Heading() {
  const { options, fullOption, dispatch, initialFont, initialColor } =
    usePomodoro();

  return (
    <section className="flex flex-col gap-6 items-center">
      <img src="/assets/logo.svg" />
      <div
        className={`flex gap-3 font-${initialFont} text-white bg-[#161932] rounded-full py-2 px-2`}
      >
        {fullOption.map((s, index) => {
          return (
            <button
              key={index}
              className={`${
                options === s.name
                  ? `bg-[${initialColor}] rounded-full py-2 px-5 font-bold cursor-pointer`
                  : "  py-2 px-5 font-bold cursor-pointer "
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
