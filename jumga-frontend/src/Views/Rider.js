import React from "react";
import { getRiderDetails } from "../UserResources/UserData";

function Rider() {
  let content = null;
  let riderDetails = getRiderDetails();
  if (riderDetails === null) {
    content = (
      <p className="text-center m-5">You haven't received a rider yet</p>
    );
  } else {
    content = (
      <div>
        <div className="card m-3 p-4 rider mx-auto">
          <h4 className="shopName">Name</h4>
          <h3>
            {riderDetails.firstName} {riderDetails.lastName}
          </h3>
          <hr />
          <h4 className="shopName">Phone Number</h4>
          <h5>{riderDetails.phoneNumber}</h5>
          <hr />
          <h5 className="shopName">Email</h5>
          <h3>{riderDetails.email}</h3>
        </div>
      </div>
    );
  }
  return (
    <div className="home">
      <h3 className="text-center shopName m-3 mb-5">Rider Details</h3>
      {content}
    </div>
  );
}
export default Rider;
