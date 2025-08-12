import React from "react";

const UpdateCard = (item) => {
  return (
    <div>
      <div className="flex flex-col items-center h-screen my-12">
        <div className="card bg-base-300 w-60 shadow-sm">
          <figure>
            <img
              src={
                item.item.profilePicture ||
                "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
              }
              alt="Shoes"
              className="bg-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title pb-2 flex justify-center items-center text-2xl text-amber-100">
              {item?.item?.firstName + " " + item?.item?.lastName}
            </h2>
            {/* if the age and gender is not null then show them */}
            {item?.item?.age && item?.item?.gender && (
              <p className="pb-3 flex items-center gap-2 text-gray-400">
                <span className="font-medium">{item.item.age} years old</span>
                <span className="bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full text-sm capitalize">
                  {item.item.gender}
                </span>
              </p>
            )}

            <p className="pb-3">{item?.item?.about || "No bio available."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCard;
