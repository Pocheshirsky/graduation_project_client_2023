<template lang="pug">
  v-container
    div.text-center
      p.text-h2.primary--text() Название
      p.text-h4.primary--text() Описание 1
      p.text-h4.primary--text() Описание 2
      p.text-h4.primary--text() Описание 3
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