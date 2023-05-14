<template lang="pug">
  v-app
    app-header
    v-content
      router-view
</template>

<script>
import AppHeader from "@/components/AppHeader"
import AppFooter from "@/components/AppFooter"
import {mapActions} from 'vuex'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  },

  data: () => ({
    drawer: false,

  }),

  mounted() {
    //this.loginUser()
  },

  methods: {
    ...mapActions('user', ['signIn', 'getAllUsers']),
    //loginUser() {
    //  this.signIn({username: 'admin', password: '123'})
    //}
  }
};
</script>

<style>

</style>
