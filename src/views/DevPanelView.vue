<template lang="pug">
  div.mt-4.ml-10 Создание нового пользователя

    v-text-field(id="login" name="login" label="Логин" type="text" :rules="['Required']" height="12")
    v-text-field(id="password" name="password" label="Пароль" type="text" :rules="['Required']" height="12")
    v-text-field(id="firstName" name="firstName" label="Имя" type="text" height="12")
    v-text-field(id="lastName" name="lastName" label="Фамилия" type="text" height="12")
    v-text-field(id="gender" name="gender" label="Пол" type="text" height="12")
    v-text-field(id="age" name="age" label="Возраст" type="number" height="12")
    v-text-field(id="city" name="city" label="Город" type="text" height="12")
    v-text-field(id="growth" name="growth" label="Рост" type="number" height="12")
    v-text-field(id="interestGrowth" name="interestGrowth" label="Интересующий рост" type="number" height="12")
    v-text-field(id="searchPurpose" name="searchPurpose" label="Цель поиска" type="text" height="12")
    v-text-field(id="interests" name="interests" label="Интересы" type="text" height="12")
    v-text-field(id="interestingCharacterTraits" name="interestingCharacterTraits" label="Интересующие черты характера" type="text" height="12")
    v-text-field(id="familyViews" name="familyViews" label="Взгляды на семью" type="text" height="12")
    v-text-field(id="religion" name="religion" label="Религия" type="text" height="12")
    v-text-field(id="religionImportance" name="religionImportance" label="Важность религии в паре" type="text" height="12")
    v-text-field(id="paranoid" name="paranoid" label="Параноик" type="number" height="12")
    v-text-field(id="epileptoid" name="epileptoid" label="Эпилептоид" type="number" height="12")
    v-text-field(id="hypertime" name="hypertime" label="Гипертим" type="number" height="12")
    v-text-field(id="hysteroid" name="hysteroid" label="Истероид" type="number" height="12")
    v-text-field(id="schizoid" name="schizoid" label="Шизоид" type="number" height="12")
    v-text-field(id="psychasthenoid" name="psychasthenoid" label="Психастеноид" type="number" height="12")
    v-text-field(id="sensitive" name="sensitive" label="Сенситив" type="number" height="12")
    v-text-field(id="hypothim" name="hypothim" label="Гипотим" type="number" height="12")
    v-text-field(id="conformalType" name="conformalType" label="Конформный тип" type="number" height="12")
    v-text-field(id="unstableType" name="unstableType" label="Неустойчивый тип" type="number" height="12")
    v-text-field(id="asthenic" name="asthenic" label="Астеник" type="number" height="12")
    v-text-field(id="labileType" name="labileType" label="Лабильный тип" type="number" height="12")
    v-text-field(id="cycloid" name="cycloid" label="Циклоид" type="number" height="12")

    v-btn(color="primary") Создать
    v-btn.ml-4(color="primary") Список всех пользователей
    v-btn.ml-4(color="primary") Очистить базу данных
</template>

<script>

import axios from "axios"

export default {
  name: 'DevPanelView',
  components: {

  },

  data: () => ({
    drawer: false,

  }),

  methods: {
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