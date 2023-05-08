<template lang="pug">
    v-app-bar(app dark class="primary")
      v-app-bar-nav-icon.hidden-md-and-up(@click.stop="drawer = !drawer" )
      router-link(:to="'/main'" tag="span" style="cursor:pointer")
        v-app-bar-title
          <!-- <h3 class="text-h4 white--text">Название</h3> -->
          h3.text-h4.white--text Название
      v-spacer
      div.hidden-sm-and-down
        v-btn(v-if="user.length" text :to="'/messenger'") Чаты
          v-icon(right) mdi-message-text
        v-btn(v-if="user.length" text :to="'/searching'") Найти знакомство
          v-icon(right) mdi-eye
        v-btn(v-if="user.length" text :to="'/start_testing'") Пройти тестирование
          v-icon(right) mdi-puzzle
        v-btn(v-if="user.length" text :to="'/profile'") Мой профиль
          v-icon(right) mdi-account-circle
        v-btn(v-if="user.length" text :to="'/'" @click="logout") Выйти
          v-icon(right) mdi-logout-variant
        v-btn(text :to="'/login'") Войти
          v-icon(right) mdi-login-variant
        v-btn(text :to="'/devpanel'") Панель разработчика
          v-icon(right) mdi-wrench
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "AppHeader",
  data(){
    return {
      drawer: false
    }
  },
  computed:{
    ...mapState('user', ['user']),

  },
  methods: {
    // logout() {
    //   this.user = null
    // }
  }
}
</script>

<style scoped>

</style>