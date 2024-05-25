import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormDataContext from "./components/FormDataContext/FormDataContext";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <>
      <BrowserRouter>
        <h1 className="text-center underline text-2xl">List of Collages</h1>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
