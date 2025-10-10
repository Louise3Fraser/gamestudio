import { useEffect, useState } from "react";
import "./App.css";
import Row from "./components/Row";
import Keyboard from "./components/Keyboard";

const API_URL = "https://darkermango.github.io/5-Letter-words/words.json";
const GUESSES = Array.from({ length: 5 });

function App() {
  const [word, setWord] = useState("");
  const [guess, setGuess] = useState("");

  const handleKey = (k) => {
    if (k == "ENTER") {
      if (guess.length == 5) {
        // make guess
        console.log("guess!");
      }
    } else if (k == "BACKSPACE") {
      setGuess(guess - k);
    } else {
      setGuess(guess + k);
    }

    console.log(guess);
  };

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
      <h1>Lou-dle</h1>
      <div className="guesses">
        {GUESSES.map((_, i) => (
          <Row key={i} word={word} />
        ))}
      </div>
      <Keyboard onKey={handleKey} />
    </div>
  );
}

export default App;
