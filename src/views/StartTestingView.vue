<template lang="pug">
  v-container(fill-height)
    v-row(class="justify-center align-center")
      v-col(cols="12" sm="5")
        v-card(class="elevation-12")
          v-toolbar(dark color="primary")
            v-toolbar-title Тестирование на выраженность акцентуаций характера
          v-card-action
            div.mt-4(justify="center" align="center")
              p.text-left.ml-4.mr-4 Отвечая на утверждения теста, оценивайте степень своего согласия или несогласия.
              v-spacer.mt-4
              p.text-left.ml-4.mr-4 Старайтесь не отвечать «трудно сказать», отдайте предпочтение одному из остальных четырех ответов, соотнеся его со своими привычками, желаниями, поступками.
              v-spacer.mt-4
              p.text-left.ml-4.mr-4 Любое из приведенных утверждений нужно оценивать, исходя из принципа «как правило» и из обычного для вас образа жизни. Ведь все мы время от времени бываем и веселыми, и раздражительными.
            div(justify="center" align="center")
              v-btn.mt-4.mb-4(color="primary" rounded :to="'/testing'") Начать
</template>

<script>
export default {
  name: "StartTestingView"
}
</script>

<style scoped>

</style>