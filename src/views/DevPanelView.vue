<template lang="pug">
  div 
    v-btn.ma-4(color="primary" @click="showPanel('createUser')") Создать нового пользователя
    v-btn.ma-4(color="primary" @click="showPanel('showAllUsers')") Список всех пользователей
    v-btn.ma-4(color="primary" @click="showPanel('createChat')") Создать чат для пользователей
    
    div.mt-4.ml-10(v-if="createNewUser") Создание нового пользователя
      div.d-flex
        p.text-right.mt-3(style="width: 20%") Логин
        v-text-field.ml-4(v-model="userForm.login" dense style="max-height: 42px;")
      div.d-flex
        p.text-right.mt-3(style="width: 20%") Пароль
        v-text-field.ml-4(v-model="userForm.password" dense style="max-height: 42px;")
      div.d-flex
        p.text-right.mt-3(style="width: 20%") Имя
        v-text-field.ml-4(v-model="userForm.firstName" dense style="max-height: 42px;")
      div.d-flex
        p.text-right.mt-3(style="width: 20%") Фамилия
        v-text-field.ml-4(v-model="userForm.lastName" dense style="max-height: 42px;")
      div.d-flex
        p.text-right.mt-5(style="width: 20%") Пол
        v-radio-group.ml-4(row v-model="userForm.gender" style="max-height: 30px;")
          v-radio(value="male" label="Мужской")
          v-radio(value="female" label="Женский")
      div.d-flex
        p.text-right.mt-3(style="width: 20%") Возраст
        v-text-field.ml-4(v-model="userForm.userAge" dense type="number" style="max-height: 42px;")
      div.d-flex
        p.text-right.mt-3(style="width: 20%") Город
        v-select.ml-4(v-model="userForm.locality" outlined dense style="max-height: 42px;" :items="localityComp" item-value="name" item-text="title")
      div.d-flex
        p.text-right.mt-3(style="width: 20%") Рост
        v-text-field.ml-4(v-model="userForm.growth" dense type="number" style="max-height: 42px;")
      div.d-flex
        p.text-right.mt-3(style="width: 20%") Интересы
        v-select.ml-4(v-model="userForm.interests" multiple outlined dense style="max-height: 42px;" :items="interestsComp" item-value="name" item-text="title")
      div.d-flex
        p.text-right.mt-3(style="width: 20%") Религия
        v-select.ml-4(v-model="userForm.religion" outlined dense style="max-height: 42px;" :items="religionComp" item-value="name" item-text="title")
      div.d-flex
        p.text-right.mt-4(style="width: 20%") Цель поиска
        v-select.ml-4.mr-4.mt-4(v-model="userForm.searchTarget" multiple outlined dense style="max-height: 42px;" :items="searchTargetComp" item-value="name" item-text="title")
      div.d-flex
        p.text-right.mt-3(style="width: 20%") Интересующий рост
        v-text-field.ml-4.mr-4(v-model="userForm.interestedGrowth" dense type="number" style="max-height: 42px;")
      div.d-flex
        p.text-right.mt-3(style="width: 20%") Взгляд на семью
        v-select.ml-4.mr-4(v-model="userForm.familyView" outlined dense style="max-height: 42px;" :items="familyViewComp" item-value="name" item-text="title")
      div.d-flex
        p.text-right.mt-3(style="width: 20%") Важность религии в паре
        v-select.ml-4.mr-4(v-model="userForm.religionImportance" outlined dense style="max-height: 42px;" :items="religionImportanceComp" item-value="name" item-text="title")
      div.d-flex
        p.text-right.mt-3(style="width: 20%") Выраженность акцентуаций характера
        v-row
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.characterAccentuations[0]" dense type="number" style="max-height: 42px;" label="Параноик")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.characterAccentuations[1]" dense type="number" style="max-height: 42px;" label="Эпилептоид")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.characterAccentuations[2]" dense type="number" style="max-height: 42px;" label="Гипертим")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.characterAccentuations[3]" dense type="number" style="max-height: 42px;" label="Истероид")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.characterAccentuations[4]" dense type="number" style="max-height: 42px;" label="Шизоид")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.characterAccentuations[5]" dense type="number" style="max-height: 42px;" label="Психастеноид")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.characterAccentuations[6]" dense type="number" style="max-height: 42px;" label="Сенситив")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.characterAccentuations[7]" dense type="number" style="max-height: 42px;" label="Гипотим")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.characterAccentuations[8]" dense type="number" style="max-height: 42px;" label="Конформный тип")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.characterAccentuations[9]" dense type="number" style="max-height: 42px;" label="Неустойчивый тип")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.characterAccentuations[10]" dense type="number" style="max-height: 42px;" label="Астеник")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.characterAccentuations[11]" dense type="number" style="max-height: 42px;" label="Лабильный тип")
        v-text-field.ml-4.mr-4(v-model="userForm.characterAccentuations[12]" dense type="number" style="max-height: 42px;" label="Циклоид")
      div.d-flex
        p.text-right.mt-3(style="width: 20%") Интересующие акцентуации характера
        v-row
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.interestedCharacterAccentuations[0]" dense type="number" style="max-height: 42px;" label="Параноик")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.interestedCharacterAccentuations[1]" dense type="number" style="max-height: 42px;" label="Эпилептоид")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.interestedCharacterAccentuations[2]" dense type="number" style="max-height: 42px;" label="Гипертим")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.interestedCharacterAccentuations[3]" dense type="number" style="max-height: 42px;" label="Истероид")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.interestedCharacterAccentuations[4]" dense type="number" style="max-height: 42px;" label="Шизоид")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.interestedCharacterAccentuations[5]" dense type="number" style="max-height: 42px;" label="Психастеноид")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.interestedCharacterAccentuations[6]" dense type="number" style="max-height: 42px;" label="Сенситив")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.interestedCharacterAccentuations[7]" dense type="number" style="max-height: 42px;" label="Гипотим")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.interestedCharacterAccentuations[8]" dense type="number" style="max-height: 42px;" label="Конформный тип")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.interestedCharacterAccentuations[9]" dense type="number" style="max-height: 42px;" label="Неустойчивый тип")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.interestedCharacterAccentuations[10]" dense type="number" style="max-height: 42px;" label="Астеник")
          v-col(cols="1")
            v-text-field.ml-4(v-model="userForm.interestedCharacterAccentuations[11]" dense type="number" style="max-height: 42px;" label="Лабильный тип")
        v-text-field.ml-4.mr-4(v-model="userForm.interestedCharacterAccentuations[12]" dense type="number" style="max-height: 42px;" label="Циклоид")
      div.justify-center(align="center")
        v-btn.ma-4(color="primary" @click.native="addUser") Создать
    div.mt-4.ml-10(v-if="showAllUsers") Список всех пользователей
    div.mt-4.ml-10(v-if="createChat") Создание чата

    
