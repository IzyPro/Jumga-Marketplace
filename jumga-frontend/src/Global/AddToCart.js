let storage = JSON.parse(localStorage.getItem('Cart'));
let cartList = [];

if(storage !== null){
    cartList = storage;
}
else{
    cartList = [];
}
  
  const AddtoCart = (data) => {
    let orders = {
      deliveryFee: data.deliveryFee,
      id: data.id,
      productImage: data.productImage,
      productName: data.productName,
      productPrice: data.productPrice,
      productUnit: data.productUnit,
      shopId: data.shopId,
      orderUnit: 1,
    };

    cartList.push(orders);
    localStorage.setItem('Cart', JSON.stringify(cartList));
  }
  export default AddtoCart;
