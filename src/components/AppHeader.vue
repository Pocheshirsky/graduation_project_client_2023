<template lang="pug">
    v-app-bar(app dark class="primary")
      v-app-bar-nav-icon.hidden-md-and-up(@click.stop="drawer = !drawer" )
      router-link(:to="'/main'" tag="span" style="cursor:pointer")
        v-app-bar-title
          <!-- <h3 class="text-h4 white--text">Название</h3> -->
          h3.text-h4.white--text Название
      v-spacer
      div.hidden-sm-and-down
        v-menu
          template(v-slot:activator="{ on, attrs }")
            v-badge.mr-5(:value="alertsCount > 0" top color="red" :content="alertsCount" offset-x="23" offset-y="23")
              v-btn(icon v-bind="attrs" v-on="on" @click="changeDrawer")
                v-icon() mdi-bell
        v-menu
          template(v-slot:activator="{ on, attrs }")
            v-btn(v-if="!alertsCount" icon v-bind="attrs" v-on="on")
              v-icon() mdi-bell
          v-list
            v-list-item Уведомлений нет :(
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
      transition(name="fade")
        div.alerts.elevation-4(v-if="drawer")
          div.primary.pa-4 Уведомления
          div(v-for="(alert, i) in newAlerts" :key="i" @click="goToChat(alert)")
            div.primary--text.ml-4 Найдено знакомство!
            v-row(justify="center" style="align-items: baseline")
              v-col(cols="3")
                v-avatar.ml-4(size="50")
                  v-img(:src="setAvatar(alert)")
              v-col(cols="9")
                div.primary--text() {{alert.foundUserInfo.firstName}} {{alert.foundUserInfo.lastName}}
            v-divider.primary
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {mapState} from 'vuex'

export default {
  name: "AppHeader",
  data(){
    return {
      drawer: false,
      counter: 0,
    }
  },

  mounted() {

  },

  computed:{
    ...mapState('user', ['user', 'newAlerts', 'currentRecipient']),
    ...mapGetters('user', ['alertsCount'])
  },

  methods: {
    ...mapActions('user', ['logout', 'updateMessageStatus']),
    logoutFunction() {
      this.logout()
    },

    goToChat(alert){

      this.updateMessageStatus({messageUuid: alert.uuid, userInfoUuid: alert.foundUserInfo.uuid} )
          .then(() => {
            this.$router.push(`/chat/${this.user.uuid}/${this.currentRecipient.uuid}`)
            console.log(alert.foundUserInfo.uuid)
          }).catch(console.log)
      this.drawer = false
      for(let i = 0; i < this.newAlerts.length; i++){
        if(this.newAlerts[i] === alert)
          this.newAlerts.splice(i, 1);
          console.log("я здесь")
      }
    },

    setAvatar(alert){
      if(alert.foundUserInfo.avatar != null)
        return URL.createObjectURL(new Blob([alert.foundUserInfo.avatar]));
      else return require("@/assets/no_avatar.png");
    },

    selectAlert(uuid){
      this.updateMessageStatus(uuid)
      this.$router.push('/chat')
    },

    changeDrawer(){
      this.drawer = !this.drawer
    }
  }
}
</script>

<style>
.alerts{
  position: absolute;
  top: 85px;
  right: 20px;
  height: auto;
  width: 400px;
  background-color: white;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-leave-to, .fade-enter-from {
  opacity: 0;
}

</style>