<template lang="pug">
  div(@click="goToChat")
    v-row
      v-col(cols="2")
        v-avatar(size="30")
          v-img(:src="avatar")
      v-col(cols="10")
        p {{interlocutorUsername}}
        p {{lastMessage}}
</template>

<script>
export default {
  name: "chatSelector",
  data(){
    return {
      interlocutorUsername: 'admin',
      lastMessage: 'admin',
      avatar: ''
    }
  },
  methods: {
    goToChat(){
      this.$router.push('/chat')
    }
  }
}
</script>

<style scoped>

</style>