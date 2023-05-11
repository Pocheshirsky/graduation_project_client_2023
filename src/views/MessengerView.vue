<template lang="pug">
  v-container(fill-height)
    v-row(class="justify-center align-center")
      v-col(cols="12" sm="5")
        v-card(class="elevation-12")
          v-toolbar(dark color="primary")
            v-toolbar-title Чаты
          div()
            v-btn(:to="'./chat'" block outlined) Другой пользователь
            v-btn(:to="'./chat'" block ) Другой пользователь
            v-btn(:to="'./chat'" block outlined) Другой пользователь
            v-btn(:to="'./chat'" block ) Другой пользователь
            v-btn(:to="'./chat'" block outlined) Другой пользователь

</template>

<script>

export default {
  name: "MessengerView",

}
</script>

<style scoped>

</style>