import React from "react";

const FeedCard = (item) => {
  return (
    <div>
      <div className="flex flex-col items-center h-screen my-12">
        <div className="card bg-base-300 w-60 shadow-sm">
          <figure>
            <img
              src={item.item.profilePicture || "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"}
              alt="Shoes"
            className="bg-cover"/>
          </figure>
          <div className="card-body">
            <h2 className="card-title pb-2 flex justify-center items-center text-2xl text-amber-100">{item?.item?.firstName + " " + item?.item?.lastName  }</h2>
            <p className="pb-3">
                {item?.item?.about || "No bio available."}
            </p>
            <div className="card-actions justify-end flex">
              <button className="btn btn-primary">Ignore</button>
              <button className="btn btn-primary">Interested</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
