import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SmartContractProvider } from "./context/SmartContractContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SmartContractProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SmartContractProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
