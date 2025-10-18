import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import Wordle from "./games/wordle/Wordle";
import { BrowserRouter, Routes, Route } from "react-router";
import GameWrapper from "./games/GameWrapper";

const container = document.getElementById("root") as HTMLElement;
createRoot(container).render(
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
