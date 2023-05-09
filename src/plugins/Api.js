import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8090"
})

instance.interceptors.request.use(config => {
    if (localStorage.getItem("accessToken"))
        config.headers = { 'Authorization': 'Bearer ' + localStorage.getItem("accessToken") }
    return config;
});

// console.log("aaa",instance.);
// const config = ()=>{
//     { headers: { 'Authorization': 'Bearer ' + localStorage.getItem("accessToken") }}

// }



const signUp = (userInfo) => instance.post("/api/auth/signup", userInfo).then(data => {
    // localStorage.removeItem('accessToken')
    // localStorage.removeItem('refreshToken')
    localStorage.setItem("accessToken", data.data.accessToken)
    localStorage.setItem("refreshToken", data.data.refreshToken)
    return data.data
})

const getAllUsers = () => instance.get("/api/user/all")

const getUser = (userUUID) => instance.get("/user/" + userUUID)

const signIn = (userInfo) => instance.post("/api/auth/login", userInfo).then(data => {
    // localStorage.removeItem('accessToken')
    // localStorage.removeItem('refreshToken')
    localStorage.setItem("accessToken", data.data.accessToken)
    localStorage.setItem("refreshToken", data.data.refreshToken)
    return data.data
})
const updateUserInfo = (userInfo) => instance.post("/api/user/updateUserInfo", userInfo).then(data => data.data)

// function getHeaders() {
//     console.log("sdsd");
//     if (localStorage.getItem("accessToken"))
//         return { 'Authorization': 'Bearer ' + localStorage.getItem("accessToken") }
// }
// function parseJwt(token) {
//     let base64Url = token.split('.')[1];
//     let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));

//     return JSON.parse(jsonPayload);
// }//refreshToken

export default {
    getAllUsers,
    getUser,
    signUp,
    signIn,
    updateUserInfo
}