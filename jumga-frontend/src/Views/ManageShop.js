import React from "react";
import "./ManageShop.css";
import Chev from "../Icons/rightIcon.svg";
import { Link, useHistory } from "react-router-dom";
import { getUserData, removeUserSession } from "../UserResources/UserData";

function ManageShop() {
  let userDetails = getUserData();
  let username = userDetails.userName;
  let history = useHistory();
  const handleLogout = () => {
    removeUserSession();
    history.push("./");
  };
  return (
    <div className="home">
      <h1 className="shopName text-center">Manage Shop</h1>
      <p className="m-4 text-center">
        Your customers can purchase your products by visiting{" "}
        <span className="shopName">www.jumga.com/Shop/{username}</span>
      </p>
      <div className="card-body actions shadow-lg m-4 mt-5">
        <Link className="Link" to="./ManageProducts">
          <div className="row">
            <div className="pl-3">
              <h3 className="shopName">Manage Products</h3>
              <p className="desc">
                Add, Edit and delete products from your shop
              </p>
            </div>
            <div className="col text-right justify-content-center align-self-center">
              <img src={Chev} alt="" />
            </div>
          </div>
        </Link>

        <hr className="hline" />

        <Link className="Link" to="./Orders">
          <div className="row">
            <div className="pl-3">
              <h3 className="shopName">Orders</h3>
              <p className="desc">View product orders</p>
            </div>
            <div className="col text-right justify-content-center align-self-center">
              <img src={Chev} alt="" />
            </div>
          </div>
        </Link>

        <hr className="hline" />

        <Link className="Link" to="./Rider">
          <div className="row">
            <div className="pl-3">
              <h3 className="shopName">Dispatch Rider</h3>
              <p className="desc">
                Details of your dispatch Rider to deliver products
              </p>
            </div>
            <div className="col text-right justify-content-center align-self-center">
              <img src={Chev} alt="" />
            </div>
          </div>
        </Link>
      </div>

      <div className="card-body actions shadow-lg m-4 mt-5">
        <div className="row">
          <div className="pl-3">
            <h3 className="shopName">Edit Shop Details</h3>
            <p className="desc">
              Edit your shop details such as name, phone number e.t.c
            </p>
          </div>
          <div className="col text-right justify-content-center align-self-center">
            <img src={Chev} alt="" />
          </div>
        </div>

        <hr className="hline" />
        <div className="row">
          <div className="pl-3">
            <h3 className="shopName">Change Password</h3>
            <p className="desc">Change your shop password</p>
          </div>
          <div className="col text-right justify-content-center align-self-center">
            <img src={Chev} alt="" />
          </div>
        </div>
      </div>
      <Link className="Link" to="" onClick={handleLogout}>
        <h4 className="shopName text-center mt-5">Logout</h4>
      </Link>
    </div>
  );
}
export default ManageShop;
