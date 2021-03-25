<template>
  <div id="menu">
    <v-card>
      <v-navigation-drawer permanent expand-on-hover fixed>
        <v-layout column fill-height justify-space-between>
          <v-list>
            <v-list-item class=" px-2">
              <v-speed-dial
                transition="scale-transition"
                v-model="fab"
                direction="right"
              >
                <template v-slot:activator>
                  <v-list-item-avatar
                    color="blue darken-2"
                    dark
                    fab
                    id="avatar"
                  >
                    <v-img v-if="!fab" :src="getPhotoURL"></v-img>
                    <v-icon v-else>
                      mdi-close
                    </v-icon>
                  </v-list-item-avatar>
                </template>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      dark
                      small
                      color="green"
                      v-bind="attrs"
                      v-on="on"
                      @click="openDialogProfile = !openDialogProfile"
                    >
                      <v-icon>mdi-account-edit</v-icon>
                    </v-btn>
                  </template>
                  <span>Profile</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      fab
                      dark
                      small
                      color="red"
                      v-bind="attrs"
                      v-on="on"
                      @click="openDialogConfirm = true"
                    >
                      <v-icon>mdi-logout</v-icon>
                    </v-btn>
                  </template>
                  <span>Logout</span>
                </v-tooltip>
              </v-speed-dial>
            </v-list-item>

            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="title">
                  {{ getDisplayName }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ getEmail }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>

          <v-list nav dense
            ><v-list-item link @click="openDialogInform = !openDialogInform">
              <v-list-item-icon>
                <v-badge
                  :value="totalIFNS == 0 ? false : true"
                  bordered
                  overlap
                  :content="totalIFNS"
                >
                  <v-icon>mdi-mushroom-outline</v-icon></v-badge
                >
              </v-list-item-icon>
              <v-list-item-title>Notification</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="gotoMessagePage">
              <v-list-item-icon
                ><v-badge
                  :value="countMesNS == 0 ? false : true"
                  bordered
                  overlap
                  :content="countMesNS"
                >
                  <v-icon>mdi-message</v-icon></v-badge
                >
              </v-list-item-icon>
              <v-list-item-title>Message</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="openDialogStatus = !openDialogStatus">
              <v-list-item-icon>
                <v-icon>mdi-thought-bubble-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Status</v-list-item-title>
            </v-list-item>
            <v-list-item link @click="gotoListFriendPage">
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>My Friend</v-list-item-title>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list nav dense>
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>mdi-account-settings</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Setting</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-layout>
      </v-navigation-drawer>
      <div id="content">
        <slot></slot>
      </div>
    </v-card>
    <span id="dialogs">
      <CfLogout
        :openDialog="openDialogConfirm"
        @changeOpenDialog="openDialogConfirm = $event"
      />
    </span>
    <span id="inform">
      <notification
        :openDialog="openDialogInform"
        @changeDialogInform="openDialogInform = $event"
        @totalIF="totalIFNS = $event"
      />
    </span>
    <span id="profile">
      <profile
        :openDialog="openDialogProfile"
        @changeDialogProfile="openDialogProfile = $event"
      />
    </span>
    <span id="createStatus">
      <status
        :openDialog="openDialogStatus"
        @changeDialogStatus="openDialogStatus = $event"
      />
    </span>
  </div>
</template>

<script>
import CfLogout from "../../Dialog/confirmLogout";
import notification from "../../Dialog/notification";
import profile from "../../Dialog/profile";
import status from "../../Dialog/postStatus";
import { mapGetters } from "vuex";
import { fb } from "../../../apis/firebase/config";

export default {
  created() {
    fb.collection("roomchat").where("member", "array-contains", this.getEmail).onSnapshot((querySnapshot) => {
      this.countMesNS = 0;
      querySnapshot.docs.forEach((doc) => {
        if (
          doc.exists &&
          doc.data() != null &&
          doc.data().messages.length != 0
        ) {
          if (
            doc.data().messages[doc.data().messages.length - 1].state == 0 &&
            doc.data().messages[doc.data().messages.length - 1].owner !=
              this.getEmail
          ) {
            this.countMesNS++;
          }
        }
      });
    });
  },
  data() {
    return {
      totalIFNS: 0,
      countMesNS: 0,
      openDialogConfirm: false,
      openDialogInform: false,
      openDialogProfile: false,
      openDialogStatus: false,
      fab: false,
    };
  },
  methods: {
    gotoListFriendPage() {
      this.$router.push("/myfriend");
    },
    gotoMessagePage() {
      this.$router.push("/");
    },
  },
  computed: {
    ...mapGetters("AUTH", [
      "getAuth",
      "getDisplayName",
      "getEmail",
      "getPhotoURL",
    ]),
  },
  components: {
    CfLogout,
    notification,
    profile,
    status,
  },
  watch: {
    getAuth(newValue) {
      if (newValue == false) {
        this.$router.push({
          name: "startPage",
        });
      }
    },
  },
};
</script>

<style scoped>
#content {
  margin-left: 60px;
}

#avatar {
  cursor: pointer;
}
</style>
