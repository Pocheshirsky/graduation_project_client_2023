import axios from 'axios'
export default {
    namespaced: true,

    state: {
      user:{
        name:"hne"
      }
    },
    getters: {
    },
    mutations: {
    },
    actions: {
        sign({state},userInfo){
            axios.post(userInfo).then((data)=>{
                state.user = data.data
            })
            .catch(()=>state.user = userInfo)
        },
    }
  }
  