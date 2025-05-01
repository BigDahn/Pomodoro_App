import React from "react";
import { usePomodoro } from "./contexts/Pomodoro";

function Settings() {
  const { dispatch } = usePomodoro();
  return (
    <div className="cursor-pointer">
      <img
        src="/assets/icon-settings.svg"
        role="button"
        onClick={() => {
          dispatch({ type: "openModal" });
        }}
      />
    </div>
  );
}

export default Settings;
