<template lang="pug">
  v-container(style="width: 40%" fill-height)
    v-row.elevation-6.align-end.mb-4.mt-6(no-gutters class="justify-center align-center")
      v-col(cols="12")
        v-toolbar(dark color="primary")
          v-toolbar-title.text-center Поиск знакомств
        div
          p.text-left.ml-4.mr-4.ma-8 С помощью этого поиска вы сможете найти человека по указанным вами параметрам. Вы также будете соответствовать интересующим параметрам найденного человека, что послужит хорошей почвой для знакомства
          p.text-left.ml-4 Чтобы поиск работал, вам необходимо:
          p.text-left.ml-4 1) пройти тестирование на выраженность акцентуаций характера;
          p.text-left.ml-4 2) заполнить профиль;
          p.text-left.ml-4 3) настроить поиск.
          p.text-left.ml-4.ma-8 После нажатия кнопки "Начать", система начнет подбирать для вас подходящего человека. Как только такой человек будет найден, вам придет уведомление со ссылкой на него, после чего вы сможете начать общение.
        div(align="center")
          v-btn.mb-4(rounded color="primary" :to="'/searching_configuration'") Настроить поиск
        div(align="center")
          v-btn.mb-4(rounded color="primary" @click="startSearching") Начать
</template>

<script>

export default {
  name: "SearchingView",

  methods: {
    startSearching(){
      return null
    }
  }
}
</script>

<style scoped>

</style>