import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
// import Task from "./pages/Task.jsx";
import ShowTask from "./pages/ShowTask.jsx";
import AddTask from "./pages/AddTask.jsx";
import UpdateTask from "./pages/UpdateTask.jsx";
import Auth from "./pages/Auth.jsx";
import Signup from "./pages/Signup.jsx";

function App () {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addtask" element={<AddTask />} />
        <Route path="/taskinfo/:id" element={<ShowTask />} />
        <Route path="/home" element={<Home />} />

      </Routes>
    </Router>
  );
}



export default App;