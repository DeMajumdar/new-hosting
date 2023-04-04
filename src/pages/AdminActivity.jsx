import React from "react";
import Header from "../components/Header";
import "./AdminActivity.css";
import ROUTE from "../data/GIF/way.gif";
import EMP from "../data/GIF/user.gif";
import USER from "../data/GIF/customer.gif";
import { NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const cardList = [
  {
      icon: EMP,
      name: "Add New User",
      path: "/registerUser"
      
  },
  {
      icon: ROUTE,
      name: "Re-Route",
      path: "/routeUpdate"
   
  },
  {
      icon: USER,
      name: "Users Details",
      path: "/userDetails"
  },
]


const AdminActivity = () => {

  const { setTitle , setCategory } = useStateContext();
  setTitle('/Admin Activity')
  setCategory('Page')
  return (
  <>
    <div>
      <div>
          <div className="admin_container">
            {cardList.map((item, index) => (
              <div>
                <NavLink className="admin_card" key={index} to={item.path}>
                  <div className="admin_content">
                    <div className="admin_imgBx">
                    <img src={item.icon}></img>
                    </div> 
                  </div> 
                  <div className="admin_sci">
                    <p>
                        <h1>{item.name}</h1>
                    </p>
                  </div>
                </NavLink>
                {/* <h1>{item.name}</h1> */}
                </div>
              ))}
          </div>
      </div>
    </div>
  </>
  );
};

export default AdminActivity;
