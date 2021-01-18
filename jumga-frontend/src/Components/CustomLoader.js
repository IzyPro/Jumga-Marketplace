import React from "react";
import Loader from "react-loader-spinner";

function CustomLoader() {
  return (
    <div className="m-2 text-center">
      <Loader type="BallTriangle" color="#2171EA" height={50} width={50} />
    </div>
  );
}
export default CustomLoader;
