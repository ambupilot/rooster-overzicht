import React from "react";
import ReactDOM from "react-dom/client"; // Gebruik 'react-dom/client' voor createRoot
import App from "./App";
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root")); // Maak een root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
