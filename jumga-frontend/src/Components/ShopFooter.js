import React from 'react';

function ShopFooter(props){
    return(
        <div className="text-center home m-3">
            <p>&copy;{props.shopName} 2021</p>
        </div>
    )
}
export default ShopFooter;