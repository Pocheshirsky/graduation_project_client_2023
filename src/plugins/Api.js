import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8090/api"
})

instance.interceptors.request.use(config => {
    if (localStorage.getItem("accessToken"))
        config.headers = { 'Authorization': 'Bearer ' + localStorage.getItem("accessToken") }
    return config;
});

instance.interceptors.response.use((response) => {
    // Любой код состояния, находящийся в диапазоне 2xx, вызывает срабатывание этой функции
    // Здесь можете сделать что-нибудь с ответом
    return response;
}, (error) => {
    // Любые коды состояния, выходящие за пределы диапазона 2xx, вызывают срабатывание этой функции
    // Здесь можете сделать что-то с ошибкой ответа
    if (error.response !== undefined) {
        if (error.response.status === 401 && !error.config.url.includes("/auth/login") && !error.config.url.includes("/auth/signup")) {
            if (error.config.url.includes("/auth/refresh-token")) {
                clearStorage()
                window.location = "/login"
            }

            if (localStorage.getItem("refreshToken")) {
                console.log("s", !!error.config.url.includes("/auth/login"));
                getNewAccessToken().then(() => instance.request(error.config))
                    .catch(() => {
                        getNewRefreshToken().then(() => instance.request(error.config))// Проблема если вызвать old date refresh token, т.е. поменять его низя, а когда вызывать обновление не понятно
                    });
            }

        }
        if (error.response.status === 400 && error.config.url.includes("/auth/refresh-token")) {
            clearStorage()
            window.location = "/login"
        }
    }
    return Promise.reject(error.response.data.message || "BAD_REQUEST");
});

let timerId;


const signUp = (userInfo) => instance.post("/auth/signup", userInfo).then(data => {
    updateStorage(data)
    setUpdateTimer(data)
    return data.data
})
const signIn = (userInfo) => instance.post("/auth/login", userInfo).then(data => {
    updateStorage(data)
    setUpdateTimer(data)
    return data.data
})


const getAllUsers = () => instance.get("/user/all")
const getUser = (userUUID) => instance.get("/user/" + userUUID)

const updateUserInfo = (userInfo) => instance.post("/user/", userInfo).then(data => data.data)
const getUserInfo = () => instance.get("/user/userinfo").then(data => data.data) //.then(data =>{;setUpdateTimer(data); return data.data} )

const getUserAvatar = (userUuid) => instance.get("/user/avatar/" + userUuid, { responseType: "blob" }).then((data) => data.data)

const setUserAvatar = (formdata) => instance.post("/user/avatar", formdata)

const putUserInSearchingPool = () => instance.post("/searching/user").then(data => data.data)

const findUserChats = (userUuid) => instance.get("/messages/chat/" + userUuid).then(data => data.data)
const findChatMessages = (senderUuid, recipientUuid) => instance.get('/messages/' + senderUuid + '/' + recipientUuid).then(data => data.data)
const findAlertMessages = () => instance.get('/searching/message-pool').then(data => data.data)
const updateMessageStatus = (messageUuid, userInfoUuid) => instance.put('/searching/message-pool/' + messageUuid + '/' + userInfoUuid).then(data => data.data)

const logout = () => instance.post("/auth/logout", refreshToken()).then(clearStorage)
const logoutAll = () => instance.post("/auth/logout-all", refreshToken()).then(clearStorage)
const getNewAccessToken = () => instance.post("/auth/access-token", refreshToken()).then()
const getNewRefreshToken = () => instance.post("/auth/refresh-token", refreshToken()).then((data) => { updateStorage(data); setUpdateTimer(data) })

const refreshToken = () => { return { refreshToken: localStorage.getItem("refreshToken") } }

const updateStorage = (response) => {
    localStorage.setItem("accessToken", response.data.accessToken)
    localStorage.setItem("refreshToken", response.data.refreshToken)
}
const clearStorage = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    console.log("Пользователь вышел");
}

const createUser = (user) => instance.post("/auth/signup", user).then(data => {
    return data.data
})

//Доработать, при перезагрузке ничего не запускает возможно запускать с getUserInfo (Смотри коммент выше)
function setUpdateTimer(response) {
    if (timerId)
        clearTimeout(timerId)

    let token = parseJwt(response.data.refreshToken)
    /* время жизни токена - текущее время - задежка,
     чтоб запросить новый refreshToken перед тем, как он умрет (лучше потом 5 минут поставить т.е. 50000) */
    let updateTimeMs = new Date(token.exp * 1000) - new Date() - 10_0000
    if (updateTimeMs / 8.64e7 < 1)// мс в дни
        timerId = setTimeout(() => getNewRefreshToken(), updateTimeMs)// задержка больше 2147483647 == 1 NOT GOOD

}

function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}//refreshToken

export default {
    getAllUsers,
    getUser,
    signUp,
    signIn,
    updateUserInfo,
    getUserInfo,
    logout,
    logoutAll,
    getNewAccessToken,
    getNewRefreshToken,
    getUserAvatar,
    setUserAvatar,
    findUserChats,
    findChatMessages,
    putUserInSearchingPool,
    createUser,
    findAlertMessages,
    updateMessageStatus
}