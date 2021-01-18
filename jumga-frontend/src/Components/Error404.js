import React from 'react';
import NotFound from "../Images/notFound.png";

function Error404(){
    return(
        <div className="home">
          <h1 className="text-center mt-5">404</h1>
          <p className="text-center">No shop was found at this url</p>
          <img src={NotFound} width="100%" alt="Not Found"/>
        </div>
    );
}
export default Error404;