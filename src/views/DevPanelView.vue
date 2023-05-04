<template lang="pug">
  div 
    v-btn(color="primary" @click="showPanel('create')") Создать
    v-btn.ml-4(color="primary" @click="showPanel('showAllUsers')") Список всех пользователей
    v-btn.ml-4(color="primary") Очистить базу данных
    
    div.mt-4.ml-10(v-if="createNewUser") Создание нового пользователя
      div.d-flex
        div
          v-text-field(v-model="userform.login" name="login" label="Логин" type="text" :rules="['required']" )
          v-text-field(v-model="userform.password" name="password" label="Пароль" type="text" :rules="['required']" )
          v-text-field(id="firstName" name="firstName" label="Имя" type="text" )
          v-text-field(id="lastName" name="lastName" label="Фамилия" type="text" )
          v-text-field(id="gender" name="gender" label="Пол" type="text" )
          v-text-field(id="age" name="age" label="Возраст" type="number" )
          v-text-field(id="city" name="city" label="Город" type="text" )
          v-text-field(id="growth" name="growth" label="Рост" type="number" )
          v-text-field(id="interestGrowth" name="interestGrowth" label="Интересующий рост" type="number" )
          v-text-field(id="searchPurpose" name="searchPurpose" label="Цель поиска" type="text" )
          v-text-field(id="interests" name="interests" label="Интересы" type="text" )
        div.ml-5 
          v-text-field(id="interestingCharacterTraits" name="interestingCharacterTraits" label="Интересующие черты характера" type="text" )
          v-text-field(id="familyViews" name="familyViews" label="Взгляды на семью" type="text" )
          v-text-field(id="religion" name="religion" label="Религия" type="text" )
          v-text-field(id="religionImportance" name="religionImportance" label="Важность религии в паре" type="text" )
          v-text-field(id="paranoid" name="paranoid" label="Параноик" type="number" )
          v-text-field(id="epileptoid" name="epileptoid" label="Эпилептоид" type="number" )
          v-text-field(id="hypertime" name="hypertime" label="Гипертим" type="number" )
          v-text-field(id="hysteroid" name="hysteroid" label="Истероид" type="number" )
          v-text-field(id="schizoid" name="schizoid" label="Шизоид" type="number" )
          v-text-field(id="psychasthenoid" name="psychasthenoid" label="Психастеноид" type="number" )
          v-text-field(id="sensitive" name="sensitive" label="Сенситив" type="number" )
          v-text-field(id="hypothim" name="hypothim" label="Гипотим" type="number" )
          v-text-field(id="conformalType" name="conformalType" label="Конформный тип" type="number" )
          v-text-field(id="unstableType" name="unstableType" label="Неустойчивый тип" type="number" )
          v-text-field(id="asthenic" name="asthenic" label="Астеник" type="number" )
          v-text-field(id="labileType" name="labileType" label="Лабильный тип" type="number" )
          v-text-field(id="cycloid" name="cycloid" label="Циклоид" type="number" )
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
    userform:{
      login:"",
      password:"",
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