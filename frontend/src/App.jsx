import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Task from "./pages/Task.jsx";

function App () {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addtask" element={<Task />} />

      </Routes>
    </Router>
  );
}



export default App;