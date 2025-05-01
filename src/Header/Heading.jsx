import { usePomodoro } from "../contexts/Pomodoro";

function Heading() {
  const { options, fullOptions, dispatch, initialFont } = usePomodoro();

  return (
    <section className="flex flex-col gap-6 items-center">
      <img src="/assets/logo.svg" />
      <div
        className={`flex gap-3 font-${initialFont} text-white bg-[#161932] rounded-full py-2 px-2`}
      >
        {fullOptions.map((s, index) => {
          return (
            <button
              key={index}
              className={`${
                options === s.name
                  ? "bg-[#f87070] rounded-full py-2 px-5 font-bold cursor-pointer"
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
