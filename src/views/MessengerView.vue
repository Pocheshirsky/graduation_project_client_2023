<template lang="pug">
  v-container(fill-height)
    v-row.justify-center.align-center
      v-col(cols="12" sm="5")
        v-card.elevation-12
          v-toolbar(dark color="primary")
            v-btn(icon @click="$router.go(-1)")
              v-icon mdi-arrow-left
            v-toolbar-title Чаты
          div(v-for="(item, i) in userChats" :key="i")
            v-tooltip(bottom)
              template(v-slot:activator="{ on, attrs }")
                chat-selector.hover(:recipient="item" @click="selectChat" v-on="on" v-bind="attrs" @chatDelete="onChatDelete(item)")
              span Перейти к чату
            v-divider(color="#BDBDBD")
          div.pa-4(v-if="!userChats.length") У вас пока нет активных чатов - найдите новое знакомство!
          div.pa-4.btn(v-if="!userChats.length")
            v-btn(@click="goToSearching" color="primary") Поиск знакомств
</template>

<script>
import ChatSelector from "@/components/chatSelector";
import {mapActions, mapState} from "vuex";
export default {
  name: "MessengerView",
  components: { ChatSelector },

  data(){
    return {
      userChats: [],
    }
  },

  mounted() {
    if(this.user)
      this.findUserChats(this.user.uuid).then(chats => this.userChats = chats)
  },

  watch: {
    user(value) {
      this.findUserChats(value.uuid).then(chats => this.userChats = chats)
    }
  },

  computed: {
    ...mapState('user', ['user'])
  },

  methods: {
    ...mapActions('user', ['deleteChat','findChatMessages', 'findUserChats']),
    selectChat(recipientUuid) {
      this.$router.push(`/chat/${this.user.uuid}/${recipientUuid}`)
    },

    goToSearching(){
      this.$router.push(`/searching`)
    },

    onChatDelete(recipient){
      this.deleteChat({userUuid: this.user.uuid, recipientUuid: recipient.uuid})
          .then(() => this.findUserChats(this.user.uuid).then(chats => this.userChats = chats))
    }
  }
}
</script>

<style scoped>
.btn{
  margin: auto;
  width: 50%;
}
.backgroundColor{
  background-color: white
}
.hover:hover{
  -webkit-filter: brightness(90%);
  filter: brightness(90%);
  cursor: pointer;
}
</style>