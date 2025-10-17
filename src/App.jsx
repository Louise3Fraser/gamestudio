import Home from "./components/Home";
import GradientBackground from "./components/GradientBackground";
import noise from "./assets/noise.png";

function App() {
  return (
    <div className="h-screen w-screen flex justify-center relative">
      <div
        className="
          fixed inset-0 bg-cover bg-no-repeat bg-center 
          opacity-[0.04] z-[1] pointer-events-none "
        style={{ backgroundImage: `url(${noise})` }}
      />
      <GradientBackground />
      <Home />
    </div>
  );
}

export default App;
