<template lang="pug">
  div(@click="goToChat")
    v-row
      v-col(cols="2")
        v-avatar(size="30")
          v-img(:src="avatar")
      v-col(cols="10")
        p {{recipient.username}}

</template>

<script>
export default {
  name: "chatSelector",
  props: { recipient: Object },
  data() {
    return {
      chatUsername: '',
      avatar: ''
    }
  },

  methods: {
    goToChat(){
      this.$emit('click', this.recipient.uuid)
    }
  }
}
</script>

<style scoped>

</style>