<template lang="pug">
  v-container(style="width: 50%" fill-height)
    v-row.elevation-6.backgroundColor(no-gutters class="justify-center align-center")
      v-col(cols="12")
        v-toolbar(dark color="primary")
          v-btn(icon @click="$router.go(-1)")
            v-icon mdi-arrow-left
          v-toolbar-title Настройка поиска
        div.d-flex
          p.text-right.mt-6.text(style="width: 25%") Цель поиска
          v-select.ml-4.mr-4.mt-4.text(v-model="configuration.searchTarget" outlined dense style="max-height: 42px;" :items="searchTargetComp" item-value="name" item-text="title")
        div.d-flex(v-if="configuration.searchTarget === 'relationships'")
          p.text-right.text(style="width: 25%") Взгляд на семью
          v-select.ml-4.mr-4.text(v-model="configuration.familyView" outlined dense style="max-height: 42px;" :items="familyViewComp" item-value="name" item-text="title")
        div.d-flex(v-if="configuration.searchTarget === 'relationships' || configuration.searchTarget === 'friendship'")
          p.text-right.text(style="width: 25%") Важность религии в паре
          v-select.ml-4.mr-4.text(v-model="configuration.religionImportance" outlined dense style="max-height: 42px;" :items="religionImportanceComp" item-value="name" item-text="title")
        div.d-flex(v-if="configuration.searchTarget === 'relationships'")
          p.text-right.text(style="width: 25%") Интересующие качества личности
          v-select.ml-4.mr-4.text(v-model="configuration.interestedPersonalityQualities" multiple outlined dense :items="personalityQualitiesComp" item-value="name" item-text="title")
        div.text.ml-4.mr-4(v-if="configuration.searchTarget === 'relationships'") Поиск будет проходить по параметрам места жительства, пола, возраста, взглядов на семью, религии и качеств личности. Найдите себе партнера по душе!
        div.text.ml-4.mr-4(v-if="configuration.searchTarget === 'friendship'") Поиск будет проходить по параметрам места жительства, возраста, религии и интересов. Чем больше интересов вы укажете, тем меньше будет совпадений - постарайтесь указать не более 3 интересов. Найдите себе друга и проводите вместе время!
        div.text.ml-4.mr-4(v-if="configuration.searchTarget === 'communication'") Поиск будет проходить только по параметру интересов. Чем больше интересов вы укажете, тем меньше будет совпадений - постарайтесь указать не более 3 интересов. Общайтесь на интересующие вас темы!
        div.text.ml-4.mr-4(v-if="configuration.searchTarget === 'entertainment'") Поиск будет проходить только по параметру интересов. Чем больше интересов вы укажете, тем меньше будет совпадений - постарайтесь указать не более 3 интересов. Найдите развлечение по вашим интересам!
        div.justify-center(align="center")
          v-btn.ma-4(color="primary" @click="updateSearchConfiguration" dark) Сохранить изменения
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "SearchingConfiguration",
  data(){
    return {
      configuration: {
        searchTarget: '',
        familyView: '',
        religionImportance: '',
        interestedCharacterAccentuations: [],
        interestedPersonalityQualities: [],
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
        { name: 'disorganization', title: 'Неряшливость' },
        { name: 'energy', title: 'Энергичность' },
        { name: 'fatigue', title: 'Размеренность' },
        { name: 'extroversion', title: 'Экстраверсия' },
        { name: 'introversion', title: 'Интроверсия' },
        { name: 'authority', title: 'Властность' },
        { name: 'weakness', title: 'Ведомость' },
        { name: 'dependence', title: 'Зависимость' },
        { name: 'independence', title: 'Независимость' },
        { name: 'personal_space', title: 'Личное пространство' },
        { name: 'always_together', title: 'Всегда вместе' },
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

  mounted() {
    setTimeout(() => {
      this.fillConfiguration()
    }, 100)
  },

  computed: {
    ...mapState('user', ['user'])
  },

  methods: {
    ...mapActions('user', ['updateUserInfo']),

    updateSearchConfiguration() {
      this.convertQualitiesToAccentuations()
      let user = {};
      user.uuid = this.user.uuid;
      user.userInfo = this.configuration;
      this.updateUserInfo(user).then(() => this.fillConfiguration());
      this.$router.push('/searching')
    },

    convertQualitiesToAccentuations(){
      let result = Array(13).fill(null);
      try {
        for (let i = 0; i < this.configuration.interestedPersonalityQualities.length; i++) {
          if (this.configuration.interestedPersonalityQualities[i] === 'neatness') {
            result[1] += 1.5;
            result[5] += 1.5;
            result[10] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'disorganization') {
            result[7] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'energy') {
            result[0] += 1.5;
            result[1] += 1.5;
            result[2] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'fatigue') {
            result[4] += 1.5;
            result[5] += 1.5;
            result[7] += 1.5;
            result[10] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'extroversion') {
            result[2] += 1.5;
            result[8] += 1.5;
            result[9] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'introversion') {
            result[4] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'authority') {
            result[0] += 1.5;
            result[1] += 1.5;
            result[7] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'weakness') {
            result[8] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'dependence') {
            result[3] += 1.5;
            result[6] += 1.5;
            result[7] += 1.5;
            result[8] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'independence') {
            result[0] += 1.5;
            result[1] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'personal_space') {
            result[0] += 1.5;
            result[4] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'always_together') {
            result[6] += 1.5;
            result[8] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'seriousness') {
            result[0] += 1.5;
            result[4] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'frivolity') {
            result[1] += 1.5;
            result[2] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'stability_in_everyday_life') {
            result[1] += 1.5;
            result[4] += 1.5;
            result[5] += 1.5;
            result[6] += 1.5;
            result[8] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'spontaneity') {
            result[3] += 1.5;
            result[7] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'kindness_to_others') {
            result[5] += 1.5;
            result[8] += 1.5;
            result[9] += 1.5;
            result[10] += 1.5;
            result[11] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'coldness_to_others') {
            result[0] += 1.5;
            result[1] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'passion') {
            result[1] += 1.5;
            result[3] += 1.5;
            result[10] += 1.5;
            result[11] += 1.5;
            result[12] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'restraint') {
            result[5] += 1.5;
            result[6] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'cheerfulness') {
            result[2] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'melancholy') {
            result[7] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'talkativeness') {
            result[2] += 1.5;
            result[3] += 1.5;
            result[6] += 1.5;
            result[8] += 1.5;
            result[9] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'taciturnity') {
            result[4] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'thoroughness') {
            result[4] += 1.5;
            result[6] += 1.5;
            result[8] += 1.5;
            result[9] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'love_for_change') {
            result[2] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'vulnerability') {
            result[1] += 1.5;
            result[3] += 1.5;
            result[7] += 1.5;
            result[10] += 1.5;
            result[12] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'party-goer') {
            result[3] += 1.5;
          }
          if (this.configuration.interestedPersonalityQualities[i] === 'stay-at-home') {
            result[4] += 1.5;
            result[5] += 1.5;
            result[6] += 1.5;
            result[7] += 1.5;
          }
        }
        for(let i = 0; i < 13; i++){
          result[i] = Math.round(result[i])
        }
      }
      catch (e){
        console.log('EmptyArrayException')
      }
      this.configuration.interestedCharacterAccentuations = result
    },

    fillConfiguration() {
      try {
        this.configuration = Object.assign({}, this.configuration, this.user?.userInfo);
      }
      catch (e) {
        console.log('EmptyInfoException')
      }
    }
  }
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