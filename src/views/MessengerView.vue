<template lang="pug">
  v-container(fill-height)
    v-row(class="justify-center align-center")
      v-col(cols="12" sm="5")
        v-card(class="elevation-12")
          v-toolbar(dark color="primary")
            v-toolbar-title Чаты
          div(v-for="(item, i) in userInterlocutors" :key="userInterlocutors.username")
            chat-selector
            //v-btn(:to="'./chat'" block outlined) Другой пользователь


</template>

<script>
import ChatSelector from "@/components/chatSelector";
import {mapState} from "vuex";
export default {
  name: "MessengerView",
  components: {ChatSelector},
  data(){
    return {
      userInterlocutors: [
        {username: 'test',avatar: 'test',lastMessage: 'test'}
      ]
    }
  },
  mounted() {
    //считать из user список interlocutors, передать в userInterlocutors
  },
  computed: {
    ...mapState('user', ['user'])
  }
}
</script>

<style scoped>

</style>