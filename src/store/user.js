import api from '@/plugins/Api'

export default {
    namespaced: true,

    state: {
      user: {

      },
      userAnswersArray: [],
      userTestingResult: []
    },
    getters: {
    },
    mutations: {
        setUserAnswers(state, userAnswers) {
            state.userAnswersArray = userAnswers
        },
        setTestingResult(state, result){
            state.userTestingResult = result
        }
    },
    actions: {
        signIn({state}, userInfo) {
            api.signIn(userInfo).then((data) => {
                state.user = data.user;
                console.log("123", data.user);
            })
            // .catch(()=>state.user = userInfo)
        },
        signUp({state}, userInfo) {
            api.signUp(userInfo).then((data) => {
                state.user = data.user;
                console.log("123",data.user);
            })
            // .catch(()=>state.user = userInfo)
        },
        getAllUsers() {
            api.getAllUsers().then((data) => {
                console.log(data.data);
            }) // as example
        },
        updateUserInfo({state}, userInfo){
            api.updateUserInfo(userInfo).then((data) => {
                state.user=data;
            })
        },

    }
}
