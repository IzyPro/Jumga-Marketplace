import React, { useState } from "react";
import "./CreateShop.css";
import logo from "../Icons/fullLogo.png";
import { Link, useHistory } from "react-router-dom";
import CustomLoader from "../Components/CustomLoader";
import { Modal } from "react-bootstrap";
import AlertSuccess from "../Components/AlertSuccess";
import AlertFailure from "../Components/AlertFailure";
import axiosInstance from "../UserResources/httpclient";

function CreateShop() {
  //RESULT MODAL
  const [modalResult, setModalResult] = useState(<p></p>);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  let history = useHistory();


  const handleResultClose = () => setShowResult(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userName: "",
    password: "",
    shopName: "",
    shopDescription: "",
    shopPhoneNumber: "",
    shopEmail: "",
    country: "",
  });
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  let loader = null;
  if (loading === true) {
    loader = <CustomLoader/>;
  }
  const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      axiosInstance
        .post("/api/auth/register", user)
        .then((response) => {
          setLoading(false);
          setModalResult(<AlertSuccess/>);
          setShowResult(true);
          history.push("./Login");
        })
        .catch((error) => {
          setLoading(false);
          if (error.status === 401) {
            setModalResult(<AlertFailure error={error.message}/>);
            setShowResult(true);
          } else if (error.response != null) {
            setModalResult(<AlertFailure error={error.response.data}/>);
            setShowResult(true);
          } else {
            setModalResult(<AlertFailure error={error.message}/>);
            setShowResult(true);
          }
        });
  };

  return (
    <div className="partialBG">
      <div className="row m-auto d-flex h-100">
        <div className="card-body mb-3 p-5 shadow-lg popupCard justify-content-center align-self-center">
          <form onSubmit={handleSubmit}>
            <Link className="brand" to="/">
              <img src={logo} width="100" alt="" />
            </Link>
            <div className="form-label-group mt-3 row">
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="form-control col-md-5 entry pt-0"
                placeholder="Firstname"
                required
                autoFocus
              ></input>
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="form-control col-md-5 entry pt-0"
                placeholder="Lastname"
                required
              ></input>
            </div>
            <div className="form-label-group row">
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="form-control col-md-5 entry pt-0"
                placeholder="Email address"
                required
              ></input>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="form-control col-md-5 entry pt-0"
                placeholder="Password"
                required
              ></input>
            </div>
            
            <div className="form-label-group row">
            <select
                name="country"
                onChange={handleChange}
                className="form-control col-md-5 entry pt-0"
              >
                <option value="">Select your Country</option>
                <option value="NG">Nigeria</option>
                <option value="GH">Ghana</option>
                <option value="KE">Kenya</option>
                <option value="UK">United Kingdom</option>
              </select>
            </div>

            <div className="form-label-group row mt-5">
              <input
                type="text"
                name="shopName"
                value={user.shopName}
                onChange={handleChange}
                className="form-control col-md-5 entry pt-0"
                placeholder="Shop Name"
                required
              ></input>
              <input
                type="number"
                name="shopPhoneNumber"
                value={user.shopPhoneNumber}
                onChange={handleChange}
                className="form-control col-md-5 entry pt-0"
                placeholder="Shop Phone Number"
                required
              ></input>
            </div>
            <div className="form-label-group row">
              <input
                type="email"
                name="shopEmail"
                value={user.shopEmail}
                onChange={handleChange}
                className="form-control col-md-5 entry pt-0"
                placeholder="Shop Email address"
                required
              ></input>
              <input
                type="text"
                name="userName"
                value={user.userName}
                onChange={handleChange}
                className="form-control col-md-5 entry pt-0"
                placeholder="Username"
                required
              ></input>
            </div>
            <div className="form-label-group row">
              <textarea
                type="text"
                maxLength="300"
                name="shopDescription"
                value={user.shopDescription}
                onChange={handleChange}
                className="form-control entry pt-0"
                placeholder="Shop Description"
                required
              ></textarea>
            </div>
            <button
              className="btn-lg btn-block pb-3 mt-5 shadow-lg"
              type="submit"
            >
              Create Shop
            </button>
            {loader}
          </form>
        </div>
      </div>

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
export default CreateShop;
