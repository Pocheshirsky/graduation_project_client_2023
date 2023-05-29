<template lang="pug">
  v-container(fill-height)
    v-row(class="justify-center align-center")
      v-col(cols="12" sm="5")
        v-card(class="elevation-12")
          v-toolbar(dark color="primary")
            v-toolbar-title Регистрация
          v-card-text
            v-form
              v-text-field(prepend-icon="mdi-account" label="Логин" type="text"  v-model="login")
              v-text-field(prepend-icon="mdi-lock" label="Пароль" :type="showPassword1 ? 'text' : 'password'"  v-model="password" :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword1 = !showPassword1")
              v-text-field(prepend-icon="mdi-lock" label="Повторите пароль" :type="showPassword2 ? 'text' : 'password'"  v-model="passwordRepeat" :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword2 = !showPassword2")
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
      passwordRepeat: null,
      showPassword1: false,
      showPassword2: false,
    }
  },
  computed:{
    ...mapState('user', ['user']),
  },
  methods: {
    ...mapActions('user', ['signUp','getAllUsers']),

    registration(){
      this.signUp({username: this.login, password: this.password })
          .then(() => this.$router.push('/main'))
    }
  }
}
</script>

<style scoped>

</style>