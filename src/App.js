import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormDataContext from "./components/FormDataContext/FormDataContext";
import HomeScreen from "./screens/HomeScreen";

function App() {
  const [formDetails, setFormDetails] = useState({
    name: "",
    collegeduniaRating: "",
    placement: "",
    Ranking: "",
    fees: "",
    userReviewRating: "",
    featured: "",
  });
  return (
    <>
      <BrowserRouter>
        <h1 className="text-center underline text-2xl">List of Collages</h1>
        <FormDataContext.Provider value={[formDetails, setFormDetails]}>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </FormDataContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
