/* eslint-disable react/react-in-jsx-scope */
//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import "./App.css";
import NavComponent from "./components/navigation/nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import UseManager from "./components/userManager/user";
import UserDetail from "./components/userDetail/userDetail";
import { CreateUser } from "./components/createUser/createUser";
import { ToastContainer } from "react-toastify";
function App() {
  //const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavComponent />}>
          <Route path="home" element={<h1>Home</h1>} />
          <Route path="features" element={<h1>features</h1>} />
          <Route path="pricing" element={<h1>Pricing</h1>} />
          <Route path="user-manager" element={<UseManager />}></Route>
          <Route path="*" element={<h1>404</h1>} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/user-manager/:id" element={<UserDetail />} />
        <Route path="/user-manager/create-user" element={<CreateUser />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </BrowserRouter>
  );
}

export default App;
