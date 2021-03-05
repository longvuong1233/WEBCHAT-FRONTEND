<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="500px">
      <v-card>
        <v-card-title>Notification</v-card-title
        ><v-tabs v-model="tab" centered icons-and-text>
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#inform">
            General
            <v-badge
              overlap
              color="green"
              bordered
              :content="getCountIFNS != 0 ? getCountIFNS : '0'"
            >
              <v-icon>mdi-bullhorn</v-icon></v-badge
            >
          </v-tab>

          <v-tab href="#friend">
            Friend Request
            <v-badge
              overlap
              bordered
              color="yellow"
              :content="getCountNFNS != 0 ? getCountNFNS : '0'"
            >
              <v-icon>mdi-baby</v-icon></v-badge
            >
          </v-tab>
        </v-tabs>
        <v-divider></v-divider>
        <v-card-text style="height: 400px;" class="scrollBar"
          ><v-tabs-items v-model="tab"
            ><v-tab-item value="inform">
              <v-list two-line>
                <template v-for="(item, index) in listInform">
                  <v-divider :key="index" v-if="index != 0"></v-divider>

                  <v-list-item
                    :key="item.title"
                    link
                    :class="{ 'bg-success': item.state == 0 }"
                    @click="makeSeenIF(item)"
                  >
                    <v-list-item-avatar>
                      <v-img :src="getPhotoURL(item.from)"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>
                        {{ getName(item.from) }}</v-list-item-title
                      >
                      <v-list-item-subtitle>
                        {{ item.content }}</v-list-item-subtitle
                      >
                    </v-list-item-content>
                    <v-list-item-action
                      ><v-list-item-action-text>{{
                        calTime(item.time)
                      }}</v-list-item-action-text></v-list-item-action
                    >
                  </v-list-item>
                </template>
              </v-list></v-tab-item
            ><v-tab-item value="friend">
              <v-list three-line>
                <template v-for="(item, index) in listMakeFriend">
                  <v-divider :key="index" v-if="index != 0"></v-divider>

                  <v-list-item
                    @click="markSeenMF(item)"
                    :key="index"
                    link
                    class="rounded"
                    :class="{ 'bg-warning': item.state == 0 }"
                  >
                    <v-list-item-avatar>
                      <v-img :src="getPhotoURL(item.email)"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title
                        ><span class="text-primary">{{
                          getName(item.email)
                        }}</span>
                        sent you friend request</v-list-item-title
                      >
                      <v-list-item-subtitle
                        ><v-btn
                          color="success"
                          small
                          @click.stop="
                            acceptMF({ email: item.email, state: item.state })
                          "
                        >
                          Agree
                        </v-btn>
                        <v-btn
                          class="ml-3"
                          color="error"
                          small
                          @click.stop="ignoreMF(item.email)"
                        >
                          Ignore
                        </v-btn></v-list-item-subtitle
                      >
                    </v-list-item-content>
                  </v-list-item>
                </template>
              </v-list></v-tab-item
            >
          </v-tabs-items>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Mark Seen All
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import { fb, firebase } from "../../apis/firebase/config";
import { mapGetters } from "vuex";
import CVTime from "convert-seconds";
export default {
  methods: {
    calTime(time) {
      const temp = (new Date().getTime() - time) / 1000;

      let tm = CVTime(temp.toFixed(0));

      if (tm.hours >= 1) {
        return tm.hours + " " + (tm.hours > 1 ? "hs" : "h");
      } else if (tm.minutes > 0) {
        return (
          tm.minutes +
          " " +
          (tm.minutes > 1 ? "mins" : "min") +
          " " +
          tm.seconds
        );
      }
      return tm.seconds + " s";
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
    makeSeenIF(item) {
      if (item.state == 0) {
        fb.collection("user")
          .doc(this.getEmail)
          .update({
            inform: firebase.firestore.FieldValue.arrayRemove(item),
          });
        fb.collection("user")
          .doc(this.getEmail)
          .update({
            inform: firebase.firestore.FieldValue.arrayUnion({
              ...item,
              state: 2,
            }),
          });
      }
    },
    markSeenMF(item) {
      fb.collection("user")
        .doc(this.getEmail)
        .update({
          queueFriend: firebase.firestore.FieldValue.arrayRemove(item),
        });
      fb.collection("user")
        .doc(this.getEmail)
        .update({
          queueFriend: firebase.firestore.FieldValue.arrayUnion({
            ...item,
            state: 2,
          }),
        });
    },
    acceptMF(infor) {
      fb.collection("user")
        .doc(this.getEmail)
        .update({
          friends: firebase.firestore.FieldValue.arrayUnion(infor.email),
          queueFriend: firebase.firestore.FieldValue.arrayRemove({
            email: infor.email,
            state: infor.state,
          }),
        });
      fb.collection("user")
        .doc(infor.email)
        .update({
          friends: firebase.firestore.FieldValue.arrayUnion(this.getEmail),
        });
    },
    ignoreMF(infor) {
      fb.collection("user")
        .doc(this.getEmail)
        .update({
          queueFriend: firebase.firestore.FieldValue.arrayRemove({
            email: infor.email,
            state: infor.state,
          }),
        });
    },
    getName(email) {
      for (let i = 0; i < this.getAllUsers.length; i++) {
        if (this.getAllUsers[i].email == email) {
          return this.getAllUsers[i].displayName;
        }
      }
      return "none";
    },
  },
  created() {
    fb.collection("user")
      .doc(this.getEmail)
      .onSnapshot((snap) => {
        this.listMakeFriend = [...snap.data().queueFriend];
        this.listInform = [...snap.data().inform];
      });
  },

  props: {
    openDialog: Boolean,
  },
  watch: {
    getCountIFNS(vl) {
      this.$emit("totalIF", vl + this.getCountNFNS);
    },
    getCountNFNS(vl) {
      this.$emit("totalIF", vl + this.getCountIFNS);
    },
  },
  computed: {
    ...mapGetters("AUTH", ["getEmail", "getDefaultPhotoURL"]),
    ...mapGetters("SOCIAL", ["getAllUsers"]),
    getCountIFNS() {
      let countNew = 0;
      this.listInform.forEach((element) => {
        if (element.state == 0) {
          countNew++;
        }
      });

      return countNew;
    },
    getCountNFNS() {
      let countNew = 0;
      this.listMakeFriend.forEach((element) => {
        if (element.state == 0) {
          countNew++;
        }
      });

      return countNew;
    },
    dialog: {
      get() {
        return this.openDialog;
      },
      set(value) {
        this.$emit("changeDialogInform", value);
      },
    },
  },
  data() {
    return {
      dialogm1: "",
      listMakeFriend: [],
      listInform: [],
      tab: null,
    };
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
