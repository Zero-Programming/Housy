import React, { useContext, useEffect } from "react";
import RoutesPage from "./components/Routes";
import { API, setAuthToken } from './config/api';

function App() {
  useEffect(() => {
    document.body.style.background = "rgba(196, 196, 196, 0.25)";
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
  });

  return (
    <>
      <RoutesPage />
    </>
  );
}

export default App;
