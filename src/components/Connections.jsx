import React, {  useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setConnection } from "../utils/connectionSlice";
import { BaseUrl } from "../utils/statics";
import RequestCard from "./RequestCard"; // Make sure this is imported
import UpdateCard from "./UpdateCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connection = useSelector((state) => state.connection);

  const handleConnections = async () => {
    try {
      const response = await axios.get(`${BaseUrl}/connections`, {
        withCredentials: true,
      });
      if (response && response.data) {
        dispatch(setConnection(response.data.connections)); // use response.data directly
        console.log(response)
      }
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    handleConnections();
  }, []); // run only once on mount

  return (
    <div className="feed-container">
      <h1 className="text-3xl font-bold text-center my-2">
        Connection Request
      </h1>
      <div className="feed-cards gap-4 flex m-10 flex-wrap">
        {connection && connection.length > 0 ? (
          connection.map((item) => (
            <UpdateCard key={item._id} item={item} />
          ))
        ) : (
          <p className="w-full text-center text-xl text-gray-500">
            No connections available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Connections;
