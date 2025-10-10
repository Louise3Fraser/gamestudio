import "./Comp.css";

export default function Row({ guess, isFinal, solution }) {
  const block = [];

  for (let i = 0; i < 5; i++) {
    let className = "letter";
    const char = guess[i];

    if (isFinal) {
      if (char === solution[i]) {
        className += " correct";
      } else if (solution.includes(char)) {
        className += " close";
      } else {
        className += " wrong";
      }
    }

    block.push(
      <div key={i} className={className}>
        <h2>{char}</h2>
      </div>
    );
  }

  return <div className="row">{block} </div>;
}
