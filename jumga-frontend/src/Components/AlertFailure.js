import React from "react";
import { ReactComponent as FailedIcon } from "../Icons/failedIcon.svg";

function AlertFailure(props) {
  return(
    <div className="container text-center">
          <FailedIcon className="mx-auto" width="100" />
          <p className="lead text-danger m-auto">{props.error}</p>
        </div>
  );
}
export default AlertFailure;