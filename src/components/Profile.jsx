import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BaseUrl } from "../utils/statics";
import FeedCard from "./FeedCard";
import { login, logout } from "../utils/userSlice";

//here the user can view there profile and update it
const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    gender: user?.gender,
    age: user?.age,
    profilePicture: user?.profilePicture,
    about: user?.about,
  });
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

  // handle change in the input fields
  async function handleUpdate() {
    // Here you would typically send the updated formData to your backend API
    await axios.patch(
      BaseUrl + "/profile/update",
      {},
      {
        withCredentials: true,
      }
    );
    console.log("Profile updated", formData);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(user);
  return (
    user && (
      <div cassName="felx">
        <div className="updateform min-h-screen w-1/2 bg-gray-300 m-20 rounded-4xl">
          <div className="head flex justify-center items-center text-4xl text-gray-700 text-shadow-lg font-bold p-5">
            Profile
          </div>
          <div className="form ml-12">
            <div className="name flex ">
              <div className="firstName">
                <label className="text-xl text-gray-700 mb-10 pb-5">
                  First Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="First Name"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength="3"
                  maxLength="30"
                  onChange={handleChange}
                  value={formData.firstName || ""}
                  title="Only letters, numbers or dash"
                  className="input input-bordered input-primary w-60 max-w-xs p-5"
                />
              </div>
              <div className="lastname">
                <label className="text-xl text-gray-700 mb-10 pb-5">
                  Last Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Last Name"
                  pattern="[A-Za-z][A-Za-z0-9\-]*"
                  minLength="3"
                  maxLength="30"
                  onChange={handleChange}
                  value={formData.lastName || ""}
                  title="Only letters, numbers or dash"
                  className="input input-bordered input-primary w-60 max-w-xs p-5"
                />
              </div>
            </div>
            <div className="email my-5">
              <label className="text-xl text-gray-700 mb-10 pb-5">
                Email ID:
              </label>{" "}
              <br />
              <input
                type="email"
                placeholder="mail@site.com"
                required
                onChange={handleChange}
                value={formData.email || ""}
                className="input input-bordered input-primary w-full max-w-xs p-5"
              />
            </div>
            <div className="genderAge flex ">
              <div className="gender">
                <label
                  htmlFor="gender"
                  className="text-xl text-gray-700 mb-10 pb-5">
                  Gender:
                </label>

                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-60 rounded-md border border-gray-800 bg-[#1D232A]  p-2 shadow-lg  focus:border-blue-500 focus:ring focus:ring-gray-900 focus:ring-opacity-50"
                  required>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="age ml-12">
                <label
                  htmlFor="age"
                  className="text-xl text-gray-700 mb-10 pb-5 ">
                  {" "}
                  Age:
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                  className="block w-60 rounded-md border bg-gray-900 border-gray-800 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Enter your age"
                  required
                />
              </div>
            </div>
            <div className="photoUrl my-4">
              <label className="text-xl text-gray-700 mb-10 pb-5">
                Profile Picture URL:
              </label>{" "}
              <br />
              <input
                type="url"
                name="profilePicture"
                onChange={handleChange}
                value={formData.profilePicture || ""}
                placeholder="https://example.com/profile.jpg"
                className="input input-bordered input-primary w-full max-w-xs p-5"
              />
            </div>
            <div className="about">
              <label className="text-xl text-gray-700 mb-10 pb-5">About:</label>{" "}
              <br />
              <textarea
                name="about"
                onChange={handleChange}
                value={formData.about || ""}
                placeholder="Tell us about yourself"
                className="textarea textarea-primary w-10/12 max-w-xs p-5"></textarea>
            </div>
            {/* // update button when we click on it the data will be updated */}
            <div className="updateBtn flex justify-center items-center">
              <button
                className="btn btn-primary mt-5 mb-5"
                onClick={handleUpdate}>
                Update Profile
              </button>
            </div>
          </div>
        </div>
        <FeedCard item={user} />
      </div>
    )
  );
};

export default Profile;
