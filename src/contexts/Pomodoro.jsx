import { createContext, useContext, useReducer } from "react";

const PomodoroContext = createContext();
let timer = 0;
const fonts = ["Kumbh_Sans", "Roboto_Slab", "Space_Mono"];

const fullOptions = [
  {
    name: "pomodoro",
  },
  { name: "short break" },
  {
    name: "long break",
  },
];

const initialState = {
  timer: timer,
  maxValue: Math.floor(timer / 60),
  options: fullOptions.at(0).name,
  status: false,
  isModal: false,
  initialFont: fonts.at(2),
};

function reducer(state, action) {
  switch (action.type) {
    case "on": {
      return {
        ...state,
        status: state.status && state.timer <= 0 ? false : true,
        timer: state.timer <= 0 ? null : state.timer--,
      };
    }
    case "start/pause": {
      return {
        ...state,
        status: !state.status,
        timer: state.timer,
      };
    }
    case "options": {
      return {
        ...state,
        options: fullOptions.filter((s) => s.name === action.payload)[0].name,
      };
    }
    case "openModal": {
      return {
        ...state,
        isModal: true,
      };
    }
    case "closeModal": {
      return {
        ...state,
        isModal: false,
      };
    }
    case "font": {
      return {
        ...state,
        initialFont: fonts.filter((s) => s === action.payload)[0],
      };
    }
  }
}

function PomodoroApp({ children }) {
  const [{ timer, status, maxValue, options, isModal, initialFont }, dispatch] =
    useReducer(reducer, initialState);
  return (
    <PomodoroContext.Provider
      value={{
        timer,
        status,
        dispatch,
        maxValue,
        options,
        fullOptions,
        isModal,
        fonts,
        initialFont,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

function usePomodoro() {
  const context = useContext(PomodoroContext);

  if (context === undefined) throw new Error("");

  return context;
}

export { usePomodoro, PomodoroApp };
