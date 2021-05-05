import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./components/Router";
import { rootStore, RootStoreProvider } from "./models";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <RootStoreProvider value={rootStore}>
        <ToastContainer></ToastContainer>
        <AppRouter />
      </RootStoreProvider>
    </Router>
  );
}

export default App;
