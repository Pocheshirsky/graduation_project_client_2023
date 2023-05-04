<template lang="pug">
  v-container.elevation-2
    v-container.fill-height(class="chat" ref="chat")
    v-row.fill-height(align="end")
      v-col
        div(v-for="(item, index) in chat" :key="index" :class="['d-flex flex-row align-center my-2', item.from == 'user' ? 'justify-end': null]")
          span(v-if="item.from == 'user'" class="blue--text mr-3") {{ item.msg }}
          v-avatar( :color="item.from == 'user' ? 'indigo': 'red'" size="36")
            span.white--text {{ item.from[0] }}
          span.blue--text.ml-3(v-if="item.from != 'user'") {{ item.msg }}
    v-divider
    v-container.mx-auto.pa-1
        v-row(no-gutters)
          v-col
            div.d-flex.flex-row.align-center
              v-text-field(v-model="msg" placeholder="Type Something" @keypress.enter="send")
              v-btn.ml-4(icon @click="send")
                v-icon mdi-send 
        
</template>

<script>
export default {

  name: "ChatView",
  computed: {
    pageHeight () {
      let scrollHeight = Math.max(
          document.body.scrollHeight, document.documentElement.scrollHeight,
          document.body.offsetHeight, document.documentElement.offsetHeight,
          document.body.clientHeight, document.documentElement.clientHeight
      );
      return scrollHeight
    }
  },
  data() {
    return {
      chat: [
      ],
      msg:""
    }
  },
  methods: {
    scrollToElement() {
    // const el = this.$refs.scrollToMe;
    // console.log(el);
    // if (el) {
    //   el.el.scrollIntoView({behavior: 'smooth'});
    // }
    const el = this.$refs.chat;
    el.scroll(0,el.scrollHeight)
  },
    send(){
      this.chat.push(
          {
            from: "user",
            msg: this.msg
          })
      this.msg =""
      this.addReply()
    },
    addReply(){
      this.chat.push({
        from: "sushant",
        msg: "Hmm"
      })
      this.$nextTick(()=>this.scrollToElement())
      
    }
  }
}
</script>

<style scoped>
.chat{
  height: 80vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>