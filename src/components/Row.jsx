import Letter from "./Letter";
import "./Comp.css";

export default function Row({ word }) {
  return (
    <div className="row">
      {word.split("").map((char, i) => (
        <Letter char={char} key={i} />
      ))}
    </div>
  );
}
