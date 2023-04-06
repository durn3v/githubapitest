import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RepositoriesProvider } from "./providers/RepositoriesProvider";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  // <React.StrictMode>
    <RepositoriesProvider>
      <App />
    </RepositoriesProvider>
  // </React.StrictMode>
);
