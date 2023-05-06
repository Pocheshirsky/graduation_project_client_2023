<template lang="pug">
    v-app-bar(app dark class="primary")
      v-app-bar-nav-icon.hidden-md-and-up(@click.stop="drawer = !drawer" )
      router-link(:to="'/'" tag="span" style="cursor:pointer")
        v-app-bar-title
          <!-- <h3 class="text-h4 white--text">Название</h3> -->
          h3.text-h4.white--text Название
      v-spacer
      div.hidden-sm-and-down
        v-btn(v-for="(item, i) in menuItems" :key="i" :to="item.route" text) {{item.title}}
          v-icon(right) {{item.icon}}

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

    menuItems(){
      return [
        {
          icon: 'mdi-message-text',
          title: 'Чаты',
          route: '/messenger',
        },
        {
          icon: 'mdi-eye',
          title: 'Найти знакомство',
          route: '/searching',
        },
        {
          icon: 'mdi-puzzle',
          title: 'Пройти тестирование',
          route: '/start_testing',
        },
        {
          icon: 'mdi-account-circle',
          title: 'Мой профиль',
          route: '/profile',
        },
        {
          icon: 'mdi-logout-variant',
          title: 'Выйти',
          route: '/logout',
        },
        {
          icon: 'mdi-login-variant',
          title: 'Войти',
          route: '/login',
        },
        {
          icon: 'mdi-wrench',
          title: 'Панель разработчика',
          route: '/devpanel'
        }
      ]
    }
  },
}
</script>

<style scoped>

</style>