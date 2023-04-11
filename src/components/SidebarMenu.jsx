import React from 'react';
import { react, useState } from "react";
import { NavLink } from "react-router-dom";

const SidebarMenu = ({ item }) => {
  const activeLink =
    "flex flex-col justify-center items-center gap-1 p-2 md:p-1 rounded-lg text-black font-semibold text-md bg-active-bg";
  const normalLink =
    "flex flex-col justify-center items-center gap-1 p-2 rounded-lg text-md font-semibold text-white dark:text-gray-200 hover:text-[#7b8cb8]";
    
  var routeItem =item.name;
  console.log(routeItem);

  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (

    <>   
          <NavLink
            to={routeItem === "masterData" ? null : item.path}
            className={({ isActive }) =>
              (isActive && routeItem !== "masterData") ? activeLink : normalLink
            }
            onClick={item.subRoutes && showSubnav}
          >
          <div className="flex justify-center cursor-pointer text-xl">
            {item.icon}
          </div>
          <div className="capitalize flex justify-center text-xs">
            {item.name}
          </div>
      </NavLink>
      {subnav &&
        item.subRoutes.map((subRoute) =>{
            return (
              <div style={{ background: "#7b8cb8"}}>

                <NavLink
                to={subRoute.path}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                >
                <div className="text-base display-flex justify-center hover:text-[#1b67cc]">
                  {subRoute.icon}
                </div>
                <div className="capitalize flex justify-center text-xs ml-1 hover:text-[#1b67cc]">
                  {subRoute.name}
                </div>
                </NavLink>
              </div>
            );
        })}
    </>

  );
};

export default SidebarMenu;