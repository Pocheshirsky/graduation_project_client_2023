<template lang="pug">
  v-container.elevation-6.backgroundColor.mt-6(style = "width: 50%")
    v-row.elevation-6.align-center.mb-4()
      v-col(cols="1")
        v-btn(icon @click="$router.go(-1)" x-large)
          v-icon mdi-arrow-left
      v-col(cols="1")
        v-tooltip(bottom)
          template(v-slot:activator="{ on, attrs }")
            v-avatar.hover(size="100" v-bind="attrs" v-on="on" @click="goToInterlocutorProfile")
              v-img(:src="recipientAvatar")
          span Просмотреть профиль
      v-col(cols="7")
        v-tooltip(bottom)
          template(v-slot:activator="{ on, attrs }")
            p.ml-12.text.text-h3.hover.mb-auto(v-bind="attrs" v-on="on" @click="goToInterlocutorProfile") {{recipientFirstName}} {{recipientLastName}}
          span Просмотреть профиль
      v-col(cols="3")
    v-container.fill-height.chat(ref="chat")
      v-row.fill-height(align="end")
        v-col
          div.w-50(v-for="(item, i) in chat" :key="i" :class="['d-flex flex-row align-center my-2', item.from === 'me' ? 'justify-end' : null]")
            span.primary--text.font-weight-bold(v-if="item.from === 'me'") {{ item.msg }}
            span.mr-2(v-if="item.from !== 'me'") {{item.time}}
            v-avatar(size="36" :class="[item.from === 'me' ? 'ml-4' : null]")
              v-img( :src="item.from === 'me' ? userAvatar : recipientAvatar")
              span.white--text {{ item.from[0] }}
            span.primary--text.ml-3.font-weight-bold(v-if="item.from !== 'me'") {{ item.msg }}
            span(v-if="item.from === 'me'") {{item.time}}
    v-divider
    v-container.mx-auto.pa-1
      v-row(no-gutters)
        v-col
          div.d-flex.flex-row.align-center
            v-text-field(v-model="msg" ref="inputMessage" placeholder="Сообщение" @keypress.enter="sendMessage" counter="254")
            v-btn.ml-4(:disabled="disabled" icon @click="sendMessage" x-large)
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
      msg: '',

      recipientFirstName: '',
      recipientLastName: '',
      recipientAvatar: '',
      userAvatar: '',

      userUuid: '',
      recipientUuid: '',

      messages: null
    }
  },

  mounted() {
    this.getRecipientByUuid(this.$route.params.recipientUuid)

    setTimeout(() => {this.getChatMessages(); this.getAvatars()}, 200)
    this.focusInput()
  },

  computed: {
    ...mapState('user', ['user','currentRecipient', 'newMessages']),
    disabled(){
      return !this.msg
    }
  },

  watch: {
    newMessages(array) {
      this.chat.push(...array.filter((el) => el.senderUuid === this.$route.params.recipientUuid)
          .map((el) => { return {from: "interlocutor", msg: el.content, time: new Date(el.timestamp).toLocaleTimeString().slice(0, -3)}} ))
      this.$nextTick(()=>this.scrollToElement())
      if(array.length)
        this.clearNewMessages()
    },
    currentRecipient(newRecipient) {
      if(newRecipient) {
        if(this.currentRecipient.userInfo.firstName) {
          this.recipientFirstName = this.currentRecipient.userInfo.firstName
          this.recipientLastName = this.currentRecipient.userInfo.lastName
        }
        else this.recipientFirstName = this.currentRecipient.username
      }
    }
  },
  methods: {
    ...mapActions('user', ['findChatMessages', 'getRecipientByUuid']),
    ...mapMutations('user', ['clearNewMessages']),

    goToInterlocutorProfile(){
      this.$router.push(`/interlocutor`)
    },

    focusInput() {
      this.$refs.inputMessage.focus();
    },

    scrollToElement() {
      const el = this.$refs.chat
      el.scroll(0, el.scrollHeight)
    },

    getChatMessages(){
      console.log(this.$route.params.senderUuid, this.$route.params.recipientUuid)
      this.findChatMessages({ senderUuid: this.$route.params.senderUuid, recipientUuid: this.$route.params.recipientUuid })
          .then(messages => this.messages = messages).then((messages) => this.fillChat(messages))
    },

    getAvatars() {
      if (this.currentRecipient?.userInfo?.avatar) {
        api.getUserAvatar(this.currentRecipient.uuid).then((avatar) => {
          this.recipientAvatar = URL.createObjectURL(new Blob([avatar]));
        });
      } else this.recipientAvatar = require("@/assets/no_avatar.png");

      if (this.user?.userInfo?.avatar) {
        api.getUserAvatar(this.user.uuid).then((avatar) => {
          this.userAvatar = URL.createObjectURL(new Blob([avatar]));
        });
      } else this.userAvatar = require("@/assets/no_avatar.png");
    },

    fillChat() {
      if(this.messages !== null) {
        for(let i = 0; i < this.messages.length; i++){
          if(this.messages[i].senderUuid === this.user.uuid)
            this.chat.push({from: 'me', msg: this.messages[i].content, time: this.messages[i]?.timestamp?.slice(11, -13)})
          if(this.messages[i].senderUuid === this.$route.params.recipientUuid)
            this.chat.push({from: 'interlocutor', msg: this.messages[i].content, time: this.messages[i].timestamp.slice(11, -13)})
        }
      }
      this.$nextTick(()=>this.scrollToElement())
    },

    sendMessage(){
      let ct = new Date()
      if(this.msg) {
        const message = {
          senderUuid: this.user.uuid,
          recipientUuid: this.$route.params.recipientUuid,
          senderName: this.user.username,
          recipientName: this.currentRecipient.username,
          content: this.msg,
          timestamp: ct.getTime(),
        }
        sendMessage(message)

        this.chat.push({
          from: "me",
          msg: this.msg,
          time: ct.toLocaleTimeString().slice(0, -3)
        })
        this.msg = ''
        this.$nextTick(() => this.scrollToElement())
      }
      else {
        this.focusInput()
      }
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
.backgroundColor{
  background-color: white;
}
.hover:hover{
  -webkit-filter: brightness(90%);
  filter: brightness(90%);
  cursor: pointer;
}
</style>