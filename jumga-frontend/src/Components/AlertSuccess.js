import React from "react";
import { ReactComponent as CheckIcon } from "../Icons/checkIcon.svg";

function AlertSuccess() {
  return (
    <div className="home container text-center">
      <CheckIcon className="mx-auto text-center" width="40%" />
      <h2 className="m-auto text-center">Successful</h2>
    </div>
  );
}
export default AlertSuccess;