</template>

<script>

import axios from "axios"
import {mapActions, mapState} from "vuex";

export default {
  name: 'DevPanelView',
  components: {

  },

  data: () => ({
    drawer: false,
    createNewUser:false,
    showAllUsers:false,
    createChat:false,
    userForm: {
      login: '',
      password: '',
      firstName: '',
      lastName: '',
      gender: '',
      userAge: null,
      locality: '',
      growth: null,
      interestedGrowth: null,
      interests: [],
      familyView: '',
      religion: '',
      religionImportance: '',
      searchTarget: '',
      characterAccentuations: [],
      interestedCharacterAccentuations: [],
    },
    interestsComp: [
      { name: 'music', title: 'Музыка' },
      { name: 'art', title: 'Искусство' },
      { name: 'cinematic', title: 'Кино' },
      { name: 'books', title: 'Книги' },
      { name: 'games', title: 'Игры' },
    ],
    localityComp: [
      { name: 'izhevsk', title: 'Ижевск' },
      { name: 'moscow', title: 'Москва' },
      { name: 'saint-petersburg', title: 'Санкт-Петербург' },
    ],
    religionComp: [
      { name: 'orthodoxy', title: 'Православие' },
      { name: 'catholicism', title: 'Католицизм' },
      { name: 'protestantism', title: 'Протестантизм' },
      { name: 'judaism', title: 'Иудаизм' },
      { name: 'buddhism', title: 'Буддизм' },
      { name: 'islam', title: 'Ислам' },
      { name: 'hinduism', title: 'Индуизм' },
      { name: 'atheism', title: 'Атеизм' },
      { name: 'agnosticism', title: 'Агностицизм' },
    ],
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
  }),

  computed:{
    ...mapState('user', ['user']),
  },

  methods: {
    showPanel(type){
      this.createNewUser = false
      this.showAllUsers = false
      switch(type){
        case "createUser":
          this.createNewUser = true
          break;
        case "showAllUsers":
          this.showAllUsers = true
          break;
        case "createChat":
          this.createChat = true
          break;
      }
    },

    ...mapActions('user', ['signUp','getAllUsers', 'updateUserInfo']),
    addUser() {
      if(this.login !== '' || this.password !== '') {
        this.signUp({username: this.userForm.login, password: this.userForm.password})
        this.updateUserInfo({
          firstName: this.userForm.firstName,
          lastName: this.userForm.lastName,
          gender: this.userForm.gender,
          age: this.userForm.userAge,
          locality: this.userForm.locality,
          growth: this.userForm.growth,
          interestedGrowth: this.userForm.interestedGrowth,
          interests: this.userForm.interests,
          familyView: this.userForm.familyView,
          religion: this.userForm.religion,
          religionImportance: this.userForm.religionImportance,
          searchTarget: this.userForm.searchTarget,
          characterAccentuations: this.userForm.characterAccentuations,
          interestedCharacterAccentuations: this.userForm.interestedCharacterAccentuations,})
      } else console.log("Нет логина и пароля")
    },
    getAllUser() {
      axios
          .get('http://localhost:8090/user')
          .then((data) => console.log('успех', data))
    }
  }
};
</script>

<style scoped>
.v-text-field{
  width: 400px;
}
</style>