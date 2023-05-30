<template lang="pug">
  v-container(fill-height)
    v-row(class="justify-center align-center")
      v-col(cols="12" sm="5")
        v-card(class="elevation-12")
          v-toolbar(dark color="primary")
            v-toolbar-title Авторизация
          v-card-text
            v-form(ref="form")
              v-text-field(prepend-icon="mdi-account" label="Электронная почта" type="text" required v-model="email" :rules="emailRules")
              v-text-field(prepend-icon="mdi-lock" label="Пароль" :type="showPassword1 ? 'text' : 'password'" :rules="passwordRules" required v-model="password" :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword1 = !showPassword1")
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
      email: '',
      password: '',
      showPassword1: false,
      userExists: true,

      emailRules: [
        v => !!v || 'Введите E-mail',
        () => this.userExists || 'Неправильные E-mail или пароль'
      ],

      passwordRules: [
        v => !!v || 'Введите пароль',
        () => this.userExists || 'Неправильные E-mail или пароль'
      ]
    }
  },

  computed: {
    ...mapState('user', ['user'])
  },

  methods: {
    ...mapActions('user', ['signIn', 'getAllUsers']),
    loginUser() {
      this.signIn({username: this.email, password: this.password})
        .then(() => {this.$router.push('/main')})
        .catch((error) => {console.log('123', error); this.userExists = false; this.$refs.form.validate(); this.userExists = true;})
    }
  }
}
</script>

<style scoped>

</style>