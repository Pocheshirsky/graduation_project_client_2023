<template lang="pug">
  v-container(fill-height)
    v-row.justify-center.align-center
      v-col(cols="12" sm="5")
        div.text-center
          p.text-h2.primary--text Система поиска новых знакомств
          p.text-h5.primary--text Доступная, удобная и результативная платформа для поиска новых знакомств
          p.text-h6.primary--text С помощью использования широкого спектра данных вы сможете найти человека, который устраивал бы вас во всём
          v-btn(large rounded color="primary" :to="'/login'") Начать


</template>

<script>

import {mapState} from "vuex";

export default {
  name: "HomeView",
  data(){
    return{
      testingResult: []
    }
  },
  mounted() {
    this.getTestingResult()
  },
  computed: {
    ...mapState('user', ['userTestingResult']),
  },

  methods: {
    getTestingResult(){
      console.log(this.testingResult)
      this.testingResult = this.userTestingResult
    }
  }
}
</script>

<style scoped>

</style>