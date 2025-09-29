import Scene from "./components/Scene";
import { BILLBOARD_COUNT, BILLBOARD_SPACING, SCROLL_FACTOR } from "./config";

const App: React.FC = () => {
  const height = BILLBOARD_COUNT * BILLBOARD_SPACING / SCROLL_FACTOR + 300;
  return (
    <div style={{ height: `${height}px` }}>
      <Scene />
    </div>
  );
};

export default App;
