<template lang="pug">
  v-container(style="width: 40%")
    v-row.elevation-6.backgroundColor.mt-4(no-gutters)
      v-col(cols="12")
        v-toolbar.primary(dark)
          v-btn(icon @click="$router.go(-1)")
            v-icon mdi-arrow-left
          v-toolbar-title Профиль пользователя
        div.d-flex.align-center
          div.text-right(style="width: 35%")
            v-avatar.mt-4.mb-4(size="100")
              v-img(:src="interlocutorAvatar")
          div.ml-4.text.text-h5(v-if="(firstName && lastName)") {{firstName}} {{lastName}}
          div.ml-4.text.text-h5(v-else style="display: inline-block;") {{currentRecipient.username}}
        div.mb-1(v-if="(firstName && lastName)").d-flex
          div.text-right.text(style="width: 35%") Электронная почта
          div.ml-4.text-left.text {{currentRecipient.username}}
        div.mb-1.d-flex
          div.text-right.text(style="width: 35%") Пол
          div.ml-4.text-right.text(v-if="gender") {{gender}}
          div.ml-4.text-left.text(v-else) Не указано
        div.mb-1.d-flex
          div.text-right.text(style="width: 35%") Возраст
          div.ml-4.text-right.text(v-if="age") {{age}} {{pluralizedAge}}
          div.ml-4.text-left.text(v-else) Не указано
        div.mb-1.d-flex
          div.text-right.text(style="width: 35%") Город
          div.ml-4.text-left.text(v-if="locality") {{locality}}
          div.ml-4.text-left.text(v-else) Не указано
        div.mb-1.d-flex
          div.text-right.text(style="width: 35%") Интересы
          div.text-left.ml-4.text(v-if="interests.length > 0" style="width: 62%")
            div.mr-2(v-for="(interest, i) in interests" :key="i") {{interest}}
          div.ml-4.text-left.text(v-else) Не указано
        div.mb-1.d-flex
          div.text-right.text(style="width: 35%") Религия
          div.ml-4.text-left.text(v-if="religion") {{religion}}
          div.ml-4.text-left.text(v-else) Не указано
        div.mb-1.d-flex
          div.text-right.text(style="width: 35%") О себе
          div.ml-4.text-left.text(v-if="aboutUser" style="width: 62%") {{aboutUser}}
          div.ml-4.text-left.text(v-else) Не указано
</template>

<script>
import {mapState} from "vuex";
import api from "@/plugins/Api";

export default {
  name: "InterlocutorProfileView",
  data() {
    return {
      firstName: '',
      lastName: '',
      interlocutorAvatar: '',
      gender: '',
      pluralizedAge: '',
      locality: '',
      interests: [],
      religion: '',
      aboutUser: '',
      age: null,

      interestsComponent: [
        {name: "music", title: "Музыка"},
        {name: "art", title: "Искусство"},
        {name: "theatre", title: "Театр"},
        {name: "drawing", title: "Рисование"},
        {name: "cinematic", title: "Кино"},
        {name: "anime", title: "Аниме"},
        {name: "serials", title: "Сериалы"},
        {name: "books", title: "Книги"},
        {name: "table_games", title: "Настольные игры"},
        {name: "computer_games", title: "Компьютерные игры"},
        {name: "active_games", title: "Активные игры"},
        {name: "sport", title: "Спорт"},
        {name: "walking", title: "Прогулки"},
        {name: "healthy_life", title: "Здоровый образ жизни"},
        {name: "cars", title: "Автомобили"},
        {name: "cooking", title: "Кулинария"},
        {name: "dances", title: "Танцы"},
        {name: "studying", title: "Учеба"},
      ],
    }
  },

  mounted(){
    //setTimeout(() => {this.getInterlocutorAvatar(); this.fillForm(); this.findAgeTitle()}, 200)
    this.getInterlocutorAvatar()
    this.fillForm()
    this.findAgeTitle()
    console.log(this.interests)
  },

  computed: {
    ...mapState('user', ['currentRecipient'])
  },

  methods: {
    getInterlocutorAvatar() {
      if (this.currentRecipient?.userInfo?.avatar) {
        api.getUserAvatar(this.currentRecipient.uuid).then((avatar) => {
          this.interlocutorAvatar = URL.createObjectURL(new Blob([avatar]));
        });
      } else this.interlocutorAvatar = require("@/assets/no_avatar.png");
    },
    fillForm() {
      this.firstName = this.currentRecipient.userInfo.firstName
      this.lastName = this.currentRecipient.userInfo.lastName
      this.age = this.currentRecipient.userInfo.age
      this.aboutUser = this.currentRecipient.userInfo.aboutMe
      switch (this.currentRecipient.userInfo.gender) {
        case 'male':
          this.gender = 'Мужской';
          break;
        case 'female':
          this.gender = 'Женский';
          break;
      }
      switch (this.currentRecipient.userInfo.locality) {
        case 'izhevsk':
          this.locality = 'Ижевск';
          break;
        case 'moscow':
          this.locality = 'Москва';
          break;
        case 'saint-petersburg':
          this.locality = 'Санкт-Петербург';
          break;
      }
      switch (this.currentRecipient.userInfo.religion) {
        case 'orthodoxy':
          this.religion = 'Православие';
          break;
        case 'catholicism':
          this.religion = 'Католицизм';
          break;
        case 'protestantism':
          this.religion = 'Протестантизм';
          break;
        case 'judaism':
          this.religion = 'Иудаизм';
          break;
        case 'buddhism':
          this.religion = 'Буддизм';
          break;
        case 'islam':
          this.religion = 'Ислам';
          break;
        case 'hinduism':
          this.religion = 'Индуизм';
          break;
        case 'atheism':
          this.religion = 'Атеизм';
          break;
        case 'agnosticism':
          this.religion = 'Агностицизм';
          break;
      }
      let userInterests = this.currentRecipient.userInfo.interests
      for (let i = 0; i < userInterests.length; i++) {
        for (let j = 0; j < this.interestsComponent.length; j++) {
          if (userInterests[i] === this.interestsComponent[j].name) {
            this.interests.push(this.interestsComponent[j].title)
          }
        }
      }
    },
    findAgeTitle(){
      this.pluralizedAge = this.pluralizeAge()
    },
    pluralizeAge() {
      let age = this.currentRecipient.userInfo.age
      let trueCond = true
      if (age < 10 || age > 20 && age < 100) {
        let rem = age % 10;
        return (rem > 1 && rem < 5) ? "года" : ((rem > 4 || rem === 0) ? "лет" : "год");
      }
      else {
        while(trueCond) {
          age %= 100;
          if (age < 100) break;
        }
        if (age < 10 || age > 20 && age < 100) {
          let rem = age % 10;
          return (rem > 1 && rem < 5) ? "года" : ((rem > 4 || rem === 0) ? "лет" : "год");
        }
        else
          return "лет";
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
</style>