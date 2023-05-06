<template lang="pug">
  v-container
    div Домашняя страница {{testingResult}}

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