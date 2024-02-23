import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
// import Task from "./pages/Task.jsx";
import ShowTask from "./pages/ShowTask.jsx";
import AddTask from "./pages/AddTask.jsx";

function App () {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addtask" element={<AddTask />} />
        <Route path="/taskinfo/:id" element={<ShowTask />} />

      </Routes>
    </Router>
  );
}



export default App;