import React from "react";
import gaming from "../Images/xbox.png";

function AdminViewProduct() {
  return (
    <div className="home">
      <div className="card-body shadow-lg m-3">
        <div className="row m-auto align-baseline">
          <h1 className="shopName">OJLac's</h1>
        </div>
        <p>
          One Stop Shop for Men's Fashion
          <br />
          Clothes, shoes, bags, jewelries, caps and whatsoever shit you need.
        </p>
      </div>
      <div className="row p-5">
        <div className="col-md-5">
          <img src={gaming} width="100%" alt="product" className="pt-3" />
        </div>
        <div className="col">
          <div className="row mt-3 mb-3 m-0">
            <h2 className="text-right">Ashluxe</h2>
            <h2 className="col text-right">- #5,000</h2>
          </div>
          <p className="short">
            Lorem ipsum dolor gomez ighhdh gub Dbf dbf fbrjbfjw k4bjbgt jtbhtbt
            jrhfbur rh fr hru f efhe u eh eibe deudbye debduieb die dye de dibe
            export default ( he de ib) hrjubfhr eugf ube fu eyf 4egfu 3u fug3
            eufv ufv ufuveufi uew bfy gedn bnegd8 fbng4e7 dhgb ne87iydohgrid d8
            egodyfo8e7urgodg ygs dvr fsyfgksgeyfg
          </p>
          <p>Items Remaining : 4</p>
        </div>
      </div>
      <div className="ml-5 mr-5">
        <button className="btn-lg btn-block pb-3 shadow-lg" type="submit">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
export default AdminViewProduct;
