<template lang="pug">
v-app
  app-header
  v-content
    router-view
  v-btn(@click="sendMessage") arara
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import { mapActions } from "vuex";
// import api from '@/plugins/Api'

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },

  data: () => ({
    drawer: false,
    stompClient: null,
  }),

  mounted() {
    //this.loginUser()
    // this.signIn({username: 'admineee', password: '123'})
    // this.getAllUsers().catch((er)=>console.log("ER",er));
    // api.getUserInfo().catch((er)=>console.log("ER",er));
    this.connect();
  },

  methods: {
    ...mapActions("user", ["signIn", "getAllUsers"]),
    //loginUser() {
    //  this.signIn({username: 'admin', password: '123'})
    //}

    connect() {
      const Stomp = require("@stomp/stompjs");
      let SockJS = require("sockjs-client");
      SockJS = new SockJS("http://localhost:8090/ws");
      this.stompClient = Stomp.Stomp.over(SockJS);
      this.stompClient.connect({}, this.onConnected, (err) =>
        console.log("ERROR", err)
      );
    },
    onConnected() {
      console.log("I'am AS WEBSOCKET");

      this.stompClient.subscribe(
        "/user/queue/messages",
        this.onMessageReceived
      );
    },
    onMessageReceived(msg) {
      console.log("YXXXX", JSON.parse(msg.body));
    },
    sendMessage() {
      console.log("arararara");
      const message = {
        senderUuid: "d79973e6-da4e-4be5-8f65-2f4d6a49caec",
        recipientUuid: "d79973e6-da1e-4be5-8f65-2f4d6a49caec",
        senderName: "admin",
        recipientName: "admineee",
        content: "hehehehe",
        timestamp: new Date(),
      };
      this.stompClient.send("/app/chat", {}, JSON.stringify(message));
    },

    //на будущее
    // connect() {
    //   const Stomp = require("@stomp/stompjs");
    //   let SockJS = require("sockjs-client");
    //   // console.log(Stomp);
    //   // console.log(SockJS);
    //   SockJS = new SockJS("http://localhost:8090/ws");
    //   this.stompClient = Stomp.Stomp.over(SockJS);
    //   this.stompClient.connect({}, this.onConnected, (err) =>
    //     console.log("ERROR", err)
    //   );
    // },
    // onConnected() {
    //   console.log("I'am AS WEBSOCKET");

    //   this.stompClient.subscribe(
    //     "/user/" + "d79973e6-da1e-4be5-8f65-2f4d6a49caec" + "/queue/messages",
    //     this.onMessageReceived
    //   );
    // },
    // onMessageReceived(msg){console.log("YXXXX", JSON.parse(msg.body))},
    // sendMessage() {
    //   console.log("arararara");
    //   const message = {
    //     senderUuid: "d79973e6-da4e-4be5-8f65-2f4d6a49caec",
    //     recipientUuid: "d79973e6-da1e-4be5-8f65-2f4d6a49caec",
    //     senderName: "admin",
    //     recipientName: "admineee",
    //     content: "hehehehe",
    //     timestamp: new Date(),
    //   };
    //   this.stompClient.send("/app/chat", {}, JSON.stringify(message));
    // },
  },
};
</script>

<style>
</style>
