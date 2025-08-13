import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login, logout } from "../utils/userSlice";
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

  useEffect(() => {
    axios
      .get(BaseUrl + "/profile/view", { withCredentials: true })
      .then((res) => {
        dispatch(login(res.data));
      })
      .catch(() => {
        dispatch(logout());
      });
  }, []);

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <div className="btn btn-ghost text-xl">
            {" "}
            <Link to="/feed">Devtinder</Link>{" "}
          </div>
        </div>
        <div className="flex gap-2 mr-5 items-center">
          {/* // if the user not login and he is not in the login page then show the login link else show the user avatar */}
          {!user && (
            <>
              <div
                className="button cursor-pointer px-4 py-1 mr-4 rounded-2xl bg-primary/50 font-bold flex items-center 
                    text-white  transition-all shadow-primary duration-100 ease-in-out 
                    hover:bg-primary hover:scale-105 hover:shadow-lg">
               <Link to="/login">Login</Link>
              </div>
              <div
                className="cursor-pointer px-4 py-1 rounded-2xl bg-red-400 font-bold flex items-center 
                    text-white shadow-red-900 transition-all duration-100 ease-in-out 
                    hover:bg-red-500 hover:scale-105  hover:shadow-lg">
                Sign Up
              </div>
            </>
          )}

          {user && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar">
                <div className="w-8 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.profilePicture}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm z-[99] dropdown-content bg-black rounded-box  mt-3 w-52 p-2 shadow">
                <li>
                  <Link to="/profile"> Profile</Link>
                </li>
                <li>
                  <Link to="/connectionRequest">Your Connections</Link>
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
