<template lang="pug">
    v-app-bar(app dark class="primary")
      v-app-bar-nav-icon.hidden-md-and-up(@click.stop="drawer = !drawer" )
      router-link(:to="'/main'" tag="span" style="cursor:pointer")
        v-app-bar-title
          <!-- <h3 class="text-h4 white--text">Название</h3> -->
          h3.text-h4.white--text Название
      v-spacer
      div.hidden-sm-and-down
        v-badge.mr-5(v-if="user" top color="red" overlap content="100" :content="this.user.alertsCount")
          v-btn(icon small)
            v-icon() mdi-bell
        v-btn(v-if="user" text :to="'/messenger'") Чаты
          v-icon(right) mdi-message-text
        v-btn(v-if="user" text :to="'/searching'") Найти знакомство
          v-icon(right) mdi-eye
        v-btn(v-if="user" text :to="'/start_testing'") Пройти тестирование
          v-icon(right) mdi-puzzle
        v-btn(v-if="user" text :to="'/profile'") Мой профиль
          v-icon(right) mdi-account-circle
        v-btn(v-if="user" text :to="'/'" @click="logoutFunction") Выйти
          v-icon(right) mdi-logout-variant
        v-btn(v-if="!user" text :to="'/login'") Войти
          v-icon(right) mdi-login-variant
        v-btn(v-if="user?.roles?.[0].authority == 'ADMIN'" text :to="'/devpanel'") Панель разработчика
          v-icon(right) mdi-wrench
</template>

<script>
import {mapActions} from 'vuex'
import {mapState} from 'vuex'
export default {
  name: "AppHeader",
  data(){
    return {
      drawer: false
    }
  },

  mounted() {
    // this.checkRoles()
  },

  computed:{
    ...mapState('user', ['user']),
  },

  methods: {
    ...mapActions('user', ['logout']),
    logoutFunction() {
      this.logout()
    },
    // checkRoles(){

    //   console.log('123', this.user.roles)
    // }
  }
}
</script>

<style scoped>

</style>