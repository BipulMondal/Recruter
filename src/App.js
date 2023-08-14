import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { FiSettings } from "react-icons/fi";
// import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import Login from "./pages/Login";
// import { useLocation } from "react-router-dom";
import "./App.css";
// import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./components/PrivateRoutes";
// import {
//   Ecommerce,
//   Orders,
//   Calendar,
//   Employees,
//   Stacked,
//   Pyramid,
//   Customers,
//   Kanban,
//   Line,
//   Area,
//   Bar,
//   Pie,
//   Financial,
//   ColorPicker,
//   ColorMapping,
//   Editor,
// } from "./pages";
import { useStateContext } from "./contexts/ContextProvider";
import Dashboard from "./Dashboard";

const App = () => {
  const {
    // activeMenu,
    // themeSettings,
    // setThemeSettings,
    // currentColor,
    currentMode,
  } = useStateContext();

  // const location = useLocation();

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
        <Toaster/>
      <BrowserRouter>
        <Routes>
          
          <Route element={<PrivateRoutes/>}>
            <Route path="/*" element={<Dashboard />} />
          </Route>
          

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
