<template lang="pug">
v-app
  app-header
  v-content.contentColor
    router-view

</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import {mapActions, mapGetters, mapState} from "vuex";
import { connect } from '@/plugins/Socket.api'

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },

  data: () => ({
    drawer: false,
  }),

  mounted() {
    this.getUserInfo()
      .catch((err)=> console.log(err))
  },

  watch: {
    user(newUser) {
      if (newUser)
        this.INIT()
    }
  },

  computed: {
    ...mapState('user', ['user', 'newAlerts']),
    ...mapGetters('user', ['alertsCount'])
  },

  methods: {
    ...mapActions('user', ['getUserInfo', 'getAlertMessages']),
    INIT() {
      console.log('Это я:', this.user)

      connect(this.user.uuid, this.user.userInfo.uuid)
      this.getAlertMessages()
    }
  },
};
</script>

<style>
.contentColor{
  background-color: #fdf4c5
}
</style>
