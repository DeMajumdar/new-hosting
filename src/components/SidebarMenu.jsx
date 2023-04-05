import { react, useState } from "react";
import { NavLink } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";

// const menuAnimation = {
//   hidden: {
//     opacity: 0,
//     height: 0,
//     padding: 0,
//     transition: { duration: 0.3, when: "afterChildren" },
//   },
//   show: {
//     opacity: 1,
//     height: "auto",
//     transition: {
//       duration: 0.3,
//       when: "beforeChildren",
//     },
//   },
// };
// const menuItemAnimation = {
//   hidden: (i) => ({
//     padding: 0,
//     x: "-100%",
//     transition: {
//       duration: (i + 1) * 0.1,
//     },
//   }),
//   show: (i) => ({
//     x: 0,
//     transition: {
//       duration: (i + 1) * 0.1,
//     },
//   }),
// };

const SidebarMenu = ({ route }) => {
  const activeLink =
    "flex  flex-col items-center gap-1 p-2 rounded-lg text-black font-semibold text-md bg-active-bg";
  const normalLink =
    " flex flex-col justify-center items-center gap-1 p-2 rounded-lg text-md font-semibold text-white dark:text-gray-200 ";

  // const dropDown= props.onDropDown;

  const [isHovering,setHovering] = useState(false);
  // const [isDrop,setIsDrop]=useState(dropDown);

  const toogle = () =>{
    setHovering(!isHovering);
  };

  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <div
        className={normalLink}
        // onMouseOver={handleMouseEnter}
        // onMouseOut={handleMouseLeave}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
      >
        <div
          className={({ isActive }) => (isActive ? activeLink : normalLink)}
          onClick={toogle}
        >
          <div className="flex justify-center curson-pointer text-base">
            {/* style={{
              fontSize: "1.5rem",
              display: "flex",
              justifyContent: "center",
              cursor: "pointer",
            }} */}
            {route.icon}
          </div>
          <div className="capitalize flex justify-center text-xs md:hidden">
            {route.name}
          </div>
        </div>
      </div>{" "}
      {isHovering && (
        <div
          //variants={menuAnimation}
          // initial="hidden"
          // animate="show"
          // exit="hidden"
          style={{
            //borderLeft: "0.2px solid black",
            background: "#7b8cb8",
            // height: "60px", 
            // display: "flex",
            // alignItems: "center",
            // textDecoration: "none",
            // color: "#f5f5f5",
            //</>font-size= 18px;

           
          }}
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
        >
          {route.subRoutes.map((subRoute, i) => (
            //<div variants={menuItemAnimation} key={i} custom={i}>
              <NavLink
                to={subRoute.path}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <div
                  // style={{
                  //   fontSize: "1rem",
                  //   display: "flex",
                  //   justifyContent: "center",
                  // }}
                  className="text-base display-flex justify-center hover:text-[#1b67cc]"
                >
                  {subRoute.icon}
                </div>
                <div className="capitalize flex justify-center text-xs ml-1 hover:text-[#1b67cc] md:hidden">
                  {subRoute.name}
                </div>
              </NavLink>
            //</div>
          ))}
        </div>
      )}{" "}

   
    </>
    );
  };



  // <>
  //         <NavLink to={route.path}  className={({ isActive }) => (isActive ? activeLink : normalLink)} onClick={route.subRoutes && showSubnav}>
  //           <div
  //             style={{
  //               fontSize: "1.5rem",
  //               display: "flex",
  //               justifyContent: "center",
  //               cursor: "pointer",
  //             }}
  //           >
  //             {route.icon}
  //           </div>
  //           <div className="capitalize flex justify-center text-xs">
  //             {route.name}
  //           </div>
  //           {/* <div>
  //             {item.subNav && subnav
  //               ? item.iconOpened
  //               : item.subNav
  //               ? item.iconClosed
  //               : null}
  //           </div> */}
  //         </NavLink>
  //         {subnav &&
  //             <div style={{background: "#7b8cb8"}}>
  //               {route.subRoutes.map((subRoute) => (
  //                 <NavLink
  //                   to={subRoute.path}
  //                   className={({ isActive }) =>
  //                     isActive ? activeLink : normalLink
  //                   }
  //                 >
  //                   <div className="text-base display-flex justify-center hover:text-[#1b67cc]">
  //                     {subRoute.icon}
  //                   </div>
  //                   <div className="capitalize flex justify-center text-xs ml-1 hover:text-[#1b67cc]">
  //                     {subRoute.name}
  //                   </div>
  //                 </NavLink>
  //                ))}
  //             </div>
  //         }
  //       {/* </div> */}
  //     {/* </div> */}
  //   </>





export default SidebarMenu;
