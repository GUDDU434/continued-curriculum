import "./App.css";
import Debounce from "./components/Debounce";
import LocalStorageHooks from "./components/LocalStorageHooks";
import WindowSize from "./components/WindowSize";

function App() {
  return (
    <div className="App">
      {/* <h1>Custom Hooks</h1> */}
      {/* <FetchData /> */}
      <LocalStorageHooks />
      <Debounce />
      <WindowSize />
    </div>
  );
}

export default App;
