import axios from 'axios'
import api from '@/plugins/Api'

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
        getAllUsers(){
            api.getAllUsers().then((data)=>{
                console.log(data.data);
            }) // as example
        }
    }
  }
  