export const getUserData = () => {
    const data = sessionStorage.getItem('userData');
    if(data){
        return JSON.parse(data);
    }
    else{
        return null;
    }
}
export const getRiderDetails = () => {
    const data = sessionStorage.getItem('riderDetails');
    if(data){
        return JSON.parse(data);
    }
    else{
        return null;
    }
}
export const getUserToken = () => {
    return sessionStorage.getItem('userToken') || null;
}
export const getCountry = () => {
    return sessionStorage.getItem('country') || null;
}

export const removeUserSession = () => {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userData');
}

export const setUserSession = (userToken, userData) => {
    sessionStorage.setItem('userToken', userToken);
    sessionStorage.setItem('userData', userData);
}
export const setRiderDetails = (riderDetails) => {
    sessionStorage.setItem('riderDetails', riderDetails);
}