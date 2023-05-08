<template lang="pug">
  v-dialog(:fullscreen="$vuetify.breakpoint.xs" width="500" transition="dialog-bottom-transition" v-model="show")
    v-card
      v-toolbar(dark color="primary")
        v-btn(icon dark @click="show = false")
          v-icon mdi-close
        v-toolbar-title Выберите фотографию
        v-spacer
      v-layout(row wrap v-if="avatars")
        v-flex.xs4.sm3.d-flex(v-for="avatar in avatars" :key="avatar.id")
          v-card(tile flat class="d-flex")
            v-card-text(class="d-flex")
              v-avatar(size="96" @click="selectAvatar(avatar)" class="avatar-picker-avatar" :class="{ 'current': avatar.id === currentAvatar }")
                img(:src="'/avatars/' + (avatar.path)")
</template>

<script>
export default {
  props: {
    currentAvatar: {
      type: String,
      required: true
    },
    value: Boolean
  },
  async mounted () {
    await this.$store.dispatch('fetchAvatars')
  },
  computed: {
    avatars () {
      return this.$store.state.avatars
    },
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    selectAvatar (avatar) {
      this.$emit('selected', avatar.id)
      this.show = false
    }
  }
}
</script>