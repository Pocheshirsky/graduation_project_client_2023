<template lang="pug">
  v-container(fill-height style="width: 50%")
    v-row(class="justify-center align-center")
      v-col
        v-card.elevation-12
          v-card-text
            v-flex.mb-4
              v-avatar.mr-4(size="200")
                img.primary(:src="'/avatars/avatar_' + (userForm.avatar.toLowerCase()) + '.png'")
              v-btn(@click="openAvatarPicker" color="primary") Изменить фотографию
            v-text-field(v-model="userForm.login" label="Псевдоним")
            v-text-field(v-model="userForm.firstName" label="Имя")
            v-text-field(v-model="userForm.lastName" label="Фамилия")

          v-card-actions.justify-center
            v-btn(color="primary" :loading="loading" @click.native="updateProfile") Сохранить изменения
              v-icon(right dark) mdi-check
      AvatarPicker(v-model="showAvatarPicker" :current-avatar="userForm.avatar" @selected="selectAvatar")
</template>

<script>
import AvatarPicker from '@/components/AvatarPicker'
export default {
  pageTitle: 'My Profile',
  components: { AvatarPicker },
  data () {
    return {
      loading: false,
      userForm: {
        firstName: 'admin',
        lastName: 'admin',
        login: 'admin',
        avatar: 'MALE_CAUCASIAN_BLOND_BEARD'
      },
      showAvatarPicker: false
    }
  },
  methods: {
    openAvatarPicker () {
      this.showAvatarPicker = true
    },
    selectAvatar (avatar) {
      this.form.avatar = avatar
    },
    updateProfile(){

    }
  }
}
</script>