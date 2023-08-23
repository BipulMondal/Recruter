import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useLocation } from "react-router-dom";
import "./App.css";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import Category from "./pages/Skills/Category";
import ManageCategory from "./pages/Skills/ManageCategory";
import SubCategory from "./pages/SubSkills/SubCategory";
import EditCategory from "./pages/Skills/EditCategory";
import ManageSubCategory from "./pages/SubSkills/ManageSubCategory";
import EditSubCategory from "./pages/SubSkills/EditSubCategory";
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

import { Ecommerce } from "./pages";
import { useStateContext } from "./contexts/ContextProvider";
import AddApplicant from "./pages/ConsultantManagement/AddConsultant";
import ManageConsultant from "./pages/ConsultantManagement/ManageConsultant";
import AddRecruiter from "./pages/RecruiterManagement/AddRecruiter";
import EditRecruiter from "./pages/RecruiterManagement/EditRecruiter";
import ManageRecruiter from "./pages/RecruiterManagement/ManageRecruiter";
import EditConsultant from "./pages/ConsultantManagement/EditConsultant";
import AddClient from "./pages/ClientManagement/AddClient";
import EditClient from "./pages/ClientManagement/EditClient";
import ManageClient from "./pages/ClientManagement/ManageClient";
import Addjobs from "./pages/JobPosting/Addjobs";
import Editjobs from "./pages/JobPosting/Editjobs";
import Managejobs from "./pages/JobPosting/Managejobs";
import ViewApplicant from "./pages/Applicant/ViewApplicant";

const Dashboard = () => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext();

  const location = useLocation();

  const logOut = () => {
    // alert("Are you really want to logout ?");
    reactLocalStorage.remove("adminData");
    reactLocalStorage.remove("loginStatus");
    navigate("/login");
  };

  const navigate = useNavigate();

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
        <TooltipComponent content="Settings" position="TopCenter">
          <button
            type="button"
            style={{ borderRadius: "50%", backgroundColor: currentColor }}
            className="text-3xl p-3 text-white hover:drop-shadow-xl hover:bg-light-gray"
            onClick={() => setThemeSettings(true)}
          >
            <FiSettings />
          </button>
        </TooltipComponent>
      </div>
      {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">{/* <Sidebar /> */}</div>
      )}

      <div
        className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full
              ${activeMenu ? "md:ml-72" : " flex-2"}
              `}
      >
        <div
          className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full"
          style={{
            zIndex: "-20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Navbar />
          <button
            onClick={logOut}
            type="button"
            class="btn btn-warning logout-btn"
            style={{ marginRight: "21px" }}
          >
            Logout
          </button>
        </div>

        <div>
          {/* {themeSettings && <ThemeSettings />} */}

          <Routes>
            {/* dashboard  */}
            <Route path="/" element={<Ecommerce />} />
            <Route path="/ecommerce" element={<Ecommerce />} />

            <Route path="/category" element={<Category />} />
            <Route path="/manage-category" element={<ManageCategory />} />
            <Route path="/edit-category" element={<EditCategory />} />

            <Route path="/sub-category" element={<SubCategory />} />
            <Route
              path="/manage-sub-category"
              element={<ManageSubCategory />}
            />
            <Route path="/edit-sub-category" element={<EditSubCategory />} />

            <Route path="/add-applicant" element={<AddApplicant />} />
            <Route path="/edit-consultant/:id" element={<EditConsultant />} />
            <Route path="/manage-consultant" element={<ManageConsultant />} />

            <Route path="/add-recruiter" element={<AddRecruiter />} />
            <Route path="/edit-recruiter/:id" element={<EditRecruiter />} />
            <Route path="/manage-recruiter" element={<ManageRecruiter />} />

            <Route path="/add-client" element={<AddClient />} />
            <Route path="/edit-client/:id" element={<EditClient />} />
            <Route path="/manage-client" element={<ManageClient />} />

            <Route path="/add-jobs" element={<Addjobs />} />
            <Route path="/edit-jobs/:id" element={<Editjobs />} />
            <Route path="/manage-jobs" element={<Managejobs />} />

            <Route path="/view-applicant" element={<ViewApplicant />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
