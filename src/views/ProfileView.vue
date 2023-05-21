<template lang="pug">
v-container(style="width: 40%")
  v-row.elevation-6.align-end.mb-4.mt-6(no-gutters)
    v-col(cols="3")
      .ma-4
        v-avatar(size="140")
          v-img(:src="avatar", contain)
    v-col(cols="1")
      v-file-input.ma-4(
        hide-input,
        prepend-icon="mdi-pencil",
        @change="onFileChanged",
        accept="image/png, image/jpeg"
      )
    v-col(cols="6")
      p.ml-7.primary--text.text-h3(v-model="login") {{ login }}
  v-container.elevation-6
    .d-flex
      p.text-right.mt-3(style="width: 30%") Имя
      v-text-field.ml-4(
        v-model="userForm.firstName",
        dense,
        style="max-height: 42px"
      )
    .d-flex
      p.text-right.mt-3(style="width: 30%") Фамилия
      v-text-field.ml-4(
        v-model="userForm.lastName",
        dense,
        style="max-height: 42px"
      )
    .d-flex
      p.text-right.mt-5(style="width: 30%") Пол
      v-radio-group.ml-4(
        row,
        v-model="userForm.gender",
        style="max-height: 30px"
      )
        v-radio(value="male", label="Мужской")
        v-radio(value="female", label="Женский")
    .d-flex
      p.text-right.mt-3(style="width: 30%") Возраст
      v-text-field.ml-4(
        v-model="userForm.age",
        dense,
        type="number",
        style="max-height: 42px"
      )
    .d-flex
      p.text-right.mt-3(style="width: 30%") Город
      v-select.ml-4(
        v-model="userForm.locality",
        outlined,
        dense,
        style="max-height: 42px",
        :items="localityComp",
        item-value="name",
        item-text="title"
      )
    .d-flex
      p.text-right.mt-3(style="width: 30%") Рост
      v-text-field.ml-4(
        v-model="userForm.growth",
        dense,
        type="number",
        style="max-height: 42px"
      )
    .d-flex
      p.text-right.mt-3(style="width: 30%") Интересы
      v-select.ml-4(
        v-model="userForm.interests",
        multiple,
        outlined,
        dense,
        style="max-height: 42px",
        :items="interestsComp",
        item-value="name",
        item-text="title"
      )
        //template(v-slot:selection="{ item, index }")
        //  v-chip(v-if="index < 1")
        //    span {{ item.title }}
        //  span.grey--text.text-caption(v-if="index === userForm.interests.length - 2") (+ ещё {{ userForm.interests.length - 2 }})

    .d-flex
      p.text-right.mt-3(style="width: 30%") Религия
      v-select.ml-4(
        v-model="userForm.religion",
        outlined,
        dense,
        style="max-height: 42px",
        :items="religionComp",
        item-value="name",
        item-text="title"
      )

    .justify-center(align="center")
      v-btn.ma-4(color="primary", @click.native="updateProfile") Сохранить изменения
</template>

<script>
import { mapActions, mapState } from "vuex";
import api from "@/plugins/Api";

export default {
  name: "profile_view",
  data() {
    return {
      loading: false,
      previewImage: null,
      login: "",
      avatar: "",
      userForm: {
        firstName: "",
        lastName: "",
        gender: "",
        age: 0,
        locality: "",
        growth: 0,
        interests: [],
        religion: "",
      },
      interestsComp: [
        { name: "music", title: "Музыка" },
        { name: "art", title: "Искусство" },
        { name: "cinematic", title: "Кино" },
        { name: "books", title: "Книги" },
        { name: "games", title: "Игры" },
      ],
      localityComp: [
        { name: "izhevsk", title: "Ижевск" },
        { name: "moscow", title: "Москва" },
        { name: "saint-petersburg", title: "Санкт-Петербург" },
      ],
      familyViewComp: [
        { name: "child_free", title: "Без детей" },
        { name: "child_in_far_future", title: "В будущем" },
        { name: "child_in_near_future", title: "В ближайшей перспективе" },
      ],
      religionComp: [
        { name: "orthodoxy", title: "Православие" },
        { name: "catholicism", title: "Католицизм" },
        { name: "protestantism", title: "Протестантизм" },
        { name: "judaism", title: "Иудаизм" },
        { name: "buddhism", title: "Буддизм" },
        { name: "islam", title: "Ислам" },
        { name: "hinduism", title: "Индуизм" },
        { name: "atheism", title: "Атеизм" },
        { name: "agnosticism", title: "Агностицизм" },
      ],
    };
  },

  mounted() {
    setTimeout(() => {
      this.fillUserForm();
      this.loadAvatar();
    }, 10);
  },

  methods: {
    ...mapActions("user", ["updateUserInfo"]),

    updateProfile() {
      let user = {};
      // if(this.login)
      //       user.username =  this.login
      user.uuid = this.user.uuid;
      user.userInfo = this.userForm;
      this.updateUserInfo(user).then(() => this.fillUserForm());
    },

    loadAvatar() {
      if (this.user?.userInfo?.avatar) {
        api.getUserAvatar(this.user.uuid).then((avatar) => {
          this.avatar = URL.createObjectURL(new Blob([avatar]));
        });
      } else this.avatar = require("@/assets/zzz.png");
    },

    onFileChanged(e) {
      let formdata = new FormData();
      formdata.append("file", e);
      api
        .setUserAvatar(formdata)
        .then(() => this.loadAvatar())
        .catch((er) => console.log(er));
    },

    fillUserForm() {
      this.login = this.user.username;
      this.userForm = Object.assign({}, this.userForm, this.user?.userInfo);
    },
  },

  computed: {
    ...mapState("user", ["user"]),
  },
};
</script>

<style>
</style>