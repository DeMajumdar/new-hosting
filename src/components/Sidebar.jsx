import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import { AiOutlineClose } from "react-icons/ai";
import {
  adminRoutes,
  manufacturerRoutes,
  distributorRoutes,
  retailerRoutes,
  storageRoutes,
} from "../data/link";
import { AuthContext } from "../contexts/auth-context";
import { useStateContext } from "../contexts/ContextProvider";
import { useMediaQuery } from "@material-ui/core";

const Sidebar = () => {

  const { isToggle,setIsToggle, handleToggle } = useStateContext();

  const { userRole } = useContext(AuthContext);
  var routes = "";
  if (userRole === "admin@gmail.com") {
    routes = adminRoutes;
  } else if (userRole === "manufacturer@gmail.com") {
    routes = manufacturerRoutes;
  } else if (userRole === "distributor@gmail.com") {
    routes = distributorRoutes;
  } else if (userRole === "storage@gmail.com") {
    routes = storageRoutes;
  } else {
    routes = retailerRoutes;
  }

  const activeLink = 'flex flex-col justify-center items-center gap-1 p-2 md:p-1 rounded-lg text-black font-semibold text-md bg-active-bg  ';
  const normalLink = 'flex flex-col justify-center items-center gap-1 p-2 rounded-lg text-md font-semibold text-white dark:text-gray-200 hover:text-[#7b8cb8] ';

  const isSmallScreen = useMediaQuery('(max-width: 990px)');

  return (
    <>
      {!isSmallScreen && (
        <div className="h-screen pb-10 pt-2 z-50">
          <div className="flex justify-center items-center">
            <Link>
              <img
                src={require("../data/image/logo-edited.png")}
                className="h-12"
              />
            </Link>
          </div>
          <div className="flex flex-col justify-center">
            {routes.map((item, index) => {
                return <SidebarMenu item={item} key={index} />;
            })}
          </div>
        </div>
      )}
      {isSmallScreen && isToggle &&(
        <div className="grid justify-center w-screen">
          <div className="grid">
            {routes.map((item, index) => {
                return <SidebarMenu item={item} key={index} />;
            })}
          </div>
          <div>
            <button
              className="absolute top-0 right-0 p-4 text-xl text-stone-50"
              onClick={handleToggle}
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
      )}
    </>
        
  );
};

export default Sidebar;