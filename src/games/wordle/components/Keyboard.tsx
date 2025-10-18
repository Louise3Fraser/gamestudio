// import "./Comp.css";
// import { useEffect } from "react";

// const ROWS = [
//   ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
//   ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
//   ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
// ];

// export default function Keyboard({ onKey }) {
//   useEffect(() => {
//     const handle = (e) => {
//       const k = e.key;
//       if (k === "Enter") onKey?.("ENTER");
//       else if (k === "Backspace") onKey?.("BACKSPACE");
//       else if (/^[a-zA-Z]$/.test(k)) onKey?.(k.toUpperCase());
//     };
//     window.addEventListener("keydown", handle);
//     return () => window.removeEventListener("keydown", handle);
//   }, [onKey]);

//   return (
//     <div className="keyboard">
//       {ROWS.map((row, i) => (
//         <div className="key-row" key={i}>
//           {row.map((key) => (
//             <button key={key} onClick={() => onKey?.(key)}>
//               {key}
//             </button>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }
