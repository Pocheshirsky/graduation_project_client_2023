import api from '@/plugins/Api'

export default {
    namespaced: true,

    state: {
        user: null,
        userAnswersArray: [],
        userTestingResult: [],


        currentRecipient: null,
        newMessages: [],
    },
    getters: {
    },
    mutations: {
        setUserAnswers(state, userAnswers) {
            state.userAnswersArray = userAnswers
        },
        setCurrentRecipient(state, recipient) {
            state.currentRecipient = recipient
        },
        clearNewMessages(state){
            state.newMessages = []
        }
    },
    actions: {
        signIn({ state }, userAuthInfo) {
            return api.signIn(userAuthInfo).then((data) => {
                state.user = data.user;
                console.log("Авторизация произошла", data.user);
            }).catch((error) => console.log(error))
        },
        signUp({ state }, userAuthInfo) {
            return api.signUp(userAuthInfo).then((data) => {
                state.user = data.user;
                console.log("Регистрация произошла", data.user);
            }).catch((error) => console.log(error))
        },
        getAllUsers() {
            return api.getAllUsers().then((data) => {
                console.log(data.data);
            }).catch((error) => console.log(error))
        },
        updateUserInfo({ state }, userInfo) {
            return api.updateUserInfo(userInfo).then((data) => {
                state.user = data;
            }).catch((error) => console.log(error))
        },
        logout({ state }) {
            return api.logout().then(() => {
                state.user = null;
            }).catch((error) => console.log(error))
        },
        getUserInfo({ state }) {
            if (!state.user) {
                return api.getUserInfo().then((data) => {
                    state.user = data;
                    console.log("userInfo получен", data);
                }).catch((error) => console.log(error))
            }
        },
        createUser(userInfo) {
            return api.createUser(userInfo).then((data) => {
                console.log(data.data);
            }).catch((error) => console.log(error))
        },
        findUserChats(obj, userUuid) {
            return api.findUserChats(userUuid).then((data) => {
                return data
            }).catch((error) => console.log(error))
        },
        findChatMessages(obj, {senderUuid, recipientUuid}) {
            return api.findChatMessages(senderUuid, recipientUuid).then((data) => {
                console.log(data)
                return data
            }).catch((error) => console.log(error))
        },
    }
}
