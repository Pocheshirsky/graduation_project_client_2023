<template lang="pug">
  v-container(style="width: 50%" )
    v-row.elevation-6.mb-4.mt-6.align-center.white(no-gutters)
      v-col(cols="auto")
        v-btn.mb-auto(icon @click="$router.go(-1)" x-large color="primary")
          v-icon mdi-arrow-left
      v-col(cols="auto")
        v-avatar.mt-3.mb-3(size="80")
          v-img(:src="avatar")
      v-col(cols="auto")
        div.mb-12
        v-file-input.white--text(hide-input @change="onFileChanged" accept="image/png, image/jpeg" prepend-icon="mdi-pencil")
      v-col(cols="auto")
        p.text-h3.text.mb-auto.ml-4.primary--text(v-model="login") {{ login }}
    v-container.elevation-6.backgroundColor
      .d-flex
        p.text.text-right.mt-6(style="width: 30%") Имя
        v-text-field.text.ml-4.mt-5(
          v-model="userForm.firstName",
          dense,
          style="max-height: 42px"
        )
      .d-flex
        p.text.text-right.mt-2(style="width: 30%") Фамилия
        v-text-field.text.ml-4(
          v-model="userForm.lastName",
          dense,
          style="max-height: 42px"
        )
      .d-flex
        p.text.text-right.mt-4(style="width: 30%") Пол
        v-radio-group.text.ml-4(
          row,
          v-model="userForm.gender",
          style="max-height: 30px",
        )
          v-radio(value="male", label="Мужской" color="primary")
          v-radio(value="female", label="Женский" color="primary")
      .d-flex
        p.text.text-right.mt-2(style="width: 30%") Возраст
        v-text-field.text.ml-4(
          v-model="userForm.age",
          dense,
          type="number",
          style="max-height: 42px"
        )
      .d-flex
        p.text.text-right.mt-1(style="width: 30%") Город
        v-select.text.ml-4(
          v-model="userForm.locality",
          outlined,
          dense,
          style="max-height: 42px",
          :items="localityComp",
          item-value="name",
          item-text="title"
        )
      .d-flex
        p.text.text-right.mt-1(style="width: 30%") Интересы
        v-select.text.ml-4.text-left(
          v-model="userForm.interests",
          multiple,
          outlined,
          dense,
          style="width: 67%",
          :items="interestsComp",
          item-value="name",
          item-text="title",
        )
          //template(v-slot:selection="{ item, index }")
          //  v-chip(v-if="index < 1")
          //    span {{ item.title }}
          //  span.grey--text.text-caption(v-if="index === userForm.interests.length - 2") (+ ещё {{ userForm.interests.length - 2 }})

      .d-flex
        p.text.text-right.mt-1(style="width: 30%") Религия
        v-select.text.ml-4(
          v-model="userForm.religion",
          outlined,
          dense,
          style="max-height: 42px",
          :items="religionComp",
          item-value="name",
          item-text="title"
        )

      .d-flex
        p.text.text-right.mt-1(style="width: 30%") Отношение к курению
        v-select.text.ml-4(
          v-model="userForm.attitudeToSmoking",
          outlined,
          dense,
          style="max-height: 42px",
          :items="attitudeToSmokingComp",
          item-value="name",
          item-text="title"
        )

      .d-flex
        p.text.text-right.mt-1(style="width: 30%") Отношение к алкоголю
        v-select.text.ml-4(
          v-model="userForm.attitudeToAlcohol",
          outlined,
          dense,
          style="max-height: 42px",
          :items="attitudeToAlcoholComp",
          item-value="name",
          item-text="title"
        )

      .d-flex
        p.text.text-right.mt-1(style="width: 30%") О себе
        v-textarea.text.ml-4(v-model="userForm.aboutMe" label="Расскажите о себе" dense counter="100" outlined)

      .justify-center(align="center")
        v-btn.mb-4(color="primary", @click.native="updateProfile" dark rounded) Сохранить изменения
</template>

<script>
import {mapActions, mapState} from "vuex";
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
        interests: [],
        religion: "",
        attitudeToSmoking: "",
        attitudeToAlcohol: "",
        aboutMe: ""
      },
      attitudeToSmokingComp: [
        {name: "positive", title: "Позитивное"},
        {name: "neutral", title: "Нейтральное"},
        {name: "negative", title: "Негативное"},
      ],
      attitudeToAlcoholComp: [
        {name: "positive", title: "Позитивное"},
        {name: "neutral", title: "Нейтральное"},
        {name: "negative", title: "Негативное"},
      ],
      interestsComp: [
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
      localityComp: [
        {name: "izhevsk", title: "Ижевск"},
        {name: "moscow", title: "Москва"},
        {name: "saint-petersburg", title: "Санкт-Петербург"},
      ],
      familyViewComp: [
        {name: "child_free", title: "Без детей"},
        {name: "child_in_far_future", title: "В будущем"},
        {name: "child_in_near_future", title: "В ближайшей перспективе"},
      ],
      religionComp: [
        {name: "orthodoxy", title: "Православие"},
        {name: "catholicism", title: "Католицизм"},
        {name: "protestantism", title: "Протестантизм"},
        {name: "judaism", title: "Иудаизм"},
        {name: "buddhism", title: "Буддизм"},
        {name: "islam", title: "Ислам"},
        {name: "hinduism", title: "Индуизм"},
        {name: "atheism", title: "Атеизм"},
        {name: "agnosticism", title: "Агностицизм"},
      ],
    };
  },

  mounted() {
    setTimeout(() => {
      this.fillUserForm();
      this.loadAvatar();
    }, 100);
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
      } else this.avatar = require("@/assets/no_avatar.png");
    },

    onFileChanged(e) {
      console.log("Размер", e.size)
      console.log("Размер", (2**20)*10)
      console.log(e.size < (2**20)*10)
      console.log(e)
      if(!!e && e.size < (2**20)*10 && (e.type === "image/png" || e.type === "image/jpeg")) {
        let formdata = new FormData();
        formdata.append("file", e);
        api
            .setUserAvatar(formdata)
            .then(() => this.loadAvatar())
            .catch((er) => console.log(er));
      }
      else {
        alert('Ошибка: файл больше 10 Мб или не соответствует форматам .png или .jpg')
        console.log("Размер большой", e.size)
      }
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
.text{
  font-size: 20px;
  color: #1976D2
}
.backgroundColor {
  background-color: white;
}
</style>