import React from "react";
import "./App.css";
import Weather from "./components/Weather";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <Weather />
    </AppProvider>
  );
}

export default App;
