<template lang="pug">
  v-container(style="width: 40%")
    v-row.elevation-6.align-end.mb-4.mt-6(no-gutters)
      v-col(cols="3")
        div.ma-4
          v-avatar(size="140")
            v-img(:src="previewImage")
      v-col(cols="1")
        div.ma-4
          v-btn.elevation-4(color="primary" rounded dark :loading="isSelecting" @click="handleFileImport" icon outlined)
            v-icon mdi-pencil
          input(ref="uploader" class="d-none" type="file" @change="onFileChanged")
      v-col(cols="6")
        p.ml-7.primary--text.text-h3(v-model="userForm.login" ) {{userForm.login}}
    v-container.elevation-6
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
        v-text-field.ml-4(v-model="userForm.age" dense type="number" style="max-height: 42px;")
      div.d-flex
        p.text-right.mt-3(style="width: 30%") Город
        v-select.ml-4(v-model="userForm.locality" outlined dense style="max-height: 42px;" :items="localityComp" item-value="name" item-text="title")
      div.d-flex
        p.text-right.mt-3(style="width: 30%") Рост
        v-text-field.ml-4(v-model="userForm.growth" dense type="number" style="max-height: 42px;")
      div.d-flex
        p.text-right.mt-3(style="width: 30%") Интересы
        v-select.ml-4(v-model="userForm.interests" multiple outlined dense style="max-height: 42px;" :items="interestsComp" item-value="name" item-text="title")
      div.d-flex
        p.text-right.mt-3(style="width: 30%") Религия
        v-select.ml-4(v-model="userForm.religion" outlined dense style="max-height: 42px;" :items="religionComp" item-value="name" item-text="title")

      div.justify-center(align="center")
        v-btn.ma-4(color="primary" @click.native="updateProfile") Сохранить изменения
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: 'profile_view',
  data () {
    return {
      loading: false,
      previewImage: null,
      isSelecting: false,

      userForm: {
        login: 'admin',
        firstName: '',
        lastName: '',
        gender: '',
        age: 0,
        locality: '',
        growth: 0,
        interests: [],
        religion: '',
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
      familyViewComp: [
        { name: 'child_free', title: 'Без детей' },
        { name: 'child_in_far_future', title: 'В будущем' },
        { name: 'child_in_near_future', title: 'В ближайшей перспективе' },
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
    }
  },

  mounted() {
    this.fillUserForm()
  },

  methods: {
    ...mapActions('user', ['updateUserInfo']),
    updateProfile(){
      this.updateUserInfo(this.userForm)
      this.fillUserForm()
    },
    handleFileImport() {
      this.isSelecting = true;
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true });
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e =>{
        this.previewImage = e.target.result;
        console.log(this.previewImage);
      };
    },

    fillUserForm(){
      try {
        let info = this.user.userInfo
        this.login = this.user.username
        this.userForm.firstName = info.firstName
        this.userForm.lastName = info.lastName
        this.userForm.gender = info.gender
        this.userForm.age = info.age
        this.userForm.locality = info.locality
        this.userForm.growth = info.growth
        this.userForm.interests = info.interests
        this.userForm.religion = info.religion
      }
      catch (e) {
        console.log('EmptyUserFormException')
      }
    }
  },

  computed: {
    ...mapState('user', ['user'])
  }
}
</script>

<style>

</style>