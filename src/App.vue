<template lang="pug">
v-app
  app-header
  v-content
    router-view
  //- div.ma-12 USER: {{user}}
  v-btn(@click="sendMessage") arara
  v-text-field(v-model="pers")
  v-text-field(v-model="text")
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import { mapActions, mapState } from "vuex";
import {connect, sendMessage} from '@/plugins/Socket.api'

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },

  data: () => ({
    drawer: false,
    stompClient: null,
    text:"",
    pers:""
  }),

  beforeMount() {
    this.getUserInfo()
        .then(()=>{
          connect(this.user.uuid)
        })
  },

  mounted() {
  },

  computed: {
    ...mapState('user', ['user'])
  },

  methods: {
    ...mapActions("user", ["signIn", "getAllUsers", "getUserInfo"]),

    sendMessage() {
      
      const message = {
        senderUuid: this.pers,
        recipientUuid: this.user.uuid,
        senderName: "admin",
        recipientName: "user1",
        content: this.text,
        timestamp: new Date(),
      };
      sendMessage(message)
    },
  },
};
</script>

<style>
</style>
