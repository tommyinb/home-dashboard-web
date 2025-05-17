import { Suspense } from "react";
import "./App.css";
import { Clipboard } from "./clipboards/Clipboard";
import { Ganso } from "./watches/Ganso";

function App() {
  return (
    <div className="App">
      <Suspense>
        <Clipboard />

        <Ganso />
      </Suspense>
    </div>
  );
}

export default App;
