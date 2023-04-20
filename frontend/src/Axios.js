// export const baseURL = 'https://twiktik.onrender.com'

import axios from "axios";
const Axios = axios.create({
    baseURL: "https://twiktik.onrender.com",
});
export default Axios;
