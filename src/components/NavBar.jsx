import axios from "axios";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../utils/userSlice";
import { BaseUrl } from "../utils/statics";
const NavBar = () => {


  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // handle logout
  const handleLogout = async () => {
    try {
      await axios.post(BaseUrl + "/logout", {}, { withCredentials: true });
      // Dispatch logout action
      dispatch(logout());
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <div className="btn btn-ghost text-xl"> <Link to="/feed">Devtinder</Link> </div>
        </div>
        <div className="flex gap-2 mr-5 items-center">
          {/* // if the user not login and he is not in the login page then show the login link else show the user avatar */}
        
         
          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar">
                <div className="w-8 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/profile"> Profile</Link>
                </li>
                <li>
                  <a>Settings</a>
                </li>

                <li>
                  <Link to="/login" onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
