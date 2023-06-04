<template lang="pug">
  v-container(fill-height)
    v-row.justify-center.align-center
      v-col(cols="12" sm="5")
        div.text-center
          p.text-h2.textColor.font-weight-bold Система автоматического подбора собеседников
          p.text-h5.textColor.font-weight-bold Доступная и удобная платформа для результативного поиска новых знакомств
          p.text-h6.textColor.font-weight-bold С помощью использования широкого спектра данных вы сможете найти человека, который устраивал бы вас во всём
          v-btn(large rounded color="primary" :to="'/login'" dark) Начать


</template>

<script>

export default {
  name: "HomeView",

}
</script>

<style scoped>
.textColor{
  color: #1976D2
}
</style>