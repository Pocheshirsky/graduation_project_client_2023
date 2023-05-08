<template lang="pug">
  v-container(style="width: 40%")
    v-row.elevation-12.align-end.mb-4.mt-6(no-gutters)
      v-col(cols="3")
        v-avatar.ma-4(size="100")
          img.primary
      v-col(cols="7")
        p.ml-2 Псевдоним
          span.ml-7.text--primary(v-model="userForm.login") {{userForm.login}}
    v-container.elevation-12
      div.d-flex
        p.text-right.mt-3(style="width: 30%") Имя
        v-text-field.ml-4(v-model="userForm.firstName" dense style="max-height: 42px;")
      div.d-flex
        p.text-right.mt-3(style="width: 30%") Фамилия
        v-text-field.ml-4(v-model="userForm.lastName" dense style="max-height: 42px;")
      div.d-flex
        p.text-right.mt-5(style="width: 30%") Пол
        v-radio-group.ml-4(row v-model="userForm.gender" style="max-height: 30px;")
          v-radio(value="male" label="Мужской")
          v-radio(value="female" label="Женский")
      div.d-flex
        p.text-right.mt-3(style="width: 30%") Возраст
        v-text-field.ml-4(v-model="userForm.userAge" dense type="number" style="max-height: 42px;")
      div.d-flex
        p.text-right.mt-3(style="width: 30%") Город
        v-select.ml-4(v-model="userForm.locality" outlined dense style="max-height: 42px;")
      div.d-flex
        p.text-right.mt-3(style="width: 30%") Рост
        v-text-field.ml-4(v-model="userForm.growth" dense type="number" style="max-height: 42px;")
      div.d-flex
        p.text-right.mt-3(style="width: 30%") Интересующий рост
        v-text-field.ml-4(v-model="userForm.interestedGrowth" dense type="number" style="max-height: 42px;")
      div.d-flex
        p.text-right.mt-3(style="width: 30%") Интересы
        p.ml-4.mt-3(v-model="userForm.interests.interest") Интерес 1, интерес 2
        v-btn.ml-4(icon outlined color="primary")
          v-icon mdi-pencil
      div.d-flex
        p.text-right.mt-3(style="width: 30%") Взгляд на семью
        v-select.ml-4(v-model="userForm.familyView" outlined dense style="max-height: 42px;")
      div.d-flex
        p.text-right.mt-3(style="width: 30%") Религия
        v-select.ml-4(v-model="userForm.religion" outlined dense style="max-height: 42px;")
      div.d-flex
        p.text-right.mt-3(style="width: 30%") Важность религии в паре
        v-select.ml-4(v-model="userForm.religionImportance" outlined dense style="max-height: 42px;")

      div.justify-center(align="center")
        v-btn.ma-4(color="primary" @click.native="updateProfile") Сохранить изменения
</template>

<script>
export default {
  name: 'profile_view',
  data () {
    return {
      loading: false,
      userForm: {
        login: 'admin',
        firstName: 'admin',
        lastName: 'admin',
        gender: 'male',
        userAge: 25,
        locality: 'Izhevsk',
        growth: 165,
        interestedGrowth: 170,
        interests: [
          { interest: 'music' },
          { interest: 'art' },
          { interest: 'games' }
        ],
        familyView: 'in_the_near_future',
        religion: 'orthodoxy',
        religionImportance: 'important'
      },
    }
  },
  methods: {
    updateProfile(){

    }
  }
}
</script>

<style>

</style>