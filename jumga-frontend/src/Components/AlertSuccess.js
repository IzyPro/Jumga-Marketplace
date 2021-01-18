import React from "react";
import { ReactComponent as CheckIcon } from "../Icons/checkIcon.svg";

function AlertSuccess() {
  return (
    <div className="">
      <CheckIcon className="col-md-6 mx-auto" width="60" />
      <p className="lead m-auto">Successful</p>
    </div>
  );
}
export default AlertSuccess;
