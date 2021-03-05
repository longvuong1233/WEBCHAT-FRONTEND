<template>
  <div id="listchat">
    <v-toolbar color="deep-purple accent-4" dark class="rounded-lg" height="50">
      <v-fab-transition>
        <v-toolbar-title v-show="!isSearch">
          <v-btn icon>
            <v-icon color="deep-orange">
              mdi-comment-plus-outline
            </v-icon>
          </v-btn>

          Chats
        </v-toolbar-title>
      </v-fab-transition>

      <v-fab-transition>
        <v-text-field
          v-show="isSearch"
          hide-details
          prepend-icon="mdi-account-search"
          single-line
        ></v-text-field>
      </v-fab-transition>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="isSearch = !isSearch"
        :color="isSearch == true ? 'red' : 'none'"
      >
        <v-icon>{{ actionToolbar }}</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list class="pl-3" three-line rounded>
      <v-virtual-scroll
        :items="listChat"
        :item-height="80"
        :height="innerHeight - 90"
        class="scrollBar"
      >
        <template v-slot:default="{ item, index }">
          <v-list-item
            :key="index"
            link
            @click="btnChat(item.idchat, item.title)"
            @change="changeTarget(index)"
            :class="{ 'bg-light': index == selectedItem }"
          >
            <v-list-item-avatar>
              <v-img :src="getPhotoURL(item.title)"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>

              <v-list-item-subtitle
                :class="{
                  'text-danger': item.state == 0 && item.owner != getEmail,
                }"
                >{{ checkType(item.type, item.latestMes) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-list>
  </div>
</template>

<script>
import { fb } from "../../../apis/firebase/config";
import { mapGetters } from "vuex";
export default {
  beforeMount() {
    if (this.getAllUsers.length == 0) {
      this.$store.dispatch("SOCIAL/fetchAllUser", this.getIdToken);
    }
    if (this.getMyFriend.length == 0) {
      this.$store.dispatch("SOCIAL/fetchAllFriend", this.getEmail);
    }
  },
  methods: {
    checkType(type, content) {
      if (type == "text") {
        return content;
      } else if (type == "img") {
        return "Sent a picture";
      } else if (type == "video") {
        return "Sent a video";
      }
      return content;
    },
    getPhotoURL(email) {
      for (let i = 0; i < this.getAllUsers.length; i++) {
        if (
          this.getAllUsers[i].photoURL != null &&
          this.getAllUsers[i].email == email
        ) {
          return this.getAllUsers[i].photoURL;
        }
      }
      return this.getDefaultPhotoURL;
    },
    changeTarget(event) {
      this.selectedItem = event;
    },
    btnChat(id, emailTarget) {
      this.$emit("changeIdChat", id);

      this.$store.commit("SOCIAL/setEmailTarget", emailTarget);
    },
  },
  async created() {
    await fb
      .collection("roomchat")
      .where("member", "array-contains", this.getEmail)
      .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
        this.listChat = [];
        querySnapshot.docs.forEach((doc) => {
          let title = "";
          doc.data().member.every((ele) => {
            if (ele != this.getEmail) {
              title = ele;
              return false;
            }
            return true;
          });
          if (doc.data().messages.length != 0) {
            const chat = {
              idchat: doc.id,
              title,
              latestMes: doc.data().messages[doc.data().messages.length - 1]
                .content,
              state: doc.data().messages[doc.data().messages.length - 1].state,
              owner: doc.data().messages[doc.data().messages.length - 1].owner,
              type: doc.data().messages[doc.data().messages.length - 1].type,
            };
            this.listChat.push(chat);
          }
        });
      });
  },
  props: {
    innerHeight: Number,
  },

  data: () => ({
    isSearch: false,
    listChat: [],
    selectedItem: null,
    targetIdChat: "",
  }),

  computed: {
    ...mapGetters("AUTH", [
      "getIdToken",
      "getEmail",
      "getDisplayName",
      "getDefaultPhotoURL",
    ]),
    ...mapGetters("SOCIAL", ["getAllUsers", "getMyFriend"]),
    actionToolbar() {
      return this.isSearch == true ? "mdi-close" : "mdi-magnify";
    },
  },
};
</script>

<style scoped>
.scrollBar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE and Edge */
.scrollBar {
  -ms-overflow-style: none;
}
</style>
