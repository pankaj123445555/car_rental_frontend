import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://carrentalbackend-bz2y.onrender.com",
});

export default axiosInstance;
