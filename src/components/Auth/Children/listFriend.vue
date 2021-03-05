<template>
  <div id="listfriend">
    <v-toolbar
      src="https://picsum.photos/1920/1080?random"
      dark
      class="rounded-lg"
      height="50"
    >
      <v-fab-transition>
        <v-toolbar-title v-show="!isSearch">
          My Friends
        </v-toolbar-title>
      </v-fab-transition>

      <v-fab-transition>
        <v-text-field
          v-show="isSearch"
          v-model="findFriend"
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
        :items="isSearch == false ? getAllInforFriend : listUserBySearch"
        :key="
          isSearch == false ? getAllInforFriend.length : listUserBySearch.length
        "
        :item-height="80"
        class="scrollBar"
        :max-height="innerHeight - 90"
        :height="innerHeight - 90"
      >
        <template v-slot="{ item }">
          <v-list-item link :key="item.email" @click="btnChatGear(item.email)">
            <v-list-item-avatar>
              <v-img
                :alt="`${item.title} avatar`"
                :src="
                  item.photoURL != null ? item.photoURL : getDefaultPhotoURL
                "
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.displayName"></v-list-item-title>
              <v-list-item-subtitle v-text="item.email"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { fb } from "../../../apis/firebase/config";
export default {
  props: { targetChat: Boolean, innerHeight: Number },
  methods: {
    btnChatGear(email) {
      this.$store.commit("SOCIAL/setEmailTarget", email);
      this.gearChat = true;
      this.checkChatRoom(email);
    },
    checkChatRoom(email) {
      fb.collection("roomchat")
        .where("member", "in", [
          [email, this.getEmail],
          [this.getEmail, email],
        ])
        .limit(1)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.docs.length == 0) {
            fb.collection("roomchat")
              .add({
                member: [email, this.getEmail],
                messages: [],
              })
              .then((docRef) => {
                this.$emit("roomchatlTarget", docRef.id);
              });
          } else {
            this.$emit("roomchatlTarget", querySnapshot.docs[0].id);
          }
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });
    },
  },
  beforeMount() {
    if (this.getAllUsers.length == 0) {
      this.$store.dispatch("SOCIAL/fetchAllUser", this.getIdToken);
    }
    this.$store.dispatch("SOCIAL/fetchAllFriend", this.getEmail);
  },
  computed: {
    ...mapGetters("AUTH", [
      "getIdToken",
      "getEmail",
      "getDisplayName",
      "getDefaultPhotoURL",
    ]),
    ...mapGetters("SOCIAL", ["getAllUsers", "getMyFriend", "getEmailTarget"]),
    actionToolbar() {
      return this.isSearch == true ? "mdi-close" : "mdi-account-search";
    },
    getAllInforFriend() {
      return this.getAllUsers.filter((ele) => {
        if (this.getMyFriend.indexOf(ele.email) != -1) {
          return ele;
        }
      });
    },

    gearChat: {
      get() {
        return this.targetChat;
      },
      set(value) {
        this.$emit("changeTargetChat", value);
      },
    },
  },

  data() {
    return {
      isSearch: false,
      findFriend: "",
      listUserBySearch: [],
    };
  },
  watch: {
    findFriend(vl) {
      this.listUserBySearch = this.getAllUsers.filter((ele) => {
        if (ele.email.match(vl) || ele.displayName.match(vl)) {
          return true;
        }
        return false;
      });
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
