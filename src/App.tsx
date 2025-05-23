import { Suspense } from "react";
import "./App.css";
import { Clipboard } from "./clipboards/Clipboard";
import { Treasury } from "./treasuries/Treasury";
import { Ganso } from "./watches/Ganso";

function App() {
  return (
    <div className="App">
      <Suspense>
        <Clipboard />

        <Ganso />

        <Treasury />
      </Suspense>
    </div>
  );
}

export default App;
