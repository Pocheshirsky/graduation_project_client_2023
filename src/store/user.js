import api from '@/plugins/Api'

export default {
    namespaced: true,

    state: {
      user: null,
      userAnswersArray: [],
      userTestingResult: []
    },
    getters: {
    },
    mutations: {
        setUserAnswers(state, userAnswers) {
            state.userAnswersArray = userAnswers
        },
    },
    actions: {
        signIn({state}, userAuthInfo) {
            api.signIn(userAuthInfo).then((data) => {
                state.user = data.user;
                console.log("Авторизация произошла", data.user);
            })
            .catch((error)=>console.log(error))
        },
        signUp({state}, userAuthInfo) {
            api.signUp(userAuthInfo).then((data) => {
                state.user = data.user;
                console.log("Регистрация произошла",data.user);
            })
            .catch((error)=>console.log(error))
            // .catch(()=>state.user = userInfo)
        },
        getAllUsers() {
            api.getAllUsers().then((data) => {
                console.log(data.data);
            })
            .catch((error)=>console.log(error))// as example
        },
        updateUserInfo({state}, userInfo){
            api.updateUserInfo(userInfo).then((data) => {
                state.user=data;
            })
            .catch((error)=>console.log(error))
        },
        logout({state}){
            api.logout().then(() => {
                state.user = null;
            })
            .catch((error)=>console.log(error))
        },
        getUserInfo({state}){
            if(!state.user) {
                api.getUserInfo().then((data) => {
                state.user = data;
                console.log("userInfo получен",data);
            })
            .catch((error)=>console.log(error))
            }
        },
        createUser(userInfo) {
            api.createUser(userInfo).then((data) => {
                console.log(data.data);
            })
        }
    }
}
