import axios from "axios";
const axiosInstance = axios.create({
         // local instance of firebase function
    // baseURL: "http://127.0.0.1:5001/clone-bd342/us-central1/api"
        //   Deployed version of amazon server on render
    // baseURL: "https://amazon-api-deploy-wvjc.onrender.com/",
    baseURL:"https://amazon-api-deploy-cfce.onrender.com",
})
export { axiosInstance };