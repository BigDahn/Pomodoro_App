import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { PomodoroApp } from "./contexts/Pomodoro.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PomodoroApp>
      <App />
    </PomodoroApp>
  </StrictMode>
);
