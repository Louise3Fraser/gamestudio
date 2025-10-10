import "./Comp.css";

export default function Letter({ char, show = false }) {
  return (
    <div className={show ? "letter show" : "letter hidden"}>
      {show ? <div className="char">{char}</div> : <div></div>}
    </div>
  );
}
