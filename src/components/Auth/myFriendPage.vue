<template>
  <div class="row">
    <div class="col-4" id="listfriend">
      <listFriend
        :targetChat="targetChat"
        @changeTargetChat="targetChat = $event"
        @roomchatlTarget="idChat = $event"
        :innerHeight="innerHeight"
      />
    </div>

    <div class="col-6 offset-1" id="boxchat">
      <boxChat
        v-if="targetChat == true"
        :idChat="idChat"
        :innerHeight="innerHeight"
      />
    </div>
  </div>
</template>

<script>
import listFriend from "./Children/listFriend";

import boxChat from "./Children/boxChat";

export default {
  created() {
    window.onresize = () => {
      this.innerHeight = window.innerHeight;
    };
  },
  data() {
    return {
      targetChat: false,
      idChat: "",
      innerHeight: window.innerHeight,
    };
  },

  components: {
    listFriend,

    boxChat,
  },
  destroyed() {
    this.$store.commit("SOCIAL/setEmailTarget", "");
  },
  updated() {
    document.getElementById("listfriend").style.maxHeight =
      window.innerHeight + "px";
    document.getElementById("boxchat").style.maxHeight =
      window.innerHeight + "px";
  },
};
</script>

<style scoped></style>
