import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setFeed, clearFeed } from "../utils/feedSlice";
import { BaseUrl } from "../utils/statics.js";
import FeedCard from "./FeedCard.jsx";

const Feed = () => {
  // lets get the data from the backend and set it in the redux store
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const fetchFeed = async () => {
    try {
      if (feed) return feed; // If feed is already set, no need to fetch again
      // Fetch feed data from the backend
      const response = await axios.get(BaseUrl + "/feed", {
        withCredentials: true,
      });
      dispatch(setFeed(response.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
      dispatch(clearFeed());
    }
  };

  useEffect(() => {
    // Fetch feed data when the component mounts
    fetchFeed();
  }, []);

  return <>
    <div className="feed-container">
      <h1 className="text-3xl font-bold text-center my-4">Feed</h1>
      <div className="feed-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {feed && feed.length > 0 ? (
          feed.map((item) =>{
            return <FeedCard key={item._id} item={item} />;
          } )
        ) : (
          <p className="text-center">No posts available.</p>
        )}
      </div>
    </div>
  </>;
};

export default Feed;
