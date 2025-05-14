import { Suspense } from "react";
import "./App.css";
import { Clipboard } from "./clipboards/Clipboard";

function App() {
  return (
    <div className="App">
      <Suspense>
        <Clipboard />
      </Suspense>
    </div>
  );
}

export default App;
