<template lang="pug">
  v-container(fill-height)
    v-row(class="justify-center align-center")
      v-col(cols="12" sm="5")
        v-card(class="elevation-12")
          v-toolbar(dark color="primary")
            v-toolbar-title Регистрация
          v-card-text
            v-form
              v-text-field(prepend-icon="mdi-account" label="Логин" type="text" :rules="['Required']" v-model="login")
              v-text-field(prepend-icon="mdi-lock" label="Пароль" type="password" :rules="['Required']" v-model="password")
              v-text-field(prepend-icon="mdi-lock" label="Повторите пароль" type="password" :rules="['Required']" v-model="passwordRepeat")
          v-card-action
            div(justify="center" align="center")
              v-spacer
              v-btn.mb-2(color="primary" rounded large @click="registration") Далее
</template>
<script>
import { mapActions, mapState} from 'vuex'
export default {
  name: "SignUpView",
  data(){
    return {
      login: null,
      password: null,
      passwordRepeat: null
    }
  },
  computed:{
    ...mapState('user', ['user']),
  },
  methods: {
    ...mapActions('user', ['signUp','getAllUsers']),

    registration(){
      this.signUp({username: this.login, password: this.password })
      //this.getAllUsers()
      // console.log(this.user.name)
      // console.log(this.$store.state.user.user.name);
      
    }
  }
}
</script>

<style scoped>

</style>