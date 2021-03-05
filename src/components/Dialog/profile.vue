<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="800px">
      <v-card>
        <v-card-title>Profile</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 400px;" class="scrollBar">
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">
                General Infor
              </div>
              <v-list-item-title class="headline mb-1">
                {{ getDisplayName }}
              </v-list-item-title>
              <v-list-item-subtitle>{{ getEmail }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-hover v-slot="{ hover }">
              <v-list-item-avatar
                class="rounded-circle"
                tile
                size="80"
                color="grey"
              >
                <v-img class="elevation-6" alt="" :src="getPhotoURL"></v-img>
                <v-expand-transition>
                  <v-btn
                    icon
                    v-if="hover"
                    absolute
                    @click.stop="btnUploadAvt()"
                  >
                    <v-icon color="yellow">mdi-lead-pencil</v-icon>
                  </v-btn>
                </v-expand-transition>
              </v-list-item-avatar></v-hover
            >
          </v-list-item>
          <input type="file" hidden id="upavatar" />
          <v-divider></v-divider>
          <v-carousel
            cycle
            height="200"
            hide-delimiter-background
            show-arrows-on-hover
            v-if="listStatus.length != 0"
          >
            <v-carousel-item v-for="(slide, i) in listStatus" :key="i">
              <v-sheet
                :color="slide.color"
                dark
                class="mx-5"
                height="200"
                :max-height="400"
              >
                <v-card-title>
                  <v-icon large left>
                    mdi-cat
                  </v-icon>
                  <span class="title font-weight-light">{{ getEmail }}</span>
                </v-card-title>

                <v-card-text class="headline font-weight-bold">
                  {{ slide.content }}
                </v-card-text>

                <v-card-actions>
                  <v-list-item class="grow">
                    <v-list-item-avatar color="grey darken-3">
                      <v-img
                        class="elevation-6"
                        alt=""
                        :src="getPhotoURL"
                      ></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{
                        getDisplayName
                      }}</v-list-item-title>
                    </v-list-item-content>

                    <v-row align="center" justify="end">
                      <v-icon class="mr-1">
                        mdi-heart
                      </v-icon>
                      <span class="subheading mr-2">
                        {{ slide.like.length }}
                      </span>
                      <!-- <span class="mr-1">·</span>
                      <v-icon class="mr-1">
                        mdi-share-variant
                      </v-icon>
                      <span class="subheading">45</span> -->
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import { firebase } from "../../apis/firebase/config";
import { fb } from "../../apis/firebase/config";
export default {
  created() {
    fb.collection("user")
      .doc(this.getEmail)
      .onSnapshot((doc) => {
        if (doc.exists) {
          if (doc.data().status != null && doc.data().status.length != 0) {
            const currentTime = new Date().getTime();

            this.listStatus = doc.data().status.filter((ele) => {
              if (ele.expireTime >= currentTime - 24 * 60 * 60 * 1000) {
                return true;
              }
              return false;
            });
          }
        }
      });
  },
  methods: {
    btnUploadAvt() {
      document.getElementById("upavatar").click();
      document
        .getElementById("upavatar")
        .addEventListener("change", this.handleFile, false);
    },
    async handleFile(evt) {
      if (evt.target.files[0] != null) {
        var storageRef = firebase.storage().ref();
        var metadata = {
          contentType: "image/jpeg",
        };

        // Upload the file and metadata
        let date = new Date().getTime();
        await storageRef
          .child(
            this.getEmail +
              "/images/" +
              date +
              "." +
              evt.target.files[0].name.split(".").pop()
          )
          .put(evt.target.files[0], metadata);

        storageRef
          .child(
            this.getEmail +
              "/images/" +
              date +
              "." +
              evt.target.files[0].name.split(".").pop()
          )
          .getDownloadURL()
          .then((url) => {
            this.$store.dispatch("AUTH/setAvatar", {
              token: this.getIdToken,
              url,
            });
            this.$store.commit("AUTH/changePhotoURL", url);
          })
          .catch(function(error) {
            console.log(error);
            // Handle any errors
          });
      }
    },
  },
  props: {
    openDialog: Boolean,
  },
  data() {
    return {
      dialogm1: "",
      listStatus: [],
    };
  },
  computed: {
    ...mapGetters("AUTH", [
      "getIdToken",
      "getEmail",
      "getPhotoURL",
      "getDefaultPhotoURL",
      "getDisplayName",
    ]),
    dialog: {
      get() {
        return this.openDialog;
      },
      set(value) {
        this.$emit("changeDialogProfile", value);
      },
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
