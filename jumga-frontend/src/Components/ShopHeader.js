import React from 'react';

function ShopHeader(props){
    return(
        <div className="card-body shadow-lg">
<div className="m-0 align-baseline">
            <p className="col m-0 text-right">{props.userData.data.shopEmail}</p>
            <p className="col m-0 text-right">{props.userData.data.shopNumber}</p>
          </div>
          <h1 className="shopName">{props.userData.data.shopName}</h1>
          <p>{props.userData.data.description}</p>
        </div>
    );
}
export default ShopHeader;