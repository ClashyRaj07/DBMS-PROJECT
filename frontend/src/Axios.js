// export const baseURL = 'https://twiktik.onrender.com'

import axios from "axios";
const Axios = axios.create({
    baseURL: "https://twiktik.onrender.com",
    // baseURL: "http://locahost:5000",
});
export default Axios;
