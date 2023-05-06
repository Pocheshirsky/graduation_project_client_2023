<template lang="pug">
  div 
    v-btn(color="primary" @click="showPanel('create')") Создать
    v-btn.ml-4(color="primary" @click="showPanel('showAllUsers')") Список всех пользователей
    
    div.mt-4.ml-10(v-if="createNewUser") Создание нового пользователя
      div.d-flex
        div
          v-text-field(v-model="userform.login" name="login" label="Логин" type="text" :rules="['required']" )
          v-text-field(v-model="userform.password" name="password" label="Пароль" type="text" :rules="['required']" )
          v-text-field(label="Имя" type="text" v-model="firstName")
          v-text-field(label="Фамилия" type="text" v-model="lastName")
          v-text-field(label="Пол" type="text" v-model="gender")
          v-text-field(label="Возраст" type="number" v-model="age")
          v-text-field(label="Город" type="text" v-model="city")
          v-text-field(label="Рост" type="number" v-model="growth")
          v-text-field(label="Интересующий рост" type="number" v-model="interestGrowth")
          v-text-field(label="Цель поиска" type="text" v-model="searchPurpose")
          v-text-field(label="Интересы" type="text" v-model="interests")
        div.ml-5 
          v-text-field(label="Интересующие черты характера" type="text" v-model="interestingCharacterTraits")
          v-text-field(label="Взгляды на семью" type="text" v-model="familyViews")
          v-text-field(label="Религия" type="text" v-model="religion")
          v-text-field(label="Важность религии в паре" type="text" v-model="religionImportance")
          v-text-field(label="Параноик" type="number" v-model="paranoid")
          v-text-field(label="Эпилептоид" type="number" v-model="epileptoid")
          v-text-field(label="Гипертим" type="number" v-model="hypertime")
          v-text-field(label="Истероид" type="number" v-model="hysteroid")
          v-text-field(label="Шизоид" type="number" v-model="schizoid")
          v-text-field(label="Психастеноид" type="number" v-model="psychasthenoid")
          v-text-field(label="Сенситив" type="number" v-model="sensitive")
          v-text-field(label="Гипотим" type="number" v-model="hypothim")
          v-text-field(label="Конформный тип" type="number" v-model="conformalType")
          v-text-field(label="Неустойчивый тип" type="number" v-model="unstableType")
          v-text-field(label="Астеник" type="number" v-model="asthenic")
          v-text-field(label="Лабильный тип" type="number" v-model="labileType")
          v-text-field(label="Циклоид" type="number" v-model="cycloid")
    div.mt-4.ml-10(v-if="showAllUsers") ALL USERS  

    
</template>

<script>

import axios from "axios"

export default {
  name: 'DevPanelView',
  components: {

  },

  data: () => ({
    drawer: false,
    createNewUser:false,
    showAllUsers:false,
    userform: {
      login: "",
      password: "",
    }

  }),

  methods: {
    showPanel(type){
      this.createNewUser = false
      this.showAllUsers = false
      switch(type){
        case "create":
          this.createNewUser = true
          break;
        case "showAllUsers":
          this.showAllUsers = true
          break;
      }
    },
    addUser() {
      axios
          .post('http://localhost:8090/user', {
            login: this.login,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName})
          .then((data) => console.log('успех', data))
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