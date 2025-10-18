import { useEffect, useState } from "react";
import Row from "./components/Row.js";
// import Keyboard from "./games/wordle/components/Keyboard";

const API_URL = "https://darkermango.github.io/5-Letter-words/words.json";

type Guess = string | null;
interface WordsResponse {
  words: string[];
}

function Wordle() {
  const [word, setWord] = useState<string>("");
  const [guesses, setGuesses] = useState<Guess[]>(Array(6).fill(null));
  const [curr, setCurr] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    const handleType = (event: KeyboardEvent) => {
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
        newGuesses[idx] = curr.toLowerCase();
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
      const data = (await response.json()) as WordsResponse;
      const randomWord =
        data.words[Math.floor(Math.random() * data.words.length)];
      setWord(randomWord);
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

export default Wordle;
