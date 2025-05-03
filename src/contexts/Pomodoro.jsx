import { createContext, useContext, useReducer } from "react";

const PomodoroContext = createContext();

const fonts = ["Kumbh_Sans", "Roboto_Slab", "Space_Mono"];
const color = ["#f87070", "#70f2f7", "#d881f8"];

const fullOptions = [
  {
    name: "pomodoro",
    defaultTime: 25,
  },
  { name: "short break", defaultTime: 5 },
  {
    name: "long break",
    defaultTime: 15,
  },
];

const initialState = {
  timer: fullOptions.map((s) => s.defaultTime)[0] * 60,
  defaultTime: fullOptions.map((s) => s.defaultTime),
  maxValue: fullOptions.map((s) => s.defaultTime)[0],
  options: fullOptions.at(0).name,
  status: false,
  isModal: false,
  initialFont: fonts.at(0),
  initialColor: color.at(0),
  fullOption: fullOptions,
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
        options: state.fullOption.filter((s) => s.name === action.payload)[0]
          .name,
        timer:
          state.fullOption.filter((s) => s.name === action.payload)[0]
            .defaultTime * 60,
        maxValue: state.fullOption.filter((s) => s.name === action.payload)[0]
          .defaultTime,
        status: false,
      };
    }
    case "openModal": {
      return {
        ...state,
        isModal: true,
        status: false,
      };
    }
    case "closeModal": {
      return {
        ...state,
        isModal: false,
      };
    }
    case "form": {
      return {
        ...state,
      };
    }
    case "apply": {
      console.log(action.payload);
      return {
        ...state,
        defaultTime: action.payload.changeTime.map((s) => s.defaultTime),
        initialColor: action.payload.changedColor,
        initialFont: action.payload.changedFont,
        isModal: false,
        timer: action.payload.changeTime.map((s) => s.defaultTime)[0] * 60,
        fullOption: action.payload.changeTime,
      };
    }
  }
}

function PomodoroApp({ children }) {
  const [
    {
      timer,
      status,
      maxValue,
      options,
      isModal,
      initialFont,
      initialColor,
      defaultTime,
      fullOption,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  return (
    <PomodoroContext.Provider
      value={{
        timer,
        status,
        dispatch,
        maxValue,
        options,
        fullOption,
        isModal,
        fonts,
        initialFont,
        initialColor,
        color,
        defaultTime,
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
