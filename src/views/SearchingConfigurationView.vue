<template lang="pug">
  v-container(style="width: 50%" fill-height)
    v-row.elevation-6(no-gutters class="justify-center align-center")
      v-col(cols="12")
        v-toolbar(dark color="primary")
          v-toolbar-title Настройка поиска
        div.d-flex
          p.text-right.mt-6(style="width: 30%") Цель поиска
          v-select.ml-4.mr-4.mt-4(v-model="configuration.searchTarget" multiple outlined dense style="max-height: 42px;" :items="searchTargetComp" item-value="name" item-text="title")
        div.d-flex
          p.text-right.mt-3(style="width: 30%") Интересующий рост
          v-text-field.ml-4.mr-4(v-model="configuration.interestedGrowth" dense type="number" style="max-height: 42px;")
        div.d-flex
          p.text-right.mt-3(style="width: 30%") Взгляд на семью
          v-select.ml-4.mr-4(v-model="configuration.familyView" outlined dense style="max-height: 42px;" :items="familyViewComp" item-value="name" item-text="title")
        div.d-flex
          p.text-right.mt-3(style="width: 30%") Важность религии в паре
          v-select.ml-4.mr-4(v-model="configuration.religionImportance" outlined dense style="max-height: 42px;" :items="religionImportanceComp" item-value="name" item-text="title")
        div.d-flex
          p.text-right.mt-3(style="width: 30%") Интересующие качества личности
          v-select.ml-4.mr-4(v-model="configuration.personalityQualities" multiple outlined dense :items="personalityQualitiesComp" item-value="name" item-text="title")

        div.justify-center(align="center")
          v-btn.ma-4(color="primary" @click="updateSearchConfiguration") Сохранить изменения
</template>

<script>
export default {
  name: "SearchingConfiguration",
  data(){
    return {
      configuration: {
        searchTarget: '',
        interestedGrowth: null,
        familyView: '',
        religionImportance: '',
        personalityQualities: [],
      },
      familyViewComp: [
        { name: 'child_free', title: 'Без детей' },
        { name: 'child_in_far_future', title: 'В будущем' },
        { name: 'child_in_near_future', title: 'В ближайшей перспективе' },
      ],
      religionImportanceComp: [
        { name: 'important', title: 'Важно' },
        { name: 'not_important', title: 'Не важно' },
      ],
      searchTargetComp: [
        { name: 'relationships', title: 'Отношения'},
        { name: 'friendship', title: 'Дружба'},
        { name: 'communication', title: 'Общение'},
        { name: 'entertainment', title: 'Развлечения'},
      ],
      personalityQualitiesComp: [
        { name: 'neatness', title: 'Аккуратность' },
        { name: 'disorganization', title: 'Неорганизованность' },
        { name: 'energy', title: 'Энергичность' },
        { name: 'fatigue', title: 'Утомляемость' },
        { name: 'extroversion', title: 'Экстраверсия' },
        { name: 'introversion', title: 'Интроверсия' },
        { name: 'authority', title: 'Властность' },
        { name: 'weakness', title: 'Ведомость' },
        { name: 'dependence', title: 'Зависимость' },
        { name: 'independence', title: 'Независимость' },
        { name: 'personal space', title: 'Личное пространство' },
        { name: 'always together', title: 'Всегда вместе' },
        { name: 'seriousness', title: 'Серьезность' },
        { name: 'frivolity', title: 'Несерьезность' },
        { name: 'stability_in_everyday_life', title: 'Стабильность в быту' },
        { name: 'spontaneity', title: 'Спонтанность' },
        { name: 'kindness_to_others', title: 'Доброта к другим' },
        { name: 'coldness_to_others', title: 'Холодность к другим' },
        { name: 'passion', title: 'Страстность' },
        { name: 'restraint', title: 'Сдержанность' },
        { name: 'cheerfulness', title: 'Жизнерадостность' },
        { name: 'melancholy', title: 'Меланхоличность' },
        { name: 'talkativeness', title: 'Разговорчивость' },
        { name: 'taciturnity', title: 'Молчаливость' },
        { name: 'thoroughness', title: 'Основательность' },
        { name: 'love_for_change', title: 'Любовь к переменам' },
        { name: 'vulnerability', title: 'Ранимость' },
        { name: 'party-goer', title: 'Тусовщик' },
        { name: 'stay-at-home', title: 'Домосед' },
      ],
    }
  },
  methods: {
    updateSearchConfiguration() {
      //преобразовать к акцентуациям
      //отправить на сервер
      this.$router.push('/searching')
    }
  }
}
</script>

<style scoped>

</style>