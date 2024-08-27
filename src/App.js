import logo from "./logo.svg";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CareerApplication from "./Components/SideBarComponents/CareerApplication/CareerApllication";
import Employee from "./Components/SideBarComponents/Employee/Employee";
import DashBoard from "./Components/SideBarComponents/DashBoard/DashBoard";
import TopBarComponent from "./Components/TopBarComponent/TopBarComponent";
import SignIn from "./Components/signIn/signIn";
import { useState } from "react";
function App() {
  const { isSignin, setIsSignin } = useState(false);
  return (
    <BrowserRouter>
    {isSignin &&  <Navigation />}
      <div style={{ width: "100%" }}>
        {isSignin && <TopBarComponent />}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/CareerApplication" element={<CareerApplication />} />
          <Route path="/Employee" element={<Employee />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
