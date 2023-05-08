<template lang="pug">
  v-container(style="width: 35%")
    v-row.elevation-12.align-end.mb-6.mt-6(no-gutters)
      v-col(cols="4")
        v-avatar.ma-4(size="100")
          img.primary(:src="'/avatars/avatar_' + (userForm.avatar.toLowerCase()) + '.png'")
      v-col(cols="8")
        p.ml-2 Псевдоним
          span.ml-7.text--primary(v-model="userForm.login") {{userForm.login}}

    v-row.align-center.elevation-12.mb-6.mt-6(no-gutters)
      v-col(cols="6")
        p.ma-4.mt-6.text-right Имя
        p.ma-4.text-right Фамилия
        p.ma-4.text-right Пол
        p.ma-4.text-right Возраст
        p.ma-4.text-right Город
        p.ma-4.text-right Рост
        p.ma-4.text-right Интересующий рост
        p.ma-4.text-right Интересы
        p.ma-4.text-right Взгляды на семью
        p.ma-4.text-right Религия
        p.ma-4.text-right Важность религии в паре
      v-col(cols="6")
        v-text-field.mt-7(v-model="userForm.lastName" dense style="max-height: 42px;" type="text") {{userForm.firstName}}
        v-text-field(v-model="userForm.lastName" dense style="max-height: 42px;" type="text") {{userForm.lastName}}
        v-select(outlined dense style="max-height: 42px;")
        v-text-field(dense type="number" style="max-height: 42px;")
        v-select(outlined dense style="max-height: 42px;")
        v-text-field(dense type="number" style="max-height: 42px;")
        v-text-field(dense type="number" style="max-height: 42px;")
        p.ma-4 текст
        v-select(outlined dense style="max-height: 42px;")
        v-select(outlined dense style="max-height: 42px;")
        v-select(outlined dense style="max-height: 42px;")

      div.justify-center(align="center")
        v-btn.ma-4(color="primary" @click.native="updateProfile") Изменить профиль
</template>

<script>
export default {
  pageTitle: 'My Profile',
  data () {
    return {
      loading: false,
      userForm: {
        firstName: 'admin',
        lastName: 'admin',
        login: 'admin',
        avatar: 'MALE_CAUCASIAN_BLOND_BEARD'
      },
    }
  },
  methods: {
    updateProfile(){

    }
  }
}
</script>