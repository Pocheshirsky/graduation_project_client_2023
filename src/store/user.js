import api from '@/plugins/Api'

export default {
    namespaced: true,

    state: {
        user: {
            name: "hne"
        }
    },
    getters: {
    },
    mutations: {
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
