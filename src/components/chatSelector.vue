<template lang="pug">
  div(@click="goToChat")
    v-row.align-center
      v-col(cols="2")
        v-avatar.ma-4(size="50")
          v-img(:src="recipientAvatar")
      v-col(cols="8" )
        p.text-h4.mb-auto.text() {{recipient.username}}
      v-col(cols="2")
        v-dialog(v-model="dialog")
          template(v-slot:activator="{ on, attrs }")
            v-btn(@click="dialog = true" v-on="on" v-bind="attrs" icon color="red lighten-1" large)
              v-icon mdi-delete
          v-card
            v-card-title(class="text-h5 grey lighten-1") Удалить чат
            v-card-text.mt-2 Это действие приведет не только к удалению чата из списка, но и удалению всех сообщений вашей переписки, в том числе и для вашего собеседника. Вы уверены, что хотите удалить чат?
            v-divider
            v-card-actions
              v-spacer
              v-btn(color="red lighten-1" text @click="deleteChat") Удалить чат
</template>

<script>
import api from "@/plugins/Api";
import {mapMutations, mapState} from "vuex";

export default {
  name: "chatSelector",
  props: { recipient: Object },
  data() {
    return {
      chatUsername: '',
      recipientAvatar: '',
      dialog: false
    }
  },
  mounted() {
    if (this.recipient?.userInfo?.avatar) {
      api.getUserAvatar(this.recipient.uuid).then((avatar) => {
        this.recipientAvatar = URL.createObjectURL(new Blob([avatar]));
      });
    } else this.recipientAvatar = require("@/assets/no_avatar.png");


  },
  computed: {
    ...mapState('user', ['currentRecipient'])
  },
  methods: {
    ...mapMutations('user', ['setCurrentRecipient']),
    goToChat(){
      this.$emit('click', this.recipient.uuid)
      this.setCurrentRecipient(this.recipient)
    },
    deleteChat(){
      this.$emit('chatDelete')
    }
  }
}
</script>

<style scoped>
.text{
  color: #1976D2
}
</style>