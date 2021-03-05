<template>
  <div>
    <v-toolbar color="white" light class="rounded-lg " height="50">
      <v-btn icon>
        <v-icon
          @mouseover="hoverDetail($event)"
          @mouseleave="mouseOutDetail($event)"
          @click="tab = 'detail'"
          :color="tab == 'detail' ? '#1B5E' : ''"
          >mdi-account-circle</v-icon
        >
      </v-btn>
      <v-btn icon>
        <v-icon
          @mouseover="hoverAlbum($event)"
          @mouseleave="mouseOutAlbum($event)"
          @click="tab = 'album'"
          :color="tab == 'album' ? '#eb34de' : ''"
          >mdi-image-multiple</v-icon
        >
      </v-btn>
      <v-spacer></v-spacer>
    </v-toolbar>
    <span v-if="tab == 'detail'">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">General Infor</div>
          <v-list-item-title class="headline mb-1">
            {{ user.displayName }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar class="rounded-circle" tile size="80" color="grey">
          <v-img :src="user.photoURL"></v-img>
        </v-list-item-avatar>
      </v-list-item>
      <v-divider></v-divider>

      <v-carousel
        cycle
        height="300"
        hide-delimiter-background
        show-arrows-on-hover
        v-if="listStatus.length != 0"
        :key="listStatus.length"
      >
        <v-carousel-item v-for="(slide, i) in listStatus" :key="i">
          <v-sheet
            :color="slide.color"
            dark
            class="mx-5"
            height="500"
            :max-height="600"
          >
            <v-card-title>
              <v-icon large left>
                mdi-cat
              </v-icon>
              <span class="title font-weight-light">{{
                user.displayName
              }}</span>
            </v-card-title>

            <v-card-text class="headline font-weight-bold">
              {{ slide.content }}
            </v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <v-row align="center" justify="center">
                  <v-btn icon @click="btnLikeStatus(i)"
                    ><v-icon
                      class="mr-1"
                      :color="
                        slide.like.indexOf(getEmail) != -1 ? 'red' : 'white'
                      "
                    >
                      mdi-heart
                    </v-icon>
                    <span class="subheading mr-2">
                      {{ slide.like.length }}
                    </span></v-btn
                  >
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
    </span>
    <span v-else
      ><div class="overline text-center mt-5">Albums</div>

      <v-row id="listMedia" class="scrollBar ml-3">
        <v-col
          v-for="(item, index) in listMedia"
          :key="index"
          class="d-flex child-flex"
          cols="5"
        >
          <span v-if="item.type == 'img'"
            ><v-img
              @click="downloadImage(item.content, item.nameFile)"
              style="cursor:pointer"
              :src="item.content"
              aspect-ratio="1"
              class="grey lighten-2 "
              max-height="120px"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template> </v-img
          ></span>
          <span v-else-if="item.type == 'video'">
            <Media
              kind="video"
              :src="item.content"
              :controls="true"
              class="grey lighten-2"
              style="max-height:150px;max-width:120px;"
          /></span>
        </v-col> </v-row
    ></span>
  </div>
</template>

<script>
import { fb, firebase } from "../../../apis/firebase/config";
import { mapGetters } from "vuex";
import Media from "@dongido/vue-viaudio";
import axios from "axios";
export default {
  props: {
    listMedia: Array,
  },
  data() {
    return {
      user: {},
      listStatus: [],
      tab: "detail",
      listenDataStatus: null,
      informTarget: [],
    };
  },
  computed: {
    ...mapGetters("SOCIAL", ["getEmailTarget", "getAllUsers"]),
    ...mapGetters("AUTH", ["getDefaultPhotoURL", "getEmail"]),
  },
  created() {
    if (this.getEmailTarget != "") {
      this.findUserByEmail(this.getEmailTarget);
      this.getAllStatus(this.getEmailTarget);
    }
  },
  watch: {
    getEmailTarget(vl) {
      if (vl != "") {
        this.findUserByEmail(vl);
        this.getAllStatus(vl);
      }
    },
  },
  methods: {
    downloadImage(url, nameFile) {
      axios({ url, method: "GET", responseType: "blob" }).then((res) => {
        let fileUrl = window.URL.createObjectURL(new Blob([res.data]));
        let fileLink = document.createElement("a");

        fileLink.href = fileUrl;
        fileLink.setAttribute("download", nameFile);
        document.body.appendChild(fileLink);
        fileLink.click();
      });
    },
    getAllStatus(emailTarget) {
      if (this.listenDataStatus != null) {
        this.listenDataStatus();
      }
      this.listenDataStatus = fb
        .collection("user")
        .doc(emailTarget)
        .onSnapshot({ includeMetadataChanges: true }, (doc) => {
          if (doc.exists) {
            if (doc.data().inform != null && doc.data().inform.length != 0) {
              this.informTarget = doc.data().inform;
            }
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
    checkInformEixst(email, indexStatus) {
      for (let i = 0; i < this.informTarget.length; i++) {
        if (
          this.informTarget[i].from == email &&
          this.informTarget[i].indexStatus == indexStatus
        ) {
          return i;
        }
      }
      return -1;
    },
    btnLikeStatus(index) {
      let find = this.listStatus[index].like.indexOf(this.getEmail);
      const indexIF = this.checkInformEixst(this.getEmail, index);
      if (find != -1) {
        this.listStatus[index].like.splice(find, 1);
        if (indexIF != -1) {
          fb.collection("user")
            .doc(this.getEmailTarget)
            .update({
              inform: firebase.firestore.FieldValue.arrayRemove(
                this.informTarget[indexIF]
              ),
            });
        }
      } else {
        this.listStatus[index].like.push(this.getEmail);

        if (indexIF == -1) {
          fb.collection("user")
            .doc(this.getEmailTarget)
            .update({
              inform: firebase.firestore.FieldValue.arrayUnion({
                from: this.getEmail,
                indexStatus: index,
                content: "Like Your Status",
                state: 0,
                time: new Date().getTime(),
              }),
            });
        }
      }
      fb.collection("user")
        .doc(this.getEmailTarget)
        .update({
          status: this.listStatus,
        });
    },
    findUserByEmail(vl) {
      for (let i = 0; i < this.getAllUsers.length; i++) {
        if (this.getAllUsers[i].email === vl) {
          this.user = this.getAllUsers[i];
          if (
            this.getAllUsers[i].photoURL == null ||
            this.getAllUsers[i].photoURL == ""
          ) {
            this.user.photoURL = this.getDefaultPhotoURL;
          }
          break;
        }
      }
    },

    hoverDetail(event) {
      if (this.tab != "detail") {
        event.target.style.color = "#1B5E";
      }
    },
    mouseOutDetail(event) {
      if (this.tab != "detail") {
        event.target.style.color = "";
        console.log(event.target.style.color);
      }
    },
    hoverAlbum(event) {
      if (this.tab != "album") {
        event.target.style.color = "#eb34de";
      }
    },
    mouseOutAlbum(event) {
      if (this.tab != "album") {
        event.target.style.color = "";
      }
    },
  },
  components: {
    Media,
  },
};
</script>

<style scoped>
#listMedia {
  width: 100%;
  height: 450px;
  overflow: scroll;
}
.scrollBar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE and Edge */
.scrollBar {
  -ms-overflow-style: none;
}
</style>
