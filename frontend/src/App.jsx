import './App.css'
// Import the Router from react-router
import { Routes, Route } from "react-router";
//import Home, Login,AddEmployee
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AddEmployee from "./Pages/AddEmployee";  


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-employee" element={<AddEmployee />} />
      </Routes>
    </>
  )
}

export default App
