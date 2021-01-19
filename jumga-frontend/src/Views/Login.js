import React, { useState } from "react";
import "./Login.css";
import logo from "../logo.svg";
import { Link, useHistory } from "react-router-dom";
import CustomLoader from "../Components/CustomLoader";
import { Modal } from "react-bootstrap";
import { setUserSession } from "../UserResources/UserData";
import AlertSuccess from "../Components/AlertSuccess";
import AlertFailure from "../Components/AlertFailure";
import axiosInstance from "../UserResources/httpclient"

function Login() {
  //RESULT MODAL
  const [modalResult, setModalResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const handleResultClose = () => setShowResult(false);

  let history = useHistory();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const [loading, setLoading] = useState(false);
  let loader = <p></p>;
  if (loading === true) {
    loader = <CustomLoader/>;
  }
  const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      axiosInstance
        .post("/api/auth/login", user)
        .then((response) => {
          setUserSession(
            response.data.token,
            JSON.stringify(response.data.userDetails),
          );
          setLoading(false);
          setModalResult(<AlertSuccess/>);
          setShowResult(true);
          history.push("./AdminShop");
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
        <div className="card-body p-5 shadow-lg popupCard login justify-content-center align-self-center">
          <form onSubmit={handleSubmit}>
            <Link className="brand" to="/">
              <img src={logo} width="50" alt="" />
            </Link>
            <div className="m-auto">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="form-control mt-3 pt-0"
              placeholder="Email address"
              required
            ></input>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="form-control mt-4 pt-0"
              placeholder="Password"
              required
            ></input>
            </div>
            <button
              className="btn-lg btn-block pb-3 mt-5 shadow-lg"
              type="submit"
            >
              Login
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
export default Login;
