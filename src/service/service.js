import axios from "axios";

export const getAllData = () => axios.get("https://ip-service.onrender.com/api/get-all-address");

export const deleteAddress = (id) => axios.delete(`https://ip-service.onrender.com/api/items/${id}`);

export const findInfoIp = (ip) => axios.get(`https://ipapi.co/${ip}/json/`);
