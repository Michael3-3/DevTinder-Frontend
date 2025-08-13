import React from "react";
import axios from "axios";
import { BaseUrl } from "../utils/statics";
import { useDispatch } from "react-redux";
import { removeConnectionRequest } from "../utils/connectionRequestSlice";

const RequestCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleStatus = async (status, reqId) => {
    try {
      await axios.post(
        `${BaseUrl}/connectionRequestReceiving/${status}/${reqId}`,
        {},
        { withCredentials: true }
      );
      // Remove from Redux store immediately
      dispatch(removeConnectionRequest(reqId));
    } catch {
      console.log("error");
    }
  };

  return (
    <div className="flex flex-col items-center h-screen my-12">
      <div className="card bg-base-300 w-60 shadow-sm">
        <figure>
          <img
            src={
              item.profilePicture ||
              "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
            }
            alt="Profile"
            className="bg-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title pb-2 flex justify-center items-center text-2xl text-amber-100">
            {item?.firstName + " " + item?.lastName}
          </h2>
          <p className="pb-3">{item?.about || "No bio available."}</p>
          <div className="card-actions justify-end flex">
            <button
              className="btn btn-primary"
              onClick={() => handleStatus("rejected", item._id.toString())}
            >
              Rejected
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleStatus("accepted", item._id.toString())}
            >
              Accepted
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
