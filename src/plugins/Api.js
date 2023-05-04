import axios from "axios";


const instance = axios.create({
    baseURL: "http://localhost:8090"
})
export default {
    getAllUsers: () => instance.get("/user/all"),
    getUser: (userUUID) => instance.get("/user/" + userUUID)
}


