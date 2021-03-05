<template>
  <div class="row">
    <div
      id="listchat"
      :class="{
        'col-3': getEmailTarget != '',
        'col-11 mx-4': getEmailTarget == '',
      }"
    >
      <listChats @changeIdChat="idChat = $event" :innerHeight="innerHeight" />
    </div>

    <div class="col-6" id="boxchat" v-show="getEmailTarget != ''">
      <boxChat
        :idChat="idChat"
        @changeCallGear="isCall = $event"
        @listMediaItem="listMedia = $event"
        :innerHeight="innerHeight"
      />
    </div>
    <div class="col-3 " id="detail" v-show="getEmailTarget != ''">
      <keep-alive v-if="isCall == false">
        <detailsUser :listMedia="listMedia" :innerHeight="innerHeight" />
      </keep-alive>
      <chatRoom
        v-if="isCall == true"
        @changeCallGear="isCall = $event"
        :innerHeight="innerHeight"
      />
    </div>
  </div>
</template>

<script>
import listChats from "./Children/listChats";
import boxChat from "./Children/boxChat";
import detailsUser from "./Children/details";
import chatRoom from "./Children/chatRoom";

import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("SOCIAL", ["getEmailTarget"]),
  },
  created() {
    window.onresize = () => {
      this.innerHeight = window.innerHeight;
    };
  },
  data() {
    return {
      idChat: "",
      innerHeight: window.innerHeight,
      isCall: false,
      listMedia: [],
    };
  },
  destroyed() {
    this.$store.commit("SOCIAL/setEmailTarget", "");
  },

  updated() {
    document.getElementById("listchat").style.maxHeight =
      window.innerHeight + "px";
    document.getElementById("boxchat").style.maxHeight =
      window.innerHeight + "px";
    document.getElementById("detail").style.maxHeight =
      window.innerHeight + "px";
  },

  components: {
    listChats,
    boxChat,
    detailsUser,
    chatRoom,
  },
};
</script>

<style scoped></style>
