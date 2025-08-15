import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BaseUrl } from "../utils/statics";
import UpdateCard from "./UpdateCard.jsx";
import { login, logout } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import Feed from "./feed.jsx";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); // ✅ for popup
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    age: "",
    profilePicture: "",
    about: "",
  });

  // Fetch user profile on mount
  useEffect(() => {
    axios
      .get(BaseUrl + "/profile/view", { withCredentials: true })
      .then((res) => {
        dispatch(login(res.data));
      })
      .catch(() => {
        dispatch(logout());
      });
  }, [dispatch]);

  // Sync formData when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        gender: user.gender || "",
        age: user.age || "",
        profilePicture: user.profilePicture || "",
        about: user.about || "",
      });
    }
  }, [user]);

  async function handleUpdate() {
    try {
      setError(null);
      setSuccess(null);
      
      const response = await axios.patch(BaseUrl+"/profile/update",formData,{withCredentials:true});


      // ✅ show success popup
      setSuccess("Profile updated successfully!");
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
      navigate("/feed",{replace:true})
      console.log("Profile updated", formData);
      console.log(response)
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error);
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!user) {
    return <div className="text-center text-2xl">Loading...</div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 relative">
      {/* ✅ Success popup */}
      {success && (
        <div className="fixed top-5 z-[999] right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg animate-bounce">
          {success}
        </div>
      )}

      {/* Form */}
      <div className="updateform w-full lg:w-1/2 bg-gray-300 rounded-2xl shadow-lg p-6">
        <div className="head text-center text-3xl font-bold text-gray-700 mb-6">
          Profile
        </div>

        <div className="form space-y-6">
          {/* Name Fields */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col w-full">
              <label className="text-lg text-gray-700">First Name:</label>
              <input
                type="text"
                name="firstName"
                required
                placeholder="First Name"
                onChange={handleChange}
                value={formData.firstName}
                className="input input-bordered input-primary w-full p-3"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-lg text-gray-700">Last Name:</label>
              <input
                type="text"
                name="lastName"
                required
                placeholder="Last Name"
                onChange={handleChange}
                value={formData.lastName}
                className="input input-bordered input-primary w-full p-3"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-lg text-gray-700">Email ID:</label>
            <input
              type="email"
              name="email"
              placeholder="mail@site.com"
              required
              onChange={handleChange}
              value={formData.email}
              className="input input-bordered input-primary w-full p-3"
            />
          </div>

          {/* Gender and Age */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col w-full">
              <label htmlFor="gender" className="text-lg text-gray-700">
                Gender:
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="select select-bordered bg-gray-900 text-white w-full p-2"
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="age" className="text-lg text-gray-700">
                Age:
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                min="0"
                className="input input-bordered w-full p-3"
                placeholder="Enter your age"
                required
              />
            </div>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col">
            <label className="text-lg text-gray-700">
              Profile Picture URL:
            </label>
            <input
              type="url"
              name="profilePicture"
              onChange={handleChange}
              value={formData.profilePicture}
              placeholder="https://example.com/profile.jpg"
              className="input input-bordered input-primary w-full p-3"
            />
          </div>

          {/* About */}
          <div className="flex flex-col">
            <label className="text-lg text-gray-700">About:</label>
            <textarea
              name="about"
              onChange={handleChange}
              value={formData.about}
              placeholder="Tell us about yourself"
              className="textarea textarea-primary w-full p-3"
            ></textarea>
          </div>

          {/* Update Button */}
          <div className="flex justify-center">
            <button
              className="btn btn-primary w-full sm:w-auto"
              onClick={handleUpdate}
            >
             Update Profile 
            </button>
          </div>

          {/* Error msg */}
          <div className="text-center text-red-500 mt-4">
            {error && <p>{error.response?.data?.message || "Error occurred"}</p>}
          </div>
        </div>
      </div>

      {/* Preview Card */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <UpdateCard item={formData} />
      </div>
    </div>
  );
};

export default Profile;
