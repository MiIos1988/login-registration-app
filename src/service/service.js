import axios from "axios";

export const getAllData = () => axios.get("https://ip-service.onrender.com/api/get-all-address");