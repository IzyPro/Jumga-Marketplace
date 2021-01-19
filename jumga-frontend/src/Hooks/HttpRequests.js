import Axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../UserResources/httpclient";

export function useAxiosGet(url) {
  const [request, setRequest] = useState({
    loading: false,
    data: null,
    isError: false,
    error: null,
  });
  useEffect(() => {
    setRequest({
      loading: true,
      data: null,
      isError: false,
      error: null,
    });
    axiosInstance
      .get(url)
      .then((response) => {
        setRequest({
          loading: false,
          data: response.data,
          isError: false,
          error: null,
        });
      })
      .catch((errors) => {
        setRequest({
          loading: false,
          data: null,
          isError: true,
          error: errors.message,
          errorCode: errors.response.status,
        });
      });
  }, [url]);

  return request;
}

export function useAxiosGetBanks(url) {
  let flutterwaveSK = process.env.REACT_APP_SECRET;
  const [request, setRequest] = useState({
    data: null,
    isError: false,
    error: null,
  });

  const headers = {
    Authorization: "Bearer " + flutterwaveSK,
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  };

  useEffect(() => {
    setRequest({
      data: null,
      isError: false,
      error: null,
    });
    Axios.get(url, { headers })
      .then((response) => {
        setRequest({
          data: response.data,
          isError: false,
          error: null,
        });
      })
      .catch((errors) => {
        setRequest({
          data: null,
          isError: true,
          error: errors.message,
        });
        console.log("omo");
      });
  }, [url]);
  return request;
}