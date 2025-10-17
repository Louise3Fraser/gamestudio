import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Wordle from "./components/games/wordle/Wordle.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import GameWrapper from "./components/games/GameWrapper.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route element={<GameWrapper />}>
          <Route path="/wordle" element={<Wordle />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
