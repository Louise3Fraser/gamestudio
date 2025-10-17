import Clock from "./Clock";
import loudle from "../assets/game-icons/loudle.png";
import random from "../assets/game-icons/random.png";
import scary from "../assets/game-icons/scarygame.png";
import orange from "../assets/game-icons/orange.png";
import adventure from "../assets/game-icons/adventure.png";
import test from "../assets/game-icons/test.png";
import Dock from "./Dock";
import Info from "./Info";
import Logo from "./Logo";
import { useNavigate } from "react-router";

function Home() {
  let navigate = useNavigate();

  const games = [
    { img: adventure, alt: "..." },
    { img: test, alt: "..." },
    { img: orange, alt: "..." },
    {
      img: loudle,
      alt: "My take on Wordle",
      onClick: () => navigate("/wordle"),
    },
    { img: random, alt: "..." },
    { img: scary, alt: "..." },
  ];

  return (
    <div className="flex flex-col items-center w-full p-[10px] relative min-h-screen">
      <header className="flex flex-col items-center">
        <Logo size={40} />
        <h1>gamestudio by louise</h1>
      </header>
      <Dock
        items={games}
        panelHeight={115}
        baseItemSize={68}
        magnification={130}
      />
      <Clock />
      <Info />
    </div>
  );
}

export default Home;
