<template lang="pug">
  v-container(fill-height)
    v-row(class="justify-center align-center")
      v-col(cols="12" sm="5")
        v-card(class="elevation-12")
          v-toolbar(dark color="primary")
            v-toolbar-title Регистрация
          v-card-text
            v-form(ref="form")
              v-text-field(prepend-icon="mdi-account" label="Электронная почта" type="text"  v-model="email" :rules="emailRules" :counter="35")
              v-text-field(prepend-icon="mdi-lock" label="Пароль" :type="showPassword1 ? 'text' : 'password'" :rules="passwordRules" :counter="20" v-model="password" :append-icon="showPassword1 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword1 = !showPassword1")
              v-text-field(prepend-icon="mdi-lock" label="Повторите пароль" :type="showPassword2 ? 'text' : 'password'" :rules="confirmPasswordRules" v-model="passwordRepeat" :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword2 = !showPassword2")
          v-card-actions
            div.mx-auto(justify="center" align="center")
              v-spacer
              v-btn.mb-2(color="primary" rounded large @click="registration") Далее
</template>
<script>
import { mapActions, mapState} from 'vuex'
export default {
  name: "SignUpView",
  data(){
    return {
      email: '',
      password: '',
      passwordRepeat: '',
      showPassword1: false,
      showPassword2: false,
      userExists: false,

      emailRules: [
        v => !!v || 'Введите E-mail',
        v => /.+@.+\..+/.test(v) || 'Некорректный E-mail',
        v => v.length <= 35 || 'Длина E-mail больше 35 символов',
        () => !this.userExists || 'Такой пользователь уже существует'
      ],

      passwordRules: [
        v => !!v || 'Введите пароль',
        v => v.length > 7 || 'Пароль должен содержать не менее 8 символов',
        v => v.length <= 20 || 'Длина пароля больше 20 символов'
      ],

      confirmPasswordRules: [
        v => !!v || 'Повторите пароль',
        v => v === this.password || 'Пароли не совпадают'
      ],
    }
  },
  computed:{
    ...mapState('user', ['user']),
  },
  methods: {
    ...mapActions('user', ['signUp','getAllUsers']),

    registration(){
      if(this.$refs.form.validate()) {
        this.signUp({username: this.email, password: this.password})
            .then(() => this.$router.push('/main'))
            .catch((error) => {console.log('123', error); this.userExists = true; this.$refs.form.validate(); this.userExists = false;})
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style scoped>
.center{

}
</style>