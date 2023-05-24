<template lang="pug">
  div(@click="goToChat")
    v-row(justify="center" style="align-items: baseline")
      v-col(cols="3")
        v-avatar.ma-4(size="50")
          v-img(:src="recipientAvatar")
      v-col(cols="9" )
        p.text-h4.primary--text() {{recipient.username}}

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
      recipientAvatar: ''
    }
  },
  mounted() {
    if (this.recipient?.userInfo?.avatar) {
      api.getUserAvatar(this.recipient.uuid).then((avatar) => {
        this.recipientAvatar = URL.createObjectURL(new Blob([avatar]));
      });
    } else this.recipientAvatar = require("@/assets/zzz.png");
  },
  computed: {
    ...mapState('user', ['currentRecipient'])
  },
  methods: {
    ...mapMutations('user', ['setCurrentRecipient']),
    goToChat(){
      this.$emit('click', this.recipient.uuid)
      this.currentRecipient = this.setCurrentRecipient(this.recipient)
    }
  }
}
</script>

<style scoped>

</style>