import React from "react";
import AlertFailure from "../Components/AlertFailure";
import CustomLoader from "../Components/CustomLoader";
import { useAxiosGet } from "../Hooks/HttpRequests";
import { getUserData } from "../UserResources/UserData";

function Orders() {
  let loader = null;
  let userDetails = getUserData();
  let userData = useAxiosGet(`/api/shops/${userDetails.id}/order`);
  if (userData.isError) {
    loader = <AlertFailure error={userData.error} />;
  } else if (userData.loading) {
    loader = <CustomLoader />;
  } else if (userData.data) {
    let products = <p></p>;
    if (userData.data < 1) {
      products = <p className="text-center m-5">Your have no orders yet</p>;
    } else {
      let tableData = userData.data.map((data, key) => (
        <tr key={data.id}>
          <td>{data.customerName}</td>
          <td>{data.customerEmailAddress}</td>
          <td>{data.customerPhoneNumber}</td>
          <td>{data.customerDeliveryAddress}</td>
          <td>{data.subTotalItemCost}</td>
          <td>{data.total}</td>
          {/* <td>{data.orderItems === null ? <p>No Item</p> : data.orderItems.map((datum) => (
              <p>{datum.name}</p>
          ))}</td> */}
        </tr>
      ));
      products = (
        <div className="card-body actions shadow-lg m-4 mt-5">
          <div className="table-responsive m-8">
            <table className="table table-striped table-lg">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Item Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>{tableData}</tbody>
            </table>
          </div>
        </div>
      );
    }
    loader = <div className="home p-3">{products}</div>;
  }

  return (
    <div className="home">
      <h3 className="text-center shopName m-3">Orders</h3>
      {loader}
    </div>
  );
}
export default Orders;
