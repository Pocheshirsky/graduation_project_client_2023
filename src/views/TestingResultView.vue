<template lang="pug">
  v-container(fill-height)
    v-row(class="justify-center align-center")
      v-col(cols="12" sm="5")
        v-card(class="elevation-12")
          v-toolbar(dark color="primary")
            v-toolbar-title Результат тестирования
          v-card-text
            div
              v-simple-table(dense)
                template(v-slot:default)
                  thead
                    tr
                      th.text-center Тип
                      th.text-center Выраженность
                  tbody
                    tr(v-for="(item, i) in characterTypesTitles()" :key="i")
                      td.text-center {{item.title}}
                      td.text-center {{item.result}}
              v-spacer
              div.mt-4(justify="center" align="center")
                v-btn(color="primary" rounded @click="finishForm") Сохранить результат

</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "TestingResultView",
  data(){
    return {
      testingResult: []
    }
  },

  mounted() {
    this.computeTestingResult(this.userAnswersArray)
  },

  computed: {
    ...mapState('user', ['userAnswersArray']),
  },

  methods: {
    computeTestingResult(userAnswers){
      let i = 0
      let n = 104
      let testingResult = Array(13).fill(0)
      for(let k = 0; k < n; k++){
        testingResult[i] = testingResult[i] + parseInt(userAnswers[k])
        i++
        if(i == 13){
          i = 0
        }
      }
      this.testingResult = testingResult
    },

    ...mapMutations('user', ['setTestingResult']),
    finishForm(){
      this.setTestingResult(this.testingResult)
      this.$router.push('/')
    },

    characterTypesTitles(){
      let array = [
        { title: 'Параноик' },
        { title: 'Эпилептоид' },
        { title: 'Гипертим' },
        { title: 'Истероид' },
        { title: 'Шизоид' },
        { title: 'Психастеноид' },
        { title: 'Сенситив' },
        { title: 'Гипотим' },
        { title: 'Конформный тип' },
        { title: 'Неустойчивый тип' },
        { title: 'Астеник' },
        { title: 'Лабильный тип' },
        { title: 'Циклоид' },
      ]
      return array.map((el, i) => {el.result = this.testingResult[i]; return el})
    }
  }
}
</script>

<style scoped>

</style>