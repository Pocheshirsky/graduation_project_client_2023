<template lang="pug">
  v-container(fill-height)
    v-row(class="justify-center align-center")
      v-col(cols="12" sm="5")
        v-card(class="elevation-12")
          v-toolbar(dark color="primary")
            v-toolbar-title Авторизация
          v-card-text
            v-form
              v-text-field(prepend-icon="mdi-account" label="Логин" type="text" required v-model="login")
              v-text-field(prepend-icon="mdi-lock" label="Пароль" :type="showPassword1 ? 'text' : 'password'" required v-model="password" :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword1 = !showPassword1")
          div
            div(justify="center" align="center")
              v-spacer
              v-btn.mb-2(color="primary" rounded large @click="loginUser") Войти
            div.pb-4.pt-2(justify="center" align="center")
              v-btn(align="center" justify="center" color="primary" rounded :to="'/signup'") Впервые здесь?
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "LogInView",
  data() {
    return {
      login: '',
      password: '',
      showPassword1: false
    }
  },

  computed: {
    ...mapState('user', ['user'])
  },

  methods: {
    ...mapActions('user', ['signIn', 'getAllUsers']),
    loginUser() {
      this.signIn({username: this.login, password: this.password})
      this.$router.push('/main')
    }
  }
}
</script>

<style scoped>

</style>