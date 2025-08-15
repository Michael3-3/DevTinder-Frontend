import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BaseUrl } from "../utils/statics.js";
import { clearConnectionRequest, setConnectionRequest } from "../utils/connectionRequestSlice.js";
import RequestCard from "./RequestCard.jsx";

const ConnectionRequest = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.connectionRequest);

  const fetchFeed = async () => {
    try {
      if (feed && feed.length > 0) return; // Only skip if data already exists
      const response = await axios.get(BaseUrl + "/userConnectionsRequest", {
        withCredentials: true,
      });
      dispatch(setConnectionRequest(response.data.connections)); // ✅ store only array
      console.log(response)
    } catch (error) {
      console.error("Error fetching feed:", error);
      dispatch(clearConnectionRequest());
    }
  };
  useEffect(() => {
    fetchFeed();
  }, []);

  useEffect(() => {
  console.log("Updated feed:", feed);
}, [feed]);


  return (
    <div className="feed-container">
      <h1 className="text-3xl font-bold text-center my-2">Connection Request</h1>
      <div className="feed-cards gap-4 flex m-10 flex-wrap">
          {console.log(feed)}
        {feed && feed.length > 0 ? (
          feed.map((item) => <RequestCard key={item._id} item={item} />)
        ) : (
          <p className="w-full text-center  text-xl text-shadow-gray-500 text-shadow-2xs">No connection request available.</p>
        )}
      </div>
    </div>
  );
};

export default ConnectionRequest;
