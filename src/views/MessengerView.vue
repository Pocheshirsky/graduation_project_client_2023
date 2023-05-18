<template lang="pug">
  v-container(fill-height)
    v-row(class="justify-center align-center")
      v-col(cols="12" sm="5")
        v-card(class="elevation-12")
          v-toolbar(dark color="primary")
            v-toolbar-title Чаты
          div(v-for="(item, i) in userChats" :key="i")
            chat-selector(:recipient="item" @click="test")
            v-divider.primary
            //v-btn(:to="'./chat'" block outlined) Другой пользователь


</template>

<script>
import ChatSelector from "@/components/chatSelector";
import {mapActions, mapState} from "vuex";
export default {
  name: "MessengerView",
  components: {ChatSelector},
  data(){
    return {
      userChats: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.findUserChats(this.user.uuid).then(chats => this.userChats = chats)

    }, 10);
  },
  computed: {
    ...mapState('user', ['user'])
  },
  methods: {
    ...mapActions('user', ['findChatMessages', 'findUserChats']),
    test(recipientUuid) {
      console.log('тест')
      this.$router.push(`/chat/${this.user.uuid}/${recipientUuid}`)
    }
  }
}
</script>

<style scoped>

</style>