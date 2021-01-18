export const getShopCountry = () => {
    return sessionStorage.getItem('shopCountry') || "NG";
}
export const getShopDetails= () => {
    const data = sessionStorage.getItem('shopDetails');
    if(data){
        return JSON.parse(data);
    }
    else{
        return null;
    }
}
export const getShopCurrency = () => {
    let country = sessionStorage.getItem('shopCountry') || "NG";
    return country === "NG" ? "NGN" : country === "GH" ? "GHS" : country === "KE" ? "KES" : country === "UK" ? "GBP" : "NGN"
}

export const setShopCountry = (shopCountry) => {
    sessionStorage.setItem('shopCountry', shopCountry);
}
export const setShopDetails = (shopDetails) => {
    sessionStorage.setItem('shopDetails', shopDetails);
}