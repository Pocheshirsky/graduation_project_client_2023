<template lang="pug">
v-app
  app-header
  v-content
    router-view
</template>

<script>
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
import { mapActions, mapState } from "vuex";
import { connect } from '@/plugins/Socket.api'

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
  },

  data: () => ({
    drawer: false,
  }),

  mounted() {
    this.getUserInfo()
      .then(() => {
        console.log('123', this.user)
        connect(this.user.uuid)
      }).catch((err)=> console.log(err))
  },

  computed: {
    ...mapState('user', ['user'])
  },

  methods: {
    ...mapActions('user', ['getUserInfo']),
  },
};
</script>

<style>

</style>
