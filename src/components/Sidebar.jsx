import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import PopupState from "@mui/icons-material";

// import { links } from "../data/dummy";
import { useStateContext } from "../contexts/ContextProvider";
// import { itemClick } from "@syncfusion/ej2/treemap";

const Sidebar = () => {
  const [show, setShow] = useState({ heading: false });

  const location = useLocation();

  const checking = () => {
    // console.log("Location", location.pathname);
    if (
      location.pathname == "/category" ||
      location.pathname == "/manage-category"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checking1 = () => {
    if (
      location.pathname == "/sub-category" ||
      location.pathname == "/manage-sub-category"
    ) {
      return true;
    } else {
      return false;
    }
  };
  const checking2 = () => {
    if (
      location.pathname == "/add-sub-sub-category" ||
      location.pathname == "/manage-sub-sub-category"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checking3 = () => {
    if (
      location.pathname == "/add-product" ||
      location.pathname == "/manage-product"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checking4 = () => {
    if (
      location.pathname == "/add-color" ||
      location.pathname == "/manage-color"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checking5 = () => {
    if (
      location.pathname == "/add-brand" ||
      location.pathname == "/manage-brand"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checking6 = () => {
    if (
      location.pathname == "/add-primary-varient" ||
      location.pathname == "/manage-primary-varient"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checking7 = () => {
    if (
      location.pathname == "/add-secondary-varient" ||
      location.pathname == "/manage-secondary-varient"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checking8 = () => {
    if (
      location.pathname == "/add-unit" ||
      location.pathname == "/manage-unit"
    ) {
      return true;
    } else {
      return false;
    }
  };

  const [toggle, setToggle] = useState(checking);
  const [toggle1, setToggle1] = useState(checking1);
  const [toggle2, setToggle2] = useState(checking2);
  const [toggle3, setToggle3] = useState(checking3);
  const [toggle4, setToggle4] = useState(checking4);
  const [toggle5, setToggle5] = useState(checking5);
  const [toggle6, setToggle6] = useState(checking6);
  const [toggle7, setToggle7] = useState(checking7);
  const [toggle8, setToggle8] = useState(checking8);
  const { activeMenu, setActiveMenu, screenSize, currentColor } =
    useStateContext();

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    " flex items-center gap-5 pl-4 py-2.5 rounded-lg text-white text-md m-2 ";

  const normalLink =
    " flex items-center gap-5 pl-4 py-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 bg-gray-200">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSidebar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiShopware /> <span>Ecommerce App</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() =>
                  setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                }
                className="text-xl rounded-full p-3 mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            <div>
              <div
                onClick={() => setToggle(!toggle)}
                className={`siteBarDiv ${toggle ? "handleSidebar" : ""}`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div name="heading">Skills</div>
                {toggle ? (
                  <span style={{ marginTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </span>
                ) : (
                  <span style={{ marginTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                )}
              </div>
              {toggle ? (
                <div style={{ marginTop: "5px" }} className="swing-in-top-fwd">
                  <Link to={"/category"} className="linkAn">
                    Add skills
                  </Link>
                  <Link to={"/manage-category"} className="linkAn">
                    Manage skills
                  </Link>
                </div>
              ) : null}
            </div>

            <div>
              <div
                onClick={() => setToggle1(!toggle1)}
                className={`siteBarDiv ${toggle1 ? "handleSidebar" : ""}`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div name="heading">SubSkills</div>
                {toggle1 ? (
                  <span style={{ marginTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </span>
                ) : (
                  <span style={{ marginTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                )}
              </div>
              {toggle1 ? (
                <div style={{ marginTop: "5px" }} className="swing-in-top-fwd">
                  <Link to={"/sub-category"} className="linkAn">
                    Add SubSkills
                  </Link>
                  <Link to={"/manage-sub-category"} className="linkAn">
                    Manage SubSkills
                  </Link>
                </div>
              ) : null}
            </div>

            <div>
              <div
                onClick={() => setToggle2(!toggle2)}
                className={`siteBarDiv ${toggle2 ? "handleSidebar" : ""}`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div name="heading">Consultant</div>
                {toggle2 ? (
                  <span style={{ marginTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </span>
                ) : (
                  <span style={{ marginTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                )}
              </div>
              {toggle2 ? (
                <div style={{ marginTop: "5px" }} className="swing-in-top-fwd">
                  <Link to={"/add-applicant"} className="linkAn">
                    Add Consultant
                  </Link>
                  <Link to={"/manage-consultant"} className="linkAn">
                    Manage Consultant
                  </Link>
                </div>
              ) : null}
            </div>

                {/* recruiter management */}
            <div>
              <div
                onClick={() => setToggle4(!toggle4)}
                className={`siteBarDiv ${toggle4 ? "handleSidebar" : ""}`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div name="heading">Recruiter </div>
                {toggle3 ? (
                  <span style={{ marginTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </span>
                ) : (
                  <span style={{ marginTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                )}
              </div>
              {toggle4 ? (
                <div style={{ marginTop: "5px" }} className="swing-in-top-fwd">
                  <Link to={"/add-recruiter"} className="linkAn">
                    Add Recruiter
                  </Link>
                  <Link to={"/manage-recruiter"} className="linkAn">
                    Manage Recruiter
                  </Link>
                </div>
              ) : null}
            </div>

                {/* Client Management */}
            <div>
              <div
                onClick={() => setToggle5(!toggle5)}
                className={`siteBarDiv ${toggle5 ? "handleSidebar" : ""}`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div name="heading">Client</div>
                {toggle5 ? (
                  <span style={{ marginTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </span>
                ) : (
                  <span style={{ marginTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                )}
              </div>
              {toggle5 ? (
                <div style={{ marginTop: "5px" }} className="swing-in-top-fwd">
                  <Link to={"/add-client"} className="linkAn">
                    Add Client
                  </Link>
                  <Link to={"/manage-client"} className="linkAn">
                    Manage Client
                  </Link>
                </div>
              ) : null}
            </div>

            {/* <div>
              <div
                onClick={() => setToggle8(!toggle8)}
                className={`siteBarDiv ${toggle8 ? "handleSidebar" : ""}`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div name="heading">Unit </div>
                {toggle8 ? (
                  <span style={{ marginTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </span>
                ) : (
                  <span style={{ marginTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                )}
              </div>
              {toggle8 ? (
                <div style={{ marginTop: "5px" }} className="swing-in-top-fwd">
                  <Link to={"/add-unit"} className="linkAn">
                    Add Unit
                  </Link>
                  <Link to={"/manage-unit"} className="linkAn">
                    Manage Unit
                  </Link>
                </div>
              ) : null}
            </div> */}

            {/* <div>
              <div
                onClick={() => setToggle6(!toggle6)}
                className={`siteBarDiv ${toggle6 ? "handleSidebar" : ""}`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div name="heading">Primary Varient </div>
                {toggle6 ? (
                  <span style={{ marginTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </span>
                ) : (
                  <span style={{ marginTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                )}
              </div>
              {toggle6 ? (
                <div style={{ marginTop: "5px" }} className="swing-in-top-fwd">
                  <Link to={"/add-primary-varient"} className="linkAn">
                    Add Primary Varient
                  </Link>
                  <Link to={"/manage-primary-varient"} className="linkAn">
                    Manage Primary Varient
                  </Link>
                </div>
              ) : null}
            </div> */}

            {/* <div>
              <div
                onClick={() => setToggle7(!toggle7)}
                className={`siteBarDiv ${toggle7 ? "handleSidebar" : ""}`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div name="heading">Secondary Varient </div>
                {toggle7 ? (
                  <span style={{ marginTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </span>
                ) : (
                  <span style={{ marginTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                )}
              </div>
              {toggle7 ? (
                <div style={{ marginTop: "5px" }} className="swing-in-top-fwd">
                  <Link to={"/add-secondary-varient"} className="linkAn">
                    Add Secondary Varient
                  </Link>
                  <Link to={"/manage-secondary-varient"} className="linkAn">
                    Manage Secondary Varient
                  </Link>
                </div>
              ) : null}
            </div> */}

            {/* <div>
              <div
                onClick={() => setToggle3(!toggle3)}
                className={`siteBarDiv ${toggle3 ? "handleSidebar" : ""}`}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div name="heading">Product </div>
                {toggle3 ? (
                  <span style={{ marginTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M4.5 15.75l7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </span>
                ) : (
                  <span style={{ marginTop: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                )}
              </div>
              {toggle3 ? (
                <div style={{ marginTop: "5px" }} className="swing-in-top-fwd">
                  <Link to={"/add-product"} className="linkAn">
                    Add Product
                  </Link>
                  <Link to={"/manage-product"} className="linkAn">
                    Manage Product
                  </Link>
                </div>
              ) : null}
            </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
