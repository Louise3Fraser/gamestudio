import { useEffect, useState } from "react";
import "./App.css";
import Row from "./components/Row";
import Keyboard from "./components/Keyboard";

const API_URL = "https://darkermango.github.io/5-Letter-words/words.json";

function App() {
  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [curr, setCurr] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleType = (event) => {
      if (curr.length > 5) {
        return;
      }

      if (event.key === "Enter") {
        if (curr.length != 5) {
          return;
        }
        const idx = guesses.findIndex((val) => val == null);
        if (idx === -1) return;

        const newGuesses = [...guesses];
        newGuesses[idx] = curr.toLowerCase(); // <-- assignment fix
        setGuesses(newGuesses);

        if (curr.toLowerCase() === word) {
          setIsGameOver(true);
        }
        setCurr("");
        return;
      }

      if (event.key === "Backspace") {
        setCurr(curr.slice(0, -1));
        return;
      }

      setCurr((curr) => curr + event.key);
    };

    window.addEventListener("keydown", handleType);

    return () => window.removeEventListener("keydown", handleType);
  }, [curr]);

  // const handleKey = (k) => {
  //   console.log(guesses);
  // };

  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(API_URL);
      const words = await response.json();
      const randomWord =
        words.words[Math.floor(Math.random() * words.words.length)];
      setWord(randomWord);
      console.log(randomWord);
    };
    fetchWord();
  }, []);

  return (
    <div className="main">
      <h1>loudle</h1>
      <div className="guesses">
        {guesses.map((guess, i) => {
          const isCurrGuess = i === guesses.findIndex((val) => val == null);
          return (
            <Row
              key={i}
              guess={isCurrGuess ? curr : guess ?? ""}
              isFinal={!isCurrGuess && guess != null}
              solution={word}
            />
          );
        })}
      </div>
      {/* <Keyboard onKey={handleKey} /> */}
    </div>
  );
}

export default App;
