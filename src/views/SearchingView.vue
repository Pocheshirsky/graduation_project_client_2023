<template lang="pug">
  v-container(style="width: 60%" fill-height)
    v-row.elevation-6.align-end.mb-4.mt-6.backgroundColor(no-gutters class="justify-center align-center")
      v-col(cols="12")
        v-toolbar(dark color="primary")
          v-btn(icon @click="$router.go(-1)")
            v-icon mdi-arrow-left
          v-toolbar-title.text-center Поиск знакомств
        div
          p.text.text-left.ml-4.mr-4.ma-8 С помощью этого поиска вы сможете найти человека по указанным вами параметрам. Вы также будете соответствовать интересующим параметрам найденного человека, что послужит хорошей почвой для знакомства
          p.text.text-left.ml-4 Чтобы поиск предложил вам самого подходящего кандидата на знакомство, вам необходимо:
          p.text.text-left.ml-4 1) пройти тестирование на выраженность акцентуаций характера;
          p.text.text-left.ml-4 2) полностью заполнить профиль;
          p.text.text-left.ml-4 3) полностью настроить поиск.
          p.text.text-left.ml-4.ma-8 Если вы не указали какие-либо параметры, поиск предложит вам людей, которые не указали те же самые параметры.
          p.text.text-left.ml-4.ma-8 После нажатия кнопки "Начать", система начнет подбирать для вас подходящего человека. Как только такой человек будет найден, вам придет уведомление со ссылкой на него, после чего вы сможете начать общение.
        div(align="center")
          v-btn.mb-4(rounded color="primary" :to="'/searching_configuration'" dark) Настроить поиск
        div(align="center")
          v-btn.mb-4(rounded color="primary" @click="startSearching" dark) Начать
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "SearchingView",

  methods: {
    ...mapActions('user',['putUserInSearchingPool']),
    startSearching(){
      this.putUserInSearchingPool()
    }
  },


}
</script>

<style scoped>
.text{
  font-size: 20px;
  color: #1976D2
}
.backgroundColor{
  background-color: white
}
</style>