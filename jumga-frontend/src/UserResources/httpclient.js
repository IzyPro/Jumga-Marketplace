import Axios from 'axios';
import { getUserToken } from './UserData';

let token = getUserToken();
// const httpclient = Axios.create({
//   baseURL: "https://jumga-api.herokuapp.com",
//   headers: {
//     Authorization: "Bearer " + token,
//   },
// });
// export default httpclient;

const axiosInstance = Axios.create({
    baseURL: "https://jumga-api.herokuapp.com",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
export default axiosInstance;