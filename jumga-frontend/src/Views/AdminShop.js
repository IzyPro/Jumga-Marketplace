import React, { useState } from "react";
import "./Shop.css";
import { Link } from "react-router-dom";
import { getUserData, setRiderDetails } from "../UserResources/UserData";
import { useAxiosGet, useAxiosGetBanks } from "../Hooks/HttpRequests";
import CustomLoader from "../Components/CustomLoader";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { Modal } from "react-bootstrap";
import AlertFailure from "../Components/AlertFailure";
import ShopHeader from "../Components/ShopHeader";
import ProductItem from "../Components/ProductItem";
import AlertSuccess from "../Components/AlertSuccess";
import axiosInstance from "../UserResources/httpclient";

const flutterwavePK = process.env.REACT_APP_PUBLIC;

function AdminShop() {
  //RESULT MODAL
  const [modalResult, setModalResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const handleResultClose = () => {
    setShowResult(false);
    window.location.reload();
  };

  let userDetails = getUserData();
  let username = userDetails.userName;
  let country = userDetails.userShop.country;
  const FWurl = `https://cors-anywhere.herokuapp.com/https://api.flutterwave.com/v3/banks/${country}`;
  //const FWurl = `https://api.flutterwave.com/v3/banks/${country}`;
  let banks = <option>Unable to fetch banks</option>;
  let fullname = `${userDetails.firstName} ${userDetails.lastName}`;
  const config = {
    public_key: `${flutterwavePK}`,
    tx_ref: Date.now(),
    amount: 20,
    currency: "USD",
    payment_options: "card,mobilemoneyghana,mpesa,ussd,qr,barter",
    customer: {
      email: `${userDetails.email}`,
      phonenumber: `${userDetails.userShop.shopNumber}`,
      name: `${fullname}`,
    },
    customizations: {
      title: "Jumga - Activate Shop",
      description: "Payment for shop activation on Jumga",
      logo: "https://i.ibb.co/0KJC1tb/logo512.png",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  let id = userDetails.id;
  let loader = null;
  let userData = useAxiosGet(`/api/shops/${id}`);
  let bankData = useAxiosGetBanks(FWurl);

  if (bankData.data) {
    banks = bankData.data.data.map((data, key) => (
      <option key={data.code} value={data.code}>
        {data.name}
      </option>
    ));
  }

  if (bankData.isError) {
    console.log(bankData.error);
  }

  if (userData.isError) {
    loader = <AlertFailure error={userData.error} />;
  } else if (userData.loading) {
    loader = <CustomLoader />;
  } else if (userData.data) {
    console.log(userData.data);
    setRiderDetails(JSON.stringify(userData.data.dispatchRider))
    let activate = null;
    let products = null;
    let content = null;
    if (!userData.data.isApproved) {
      activate = (
        <form className="m-3">
          <p>
            Your shop is not Active yet. Complete your payment of $20 to
            complete your registration and activate your shop
          </p>
          <button
            type="button"
            className="btn-lg pb-3"
            onClick={() => {
              setShow(true);
            }}
          >
            Pay Now
          </button>
          <hr />
        </form>
      );
    } else {
      activate = null;
    }
    if (userData.data.products.length < 1) {
      content = <p className="text-center m-5">Your shop is empty</p>;
    } else {
      products = userData.data.products.map((data, key) => (
        <ProductItem key={data.id} data={data} />
      ));
      content = <div className="row p-3 mt-3">{products}</div>;
    }

    loader = (
      <div className="home p-3">
        {activate}
        <div className="text-right mb-3">
          <Link to="./ManageShop" className="col manageShop">
            Manage Shop
          </Link>
        </div>
        <ShopHeader userData={userData} />
        <p className="m-4 text-center">
        Your customers can purchase your products by visiting{" "}
        <span className="shopName">www.jumga.com/Shop/{username}</span>
      </p>
        {content}
      </div>
    );
  }

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  let modalloader = null;
  const [user, setUser] = useState({
    bank: "",
    accountNumber: "",
  });
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  if (loading === true) {
    modalloader = <CustomLoader></CustomLoader>;
  }

  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClose();
    setLoading(true);

    handleFlutterPayment({
      callback: (response) => {
        console.log(response);
        closePaymentModal();
        if (response.status === "successful") {
          let feedback = {
            transactionId: response.transaction_id.toString(),
            currency: "USD",
            amount: response.amount,
            account_bank: user.bank,
            account_number: user.accountNumber,
            country: `${country}`,
          };
          console.log(feedback);

          axiosInstance
            .put(
              `/api/shops/approve-shopwave/${userDetails.userShop.id}`,
              feedback
            )
            .then((response) => {
              setLoading(false);
              console.log(response);
              setModalResult(
                <div>
                  <AlertSuccess />
                  <p className="text-center">
                    You have been assigned a dispatch rider to deliver products
                    to your customers
                  </p>
                </div>
              );
              setShowResult(true);
            })
            .catch((error) => {
              setLoading(false);
              console.log(error);
              console.log(error.message);
              console.log(error.response);
              console.log(error.response.data);
              if (error.status === 401) {
                setModalResult(<AlertFailure error={error.message} />);
                setShowResult(true);
              } else if (error.response != null) {
                setModalResult(
                  <AlertFailure error={error.response.data} />
                );
                setShowResult(true);
              } else {
                setModalResult(<AlertFailure error={error.message} />);
                setShowResult(true);
              }
            }); // this will close the modal programmatically
        } else {
          setModalResult(<AlertFailure error="Transaction failed" />);
          setShowResult(true);
        }
      },
      onClose: () => {},
    });
  };

  return (
    <div className="home">
      {loader}
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <form className="" onSubmit={handleSubmit}>
            <h1 className="h3 mb-4 text-center font-weight-normal">
              Add Account Details
            </h1>
            <div className="form-label-group">
              <select
                name="bank"
                onChange={handleChange}
                className="form-control col-md-5 entry mt-3 pt-0 m-auto"
              >
                <option value="">Select your Bank</option>
                {banks}
              </select>
              <input
                type="number"
                name="accountNumber"
                value={user.accountNumber}
                onChange={handleChange}
                className="form-control mt-3"
                placeholder="Account Number"
                required
              ></input>
            </div>
            {modalloader}
            <button
              className="btn-lg btn-block pb-3 mt-5 shadow-lg"
              type="submit"
            >
              Pay Now
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal size="sm" centered show={showResult} onHide={handleResultClose}>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            color: "#4949e0",
          }}
        >
          {modalResult}
        </Modal.Body>
      </Modal>
    </div>
  );
}
export default AdminShop;
