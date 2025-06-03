import { Suspense } from "react";
import "./App.css";
import { Attendance } from "./attendances/Attendance";
import { Clipboard } from "./clipboards/Clipboard";
import { Treasury } from "./treasuries/Treasury";

function App() {
  return (
    <div className="App">
      <Suspense>
        <Clipboard />

        <Treasury />

        <Attendance />
      </Suspense>
    </div>
  );
}

export default App;
