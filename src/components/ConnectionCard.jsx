import React from "react";
import { useNavigate } from "react-router-dom";

const UpdateCard = ({ item }) => {
  const navigate = useNavigate();

  const handleMessage = (id,name) => {
    navigate("/msg/" + id+"/"+name);
  };

  return (
    <div className="flex flex-col items-center h-screen my-12">
      <div className="card bg-base-300 w-60 shadow-sm flex">
        <figure>
          <img
            src={
              item.profilePicture ||
              "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
            }
            alt="Profile"
            className="bg-cover h-56"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title pb-2 flex justify-center items-center text-2xl text-amber-100">
            {item.firstName + " " + item.lastName}
          </h2>

          {item.age && item.gender && (
            <p className="pb-3 flex items-center gap-2 text-gray-400">
              <span className="font-medium">{item.age} years old</span>
              <span className="bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full text-sm capitalize">
                {item.gender}
              </span>
            </p>
          )}

          <p className="pb-3 h-28">{item.about || "No bio available."}</p>
        </div>

        <div
          id="message"
          className="btn btn-secondary flex items-center"
          onClick={() => handleMessage(item._id,item.firstName)}
        >
          Message
        </div>
      </div>
    </div>
  );
};

export default UpdateCard;
