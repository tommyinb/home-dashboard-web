import { Suspense } from "react";
import "./App.css";
import { Clipboard } from "./clipboards/Clipboard";
import { Treasury } from "./treasuries/Treasury";

function App() {
  return (
    <div className="App">
      <Suspense>
        <Clipboard />

        <Treasury />
      </Suspense>
    </div>
  );
}

export default App;
