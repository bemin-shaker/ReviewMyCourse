import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import "./Navbar.css";

import * as BsIcons from "react-icons/bs";

const SidebarData = [
  {
    title: "HOME",
    path: "/",
    icon: <AiIcons.AiOutlineHome />,
    cName: "nav-text",
  },
  {
    title: "COURSES",
    path: "/categories",
    icon: <FaIcons.FaRegLightbulb />,
    cName: "nav-text",
  },

  {
    title: "Profile",
    path: "/update-profile",
    icon: <BsIcons.BsPerson />,
    cName: "nav-text",
  },
  {
    title: "Logout",
    path: "/Login",
    icon: <AiIcons.AiOutlineLogout />,
    cName: "nav-text",
  },
];

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <nav className="staticSidebar">
        <ul className="nav-menu-items">
          <li className="static-navbar"></li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link className="nav-item" to={item.path}>
                  <div> {item.icon}</div>

                  <span id="title-span">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="navbar">
        <Link to="#" className="bars openNav">
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <h3 className="website-logo-text">RateMyCourse</h3>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="bars closeNav">
              <AiIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span id="title-span">{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
