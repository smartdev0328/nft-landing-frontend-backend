import React from "react";
import MyRouter from "routers/index";
import axios from "axios";
import FynContextProvider from "./context/FynContext";

axios.defaults.baseURL = "https://backend-marketplace.affyn.com/api";
axios.defaults.timeout = 15000;

function App() {
  return (
    <FynContextProvider>
      <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200 page-container">
        <MyRouter />
      </div>
    </FynContextProvider>
  );
}

export default App;
