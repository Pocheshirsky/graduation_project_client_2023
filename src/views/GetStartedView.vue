<template lang="pug">
  v-container(fill-height)
    v-row.justify-center.align-center
      v-col(cols="12" sm="5")
        div.text-center
          p.text-h2.primary--text Система автоматического подбора собеседников
          p.text-h5.primary--text Доступная и удобная платформа для результативного поиска новых знакомств
          p.text-h6.primary--text С помощью использования широкого спектра данных вы сможете найти человека, который устраивал бы вас во всём
          v-btn(large rounded color="primary" :to="'/login'") Начать


</template>

<script>

export default {
  name: "HomeView",

}
</script>

<style scoped>

</style>