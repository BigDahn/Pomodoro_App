import React from "react";
import Heading from "./Header/Heading";
import TimerApp from "./Timer/TimerApp";
import Settings from "./Settings";
import { usePomodoro } from "./contexts/Pomodoro";
import SettingsModal from "./Modal/SettingsModal";

function App() {
  const { isModal, initialFont } = usePomodoro();

  return (
    <>
      <div
        className={`flex gap-6 flex-col items-center m-auto py-10 relative w-full ${initialFont}`}
      >
        <Heading />
        <TimerApp />
        <Settings />
        {isModal && <SettingsModal />}
      </div>
    </>
  );
}

export default App;
