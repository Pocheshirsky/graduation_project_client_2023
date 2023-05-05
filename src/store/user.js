import axios from 'axios'
import api from '@/plugins/Api'

export default {
    namespaced: true,

    state: {
      user:{
        name:"hne"
      },
        userAnswersArray: []
    },
    getters: {
    },
    mutations: {
        setUserAnswers({state},answersArray){
            state.userAnswersArray = answersArray
        }
    },
    actions: {
        sign(prop, userInfo) {
            api.signup(userInfo).then((data) => {
                console.log("123",data);
            })
            // .catch(()=>state.user = userInfo)
        },
        getAllUsers() {
            api.getAllUsers().then((data) => {
                console.log(data.data);
            }) // as example
        }
    }
}
