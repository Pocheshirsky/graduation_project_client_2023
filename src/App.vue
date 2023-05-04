<template lang="pug">
  v-app
    app-header
    v-content
      router-view
    app-footer
</template>

<script>

import AppHeader from "@/components/AppHeader"
import AppFooter from "@/components/AppFooter"
import axios from "axios"

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },

  data: () => ({
    drawer: false,

  }),

  methods: {
    addUser() {
      axios
          .post('http://localhost:8090/user', {firstName: this.firstName, lastName: this.lastName})
          .then((data) => console.log('успех', data))
    },
    getAllUser() {
      axios
          .get('http://localhost:8090/user')
          .then((data) => console.log('успех', data))
    }
  }
};
</script>

<style scoped>

</style>
