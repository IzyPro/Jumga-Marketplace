import React from 'react';

function ChangePassword(){
    const onload = () => {
    window.alert(window.location.href)   
    }
    return(
        <div>
            <button onClick={onload}>GT Pay</button>
        </div>
    );
}
export default ChangePassword;