import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';
import SidebarMenu from './SidebarMenu';
import {
  adminRoutes,
  manufacturerRoutes,
  distributorRoutes,
  retailerRoutes,
  storageRoutes,
} from '../data/link';
import { AuthContext } from '../contexts/auth-context';

const Sidebar = () => {
  const { userRole } = useContext(AuthContext);
  let routes = '';
  if (userRole === 'admin@gmail.com') {
    routes = adminRoutes;
  } else if (userRole === 'manufacturer@gmail.com') {
    routes = manufacturerRoutes;
  } else if (userRole === 'distributor@gmail.com') {
    routes = distributorRoutes;
  } else if (userRole === 'storage@gmail.com') {
    routes = storageRoutes;
  } else {
    routes = retailerRoutes;
  }

  const activeLink = 'flex flex-col justify-center items-center gap-1 p-2 md:p-1 rounded-lg text-black font-semibold text-md bg-active-bg  m-2';
  const normalLink = 'flex flex-col justify-center items-center gap-1 p-2 rounded-lg text-md font-semibold text-white dark:text-gray-200 hover:text-[#7b8cb8] m-2';

  const isSmallScreen = useMediaQuery('(max-width: 990px)');

  const [isModal, setIsModal] = useState(false);

  const openModal = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      {!isSmallScreen && (
        <div className="h-screen pb-10 pt-2 z-50">
          <div className="flex justify-center items-center">
            <Link>
              <img
                src={require('../data/image/logo-edited.png')}
                className="h-12"
              />
            </Link>
          </div>
          <div className="mt-0">
            <div
              // style={{
              //   display: "flex",
              //   flexDirection: "column",
              //   alignItems: "center",
              //   justifyContent: "center",
              // }}
              className="flex flex-col justify-center"
            >
              {routes.map((route, index) => {
                if (route.subRoutes) {
                  return <SidebarMenu route={route} />;
                }

                return (
                  <NavLink
                    to={route.path}
                    key={index}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    <div className="text-base flex justify-center hover:text-[#1b67cc]">
                      {route.icon}
                    </div>
                    <div className="capitalize flex justify-center text-center text-xs sm:hidden md:hidden">
                      {route.name}
                    </div>
                  </NavLink>
                );
                // if (route.subRoutes) {
                //   return <SidebarMenu route={route} />;
                // }
              })}
            </div>
          </div>
        </div>
      )}
      {isSmallScreen && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white pt-2">
          <div className="flex justify-center items-center py-2">
            <Link>
              <img
                src={require('../data/image/logo-edited.png')}
                className="h-8"
                onClick={openModal}
              />
            </Link>
          </div>
          <div className="flex justify-center ">
            {isModal && (
              <div className="flex flex-row">
                  {routes.map((route) => {
                    if (route.subRoutes) {
                      return (
                        <SidebarMenu
                          route={route}
                        />
                      );
                    }
                    return (
                      <NavLink
                        to={route.path}
                        style={{
                          fontSize: '2.5rem',
                          display: 'flex',
                        }}
                      >
                        {route.icon}
                      </NavLink>
                    );
                  })}
              </div>
            )}
          </div>
        </div>

      )}

    </>
    // <>
    //     <div className="h-screen pb-10 pt-2 z-50">
    //       <div className="flex justify-center items-center">
    //          <Link>
    //            <img
    //              src={require("../data/image/logo-edited.png")}
    //              className="h-12"
    //            />
    //          </Link>
    //       </div>
    //       <div className="mt-0">
    //         <div className="grid justify-center">
    //           {routes.map((route) => {
    //             return <SidebarMenu route={route}/>;
    //           })}
    //         </div>
    //       </div>
    //     </div>
    // </>
  );
};

export default Sidebar;
