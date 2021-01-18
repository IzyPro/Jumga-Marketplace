import React, { useState } from "react";
import CustomLoader from "../Components/CustomLoader";
import { useAxiosGet } from "../Hooks/HttpRequests";
import { getUserData } from "../UserResources/UserData";
import { ReactComponent as DeleteIcon } from "../Icons/deleteIcon.svg";
import { ReactComponent as EditIcon } from "../Icons/editIcon.svg";
import { Modal } from "react-bootstrap";
import FileBase64 from "react-file-base64";
import AlertFailure from "../Components/AlertFailure";
import AlertSuccess from "../Components/AlertSuccess";
import ShopHeader from "../Components/ShopHeader";
import axiosInstance from "../UserResources/httpclient";

function ManageProducts() {
  //RESULT MODAL
  const [modalResult, setModalResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [imageFile, setImageFile] = useState("No Image");
  const handleResultClose = () => {
    setShowResult(false);
    window.location.reload();
  };

  //ADD PRODUCT MODAL
  let userDetails = getUserData();
  const getFile = (files) => {
    setImageFile(files.base64);
  };
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({
    productName: "",
    productPrice: "",
    productImage: imageFile,
    productUnit: "",
    shopId: userDetails.userShop.id,
    deliveryFee: "",
  });
  const [loading, setLoading] = useState(false);
  let modalloader = null;
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const newUser = {
      productName: user.productName,
      productPrice: parseInt(user.productPrice),
      productImage: imageFile,
      productUnit: parseInt(user.productUnit),
      shopId: parseInt(userDetails.userShop.id),
      deliveryFee: parseInt(user.deliveryFee),
    };
    axiosInstance
      .post("/api/Products/add-product", newUser)
      .then((response) => {
        setLoading(false);
        setModalResult(<AlertSuccess />);
        setShowResult(true);
        handleClose();
      })
      .catch((error) => {
        setLoading(false);
        if (error.status === 401) {
          setModalResult(<AlertFailure error={error.message} />);
          setShowResult(true);
          handleClose();
        } else if (error.response != null) {
          setModalResult(<AlertFailure error={error.response.data} />);
          setShowResult(true);
          handleClose();
        } else {
          setModalResult(<AlertFailure error={error.message} />);
          setShowResult(true);
          handleClose();
        }
      });
  };
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  if (loading === true) {
    modalloader = <CustomLoader />;
  }

  //DELETE PRODUCT
  const handleDelete = (e) => {
    setModalResult(<CustomLoader />);
    setShowResult(true);
  };

  //Products
  let loader = null;
  let userData = useAxiosGet(`/api/shops/${userDetails.id}`);
  if (userData.isError) {
    loader = <AlertFailure error={userData.error} />;
  } else if (userData.loading) {
    loader = <CustomLoader />;
  } else if (userData.data) {
    let products = <p></p>;
    if (userData.data.products.length < 1) {
      products = <p className="text-center m-5">Your shop is empty</p>;
    } else {
      if (userData.data.products) {
        let tableData = userData.data.products.map((data, key) => (
          <tr key={data.id}>
            <td>
              <img
                src={data.productImage}
                alt="product"
                className="pt-3 pdwidth"
              />
            </td>
            <td>{data.productName}</td>
            <td>{data.productUnit}</td>
            <td>{data.productPrice}</td>
            <td>{data.deliveryFee}</td>
            <td className="justify-content-center align-self-center">
              <EditIcon width="1.2em" id={data.id} className="mr-2" />
              <DeleteIcon
                width="1.5em"
                id={data.id}
                className="mr-2"
                onClick={handleDelete}
              />
            </td>
          </tr>
        ));
        products = (
          <div className="card-body actions shadow-lg m-4 mt-5">
            <div className="table-responsive m-8">
              <table className="table table-striped table-lg">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Unit</th>
                    <th>Price</th>
                    <th>Delivery Fee</th>
                  </tr>
                </thead>
                <tbody>{tableData}</tbody>
              </table>
            </div>
          </div>
        );
      }
    }
    loader = (
      <div className="home p-3">
        <ShopHeader userData={userData} />

        <div className="col text-right">
          <button
            type="button"
            className="btn-lg pb-3 mt-3"
            onClick={handleShow}
          >
            Add New Product
          </button>
        </div>
        {products}
      </div>
    );
  }
  return (
    <div className="home">
      {loader}

      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <form className="" onSubmit={handleSubmit}>
            <h1 className="h3 mb-4 text-center font-weight-normal">
              Add Product
            </h1>
            <label>Select an Image for your product</label>
            <br />
            <FileBase64
              className="form-label-group"
              multiple={false}
              onDone={getFile}
            />
            <div className="form-label-group">
              <input
                type="text"
                name="productName"
                value={user.productName}
                onChange={handleChange}
                className="form-control mt-3"
                placeholder="Product Name (e.g Ashluxe T-Shirt)"
                required
              ></input>

              <input
                type="text"
                name="productPrice"
                value={user.productPrice}
                onChange={handleChange}
                className="form-control mt-3"
                placeholder="Amount (e.g 5500)"
                required
              ></input>
            </div>
            <div className="row m-1">
              <input
                type="text"
                name="productUnit"
                value={user.productUnit}
                onChange={handleChange}
                className="form-control col-5 mt-3 mr-3"
                placeholder="7"
                required
              ></input>
              <input
                type="text"
                name="deliveryFee"
                value={user.deliveryFee}
                onChange={handleChange}
                className="form-control col-5 mt-3"
                placeholder="Delivery Fee"
                required
              ></input>
            </div>
            {modalloader}
            <button
              className="btn-lg btn-block pb-3 mt-5 shadow-lg"
              type="submit"
            >
              Add
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
export default ManageProducts;
