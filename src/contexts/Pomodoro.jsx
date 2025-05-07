import { createContext, useContext, useReducer } from "react";

const PomodoroContext = createContext();

const fonts = ["font-Kumbh_Sans", "font-Roboto_Slab", "font-Space_Mono"];
const color = [
  {
    color: "bg-[#f87070]",
    fill: "#f87070",
    textColor: "text-[#f87070]",
  },
  {
    color: "bg-[#70f2f7]",
    fill: "#70f2f7",
    textColor: "text-[#70f2f7]",
  },
  {
    color: "bg-[#d881f8]",
    fill: "#d881f8",
    textColor: "text-[#d881f8]",
  },
];

const seconds = 60;

const fullOptions = [
  {
    name: "pomodoro",
    defaultTime: 25 * seconds,
  },
  { name: "short break", defaultTime: 5 * seconds },
  {
    name: "long break",
    defaultTime: 15 * seconds,
  },
];

const initialState = {
  timer: fullOptions.map((s) => s.defaultTime)[0],
  defaultTime: fullOptions.map((s) => s.defaultTime),
  maxValue: fullOptions.map((s) => s.defaultTime)[0] / 60,
  options: fullOptions.at(0).name,
  status: false,
  isModal: false,
  initialFont: fonts.at(0),
  initialColor: color.at(0),
  fullOption: fullOptions,
  editedFullOption: fullOptions, // state changes after edit is made on the input field
};

function reducer(state, action) {
  switch (action.type) {
    case "on": {
      // to reduce the time of a particular option and keep the rest intact
      const optionChange = state.fullOption.map((s) => {
        if (s.name === state.options) {
          return {
            ...s,
            defaultTime:
              s.defaultTime === 0
                ? state.fullOption.filter((s) => s.name === state.options)[0]
                    .defaultTime
                : s.defaultTime - 1,
          };
        }
        return s;
      });

      return {
        ...state,
        status: state.status && state.timer <= 0 ? false : true,
        timer: state.timer <= 0 ? 0 : state.timer - 1,
        fullOption: optionChange,
      };
    }
    case "start/pause": {
      return {
        ...state,
        status: !state.status,
        timer: state.timer,
      };
    }
    case "restart": {
      // to restart a particular defaultTime while leaving the rest untouched..
      const newState = state.fullOption.map((s) => {
        if (s.name === state.options) {
          return {
            ...s,
            defaultTime: state.editedFullOption.filter(
              (s) => s.name === state.options
            )[0].defaultTime,
          };
        }
        return s;
      });

      return {
        ...state,
        status: true,
        fullOption: state.fullOption.map((s) => {
          if (s.name === state.options) {
            return {
              ...s,
              defaultTime: fullOptions.filter(
                (s) => s.name === state.options
              )[0].defaultTime,
            };
          }
          return s;
        }),
        timer: newState.filter((s) => s.name === state.options)[0].defaultTime,
      };
    }
    case "options": {
      return {
        ...state,
        options: state.fullOption.filter((s) => s.name === action.payload)[0]
          .name,
        timer: state.editedFullOption.filter(
          (s) => s.name === action.payload
        )[0].defaultTime,
        maxValue:
          state.editedFullOption.filter((s) => s.name === action.payload)[0]
            .defaultTime / 60,
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
      const init = action.payload.changeTime.filter(
        (s) => s.name === state.options
      )[0].defaultTime;

      const stateOption = state.fullOption.filter(
        (s) => s.name === state.options
      )[0].name;

      const timer =
        action.payload.changeTime.filter((s) => s.name === state.options)[0]
          .defaultTime * 60;

      return {
        ...state,
        //defaultTime: action.payload.changeTime.map((s) => s.defaultTime),
        initialColor: action.payload.changedColor,
        initialFont: action.payload.changedFont,
        isModal: false,
        timer: timer,
        fullOption: action.payload.changeTime.map((s) => {
          return {
            ...s,
            defaultTime: s.defaultTime * 60,
          };
        }),
        editedFullOption: action.payload.changeTime.map((s) => {
          return {
            ...s,
            defaultTime: s.defaultTime * 60,
          };
        }),
        options: stateOption,
        maxValue: init,
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
        fullOptions,
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
