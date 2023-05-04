<template lang="pug">
  div
    v-navigation-drawer(absolute temporary v-model="drawer" )
      v-list
        v-list-item(v-for="(item, i) in menuItems" :key="i")
          v-list-item-action
            v-icon {{item.icon}}
          v-list-item-content
            v-list-item-title(v-text="item.title")

    v-app-bar(app dark class="primary")
      v-app-bar-nav-icon(@click.stop="drawer = !drawer" class="hidden-md-and-up")
      router-link(:to="'/'" tag="span" style="cursor:pointer")
        v-app-bar-title
          <!-- <h3 class="text-h4 white--text">Название</h3> -->
          h3.text-h4.white--text Название
      v-spacer
      v-app-bar-items(class="hidden-sm-and-down")
        v-btn(v-for="(item, i) in menuItems" :key="i" :to="item.route" text) {{item.title}}
          v-icon(right) {{item.icon}}

</template>

<script>
export default {
  name: "AppHeader",
  data(){
    return {
      drawer: false
    }
  },
  computed:{
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
          route: '/testing',
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