<template lang="pug">
  v-container.elevation-6(style = "width: 50%")
    v-row.elevation-6.align-end.mb-4()
      v-col(cols="2")
        v-avatar.ma-1(size="100")
          v-img(:src="recipientAvatar" contain)
      v-col(cols="8")
        p.ml-7.primary--text.text-h3(v-model="recipientUsername" ) {{recipientUsername}}
    v-container.fill-height(class="chat" ref="chat")
      v-row.fill-height(align="end")
        v-col
          div.w-50(v-for="(item, i) in chat" :key="i" :class="['d-flex flex-row align-center my-2', item.from === 'me' ? 'justify-end' : null]")
            span(v-if="item.from === 'me'" class="primary--text mr-3") {{ item.msg }}
            v-avatar(size="36")
              v-img(:src="item.from === 'me' ? userAvatar : recipientAvatar" contain)
              span.white--text {{ item.from[0] }}
            span.blue--text.ml-3(v-if="item.from !== 'me'") {{ item.msg }}
    v-divider
    v-container.mx-auto.pa-1
      v-row(no-gutters)
        v-col
          div.d-flex.flex-row.align-center
            v-text-field(v-model="msg" placeholder="Type Something" @keypress.enter="sendMessage")
            v-btn.ml-4(icon @click="sendMessage")
              v-icon(color="primary") mdi-send
</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";
import api from "@/plugins/Api";
import {sendMessage} from "@/plugins/Socket.api";

export default {

  name: "ChatView",
  data() {
    return {
      chat: [],
      msg: "",

      recipientUsername: '',
      recipientAvatar: '',
      userAvatar: '',

      userUuid: '',
      recipientUuid: '',

      messages: null
    }
  },

  mounted() {
    this.recipientUsername = this.currentRecipient.username
    setTimeout(() => {this.getChatMessages(); this.getAvatars()}, 50)

  },

  computed: {
    ...mapState('user', ['user','currentRecipient', 'newMessages']),
    // test() {
    //   console.log('321', this.newMessages.length)
    //   return 1
    // }
  },

  watch: {
    newMessages(array) {
      this.chat.push(...array.filter((el) => el.senderUuid === this.$route.params.recipientUuid).map((el) => { return {from: "interlocutor", msg: el.content}} ))
      this.$nextTick(()=>this.scrollToElement())
      if(array.length)
        this.clearNewMessages()
    }

  },
  methods: {
    ...mapActions('user', ['findChatMessages']),
    ...mapMutations('user', ['clearNewMessages']),

    scrollToElement() {
      const el = this.$refs.chat;
      el.scroll(0, el.scrollHeight)
    },

    getChatMessages(){
      console.log(this.$route.params.senderUuid, this.$route.params.recipientUuid)
      this.findChatMessages({senderUuid: this.$route.params.senderUuid, recipientUuid: this.$route.params.recipientUuid})
          .then(messages => this.messages = messages).then((messages) => this.fillChat(messages))
    },

    getAvatars() {
      if (this.currentRecipient?.userInfo?.avatar) {
        api.getUserAvatar(this.currentRecipient.uuid).then((avatar) => {
          this.recipientAvatar = URL.createObjectURL(new Blob([avatar]));
        });
      } else this.recipientAvatar = require("@/assets/zzz.png");

      if (this.user?.userInfo?.avatar) {
        api.getUserAvatar(this.user.uuid).then((avatar) => {
          this.userAvatar = URL.createObjectURL(new Blob([avatar]));
        });
      } else this.userAvatar = require("@/assets/zzz.png");
    },

    fillChat() {
      if(this.messages !== null) {
        for(let i = 0; i < this.messages.length; i++){
          if(this.messages[i].senderUuid === this.user.uuid)
            this.chat.push({from: 'me', msg: this.messages[i].content})
          if(this.messages[i].senderUuid === this.currentRecipient.uuid)
            this.chat.push({from: 'interlocutor', msg: this.messages[i].content})
        }
      }
      console.log('ЭТО ЧАТ', this.chat)
      this.$nextTick(()=>this.scrollToElement())
    },

    sendMessage(){
      const message = {
        senderUuid: this.user.uuid,
        recipientUuid: this.currentRecipient.uuid,
        senderName: this.user.username,
        recipientName: this.currentRecipient.username,
        content: this.msg,
        timestamp: new Date(),
      };

      sendMessage(message)

      this.chat.push({
        from: "me",
        msg: this.msg
      })
      this.msg = ''

      this.$nextTick(()=>this.scrollToElement())
    },
  }
}
</script>

<style scoped>
.chat{
  height: 60vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar-track {
  background-color: #fff;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
background-color: #ccc;
}
::-webkit-scrollbar {
  width: 6px;
}
</style>