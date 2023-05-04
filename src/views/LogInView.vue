<template lang="pug">
  v-container(fill-height)
    v-row(class="justify-center align-center")
      v-col(cols="12" sm="5")
        v-card(class="elevation-12")
          v-toolbar(dark color="primary")
            v-toolbar-title Авторизация
          v-card-text
            v-form
              v-text-field(prepend-icon="mdi-account" name="login" label="Логин" type="text" required)
              v-text-field(id="password" prepend-icon="mdi-lock" name="password" label="Пароль" type="password" required)
          v-card-action
            div(justify="center" align="center")
              v-spacer
              v-btn.mb-2(color="primary" rounded large) Войти
            div.pb-4.pt-2(justify="center" align="center")
              v-btn(align="center" justify="center" color="primary" rounded :to="'/signup'") Впервые здесь?
</template>

<script>
export default {
  name: "LogInView",
  data(){
    return {
      login: null,
      password: null,
    }
  }
}
</script>

<style scoped>

</style>