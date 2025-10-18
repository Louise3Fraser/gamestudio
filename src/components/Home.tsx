import Clock from "./data-display/Clock";
import loudle from "../assets/game-icons/loudle.png";
import random from "../assets/game-icons/random.png";
import scary from "../assets/game-icons/scarygame.png";
import orange from "../assets/game-icons/orange.png";
import adventure from "../assets/game-icons/adventure.png";
import test from "../assets/game-icons/test.png";
import Dock from "./layout/Dock";
import Info from "./data-display/Info";
import Logo from "./branding/Logo";
import { useNavigate } from "react-router";

type GameItem = {
  img: string;
  alt: string;
  onClick?: () => void;
};

function Home() {
  let navigate = useNavigate();

  const games: GameItem[] = [
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
