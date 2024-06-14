import React from "react";
import WebGLLoader from "./WebGLLoader";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>WebGL in React</h1>
      </header>
      <main>
        <WebGLLoader />
      </main>
    </div>
  );
};

export default App;
