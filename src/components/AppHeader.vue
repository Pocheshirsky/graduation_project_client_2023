<template lang="pug">
    v-app-bar(app dark color="primary")
      v-app-bar-nav-icon.hidden-md-and-up(@click.stop="smallSize = !smallSize" )
      router-link(:to="'/main'" tag="span" style="cursor:pointer")
        div.text-h4.headerBtnsColor() Поиск знакомств
          
      v-spacer
      div.hidden-sm-and-down
        v-menu(v-if="user")
          template(v-slot:activator="{ on, attrs }")
            v-badge.mr-5(:value="alertsCount > 0" top color="red lighten-1" :content="alertsCount" offset-x="23" offset-y="23")
              v-btn(icon v-bind="attrs" v-on="on" @click="changeDrawer" color="white")
                v-icon() mdi-bell
        v-btn.btnBackColor.ml-3(v-if="user" text :to="'/messenger'" color="white" rounded large) Чаты
          v-icon(right) mdi-message-text
        v-btn.btnBackColor.ml-3(v-if="user" text :to="'/searching'" color="white" rounded large) Найти знакомство
          v-icon(right) mdi-eye
        v-btn.btnBackColor.ml-3(v-if="user" text :to="'/start_testing'" color="white" rounded large) Пройти тестирование
          v-icon(right) mdi-puzzle
        v-btn.btnBackColor.ml-3(v-if="user" text :to="'/profile'" color="white" rounded large) Мой профиль
          v-icon(right) mdi-account-circle
        v-btn.btnBackColor.ml-3(v-if="user" text :to="'/'" @click="logoutFunction" color="white" rounded large) Выйти
          v-icon(right) mdi-logout-variant
        v-btn.btnBackColor.ml-3(v-if="!user" text :to="'/login'" color="white" rounded large) Войти
          v-icon(right) mdi-login-variant
        v-btn.btnBackColor.ml-3(v-if="user?.roles?.[0].authority === 'ADMIN'" text :to="'/devpanel'" color="white" rounded large) Панель разработчика
          v-icon(right) mdi-wrench
      transition(name="fade")
        div.alerts.elevation-4(v-if="drawer")
          div.primary.pa-4 Уведомления
          div.hover(v-for="(alert, i) in newAlerts" :key="i" @click="goToChat(alert)")
            div.primary--text.ml-4 Найдено знакомство!
            v-row(justify="center" style="align-items: baseline")
              v-col(cols="2")
                v-avatar.ml-4(size="50")
                  v-img(:src="setAvatar(alert)")
              v-col(cols="10")
                div.primary--text(v-if="!(alert.foundUserInfo.firstName && alert.foundUserInfo.lastName)") Имя и фамилия не указаны
                div.primary--text(v-else) {{alert.foundUserInfo.firstName}} {{alert.foundUserInfo.lastName}}
                div.primary--text(v-if="alert.foundUserInfo.antipathy") Антипатии: {{alert.foundUserInfo.antipathy}}
                div.primary--text(v-if="alert.foundUserInfo.aboutMe") О себе: {{alert.foundUserInfo.aboutMe}}
            v-divider.primary
          div.primary--text.ma-4(v-if="alertsCount === 0") Уведомлений нет
            div
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import {mapState} from 'vuex'

export default {
  name: "AppHeader",
  data(){
    return {
      smallSize: false,
      drawer: false,
      counter: 0,
      dialog: false
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
    ...mapMutations('user', ['setCurrentRecipient']),
    logoutFunction() {
      this.logout()
    },

    goToChat(alert){
      this.updateMessageStatus({messageUuid: alert.uuid, userInfoUuid: alert.foundUserInfo.uuid} )
          .then(() => {
            if(this.$route.path !== `/chat/${this.user.uuid}/${alert.foundUserUuid}`) {
              this.$router.push(`/chat/${this.user.uuid}/${alert.foundUserUuid}`)
            }
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
.headerBtnsColor{
  color: white;
 
}
.btnBackColor{
  background-color: #1E88E5;
}
.alerts{
  position: absolute;
  top: 85px;
  right: 20px;
  height: auto;
  width: 28%;
  background-color: white;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-leave-to, .fade-enter-from {
  opacity: 0;
}
.appBarColor{
  color: #d0ff5b
}
.hover:hover{
  -webkit-filter: brightness(90%);
  filter: brightness(90%);
  cursor: pointer;
}
</style>