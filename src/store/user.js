import api from '@/plugins/Api'

export default {
    namespaced: true,

    state: {
        user: null,
        userAnswersArray: [],
        userTestingResult: [],

        currentRecipient: null,
        newMessages: [],
        newAlerts: []
    },

    getters: {
        alertsCount: (state)=> state.newAlerts.length
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
            })
        },

        signUp({ state }, userAuthInfo) {
            return api.signUp(userAuthInfo).then((data) => {
                state.user = data.user;
                console.log("Регистрация произошла", data.user);
            })
        },

        getRecipientByUuid({state}, userUuid) {
            return api.getUser(userUuid).then((data) =>{
                state.currentRecipient = data;
                console.log("Собеседник получен", data)
            })
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
            return new Promise((resolve, reject) => {
                if (!state.user && localStorage.getItem('refreshToken')) {
                    api.getUserInfo().then((data) => {
                        state.user = data;
                        console.log("userInfo получен", data);
                        resolve(data)
                    }).catch((error) => reject(error))
                } else reject('Пользователь не авторизован или уже существует')
            })
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

        putUserInSearchingPool() {
            return api.putUserInSearchingPool().then((data) => {
                console.log('Помещаюсь в пул', data);
            }).catch((error) => console.log(error))
        },

        getAlertMessages({state}) {
            return api.findAlertMessages().then((data) => {
                state.newAlerts = data
                console.log('Уведомления получены', data)
            }).catch((error) => console.log(error))
        },

        updateMessageStatus({state}, {messageUuid, userInfoUuid}) {
            return api.updateMessageStatus(messageUuid, userInfoUuid).then((data) => {
                state.currentRecipient = data

            }).catch((error) => console.log(error))
        },

        deleteChat(obj, {userUuid, recipientUuid}){
            return api.deleteChat(userUuid, recipientUuid)
                .catch((error) => console.log(error))
        },

        //For Admin Only
        createUser(obj, user) {
            return api.createUser(user).then((data) => {
                console.log("Пользователь создан", data.user);
            }).catch((error) => console.log(error))
        },
    }
}
