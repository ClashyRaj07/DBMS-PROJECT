import axios from "axios";

const Axios = axios.create({
    baseURL: "https://twiktik.onrender.com",
    withCredentials: true,
});

export default Axios;
