<template>
  <div>
    <v-app-bar
      absolute
      class="rounded-lg "
      height="50"
      dark
      src="https://picsum.photos/1920/1080?random"
      scroll-target="#scrolling-techniques-2"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-toolbar-title>{{ targetName }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-find-replace</v-icon>
      </v-btn>
      <v-btn icon @click="createCallRoom()">
        <v-icon>mdi-video</v-icon>
      </v-btn>

      <v-btn icon v-if="isSendingFriend == true">
        <v-icon>mdi-baby</v-icon> </v-btn
      ><v-btn icon @click="makeFriend()" v-else-if="isFriend == false">
        <v-icon>mdi-account-plus</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-container :style="styles.messageArea">
      <v-sheet
        class="overflow-y-auto scrollBar "
        rounded
        height="100%"
        id="scrolling-techniques-2"
        elevation="5"
      >
        <v-container>
          <v-list id="listMessages">
            <v-list-item> </v-list-item><v-list-item> </v-list-item
            ><v-list-item> </v-list-item><v-list-item> </v-list-item
            ><v-list-item> </v-list-item>
            <template v-for="(mes, index) in conversation" name="chat">
              <v-list-item
                :key="index"
                :class="{ 'd-flex flex-row-reverse': checkOwner(mes.owner) }"
                class="my-4"
              >
                <v-avatar
                  color="indigo"
                  v-if="checkOwner(mes.owner) == false"
                  size="35"
                >
                  <v-img :src="photoURL"></v-img>
                </v-avatar>
                <v-avatar
                  color="indigo"
                  v-else-if="getLastMesSeen == index"
                  size="15"
                >
                  <v-img :src="photoURL"></v-img>
                </v-avatar>
                <span v-if="mes.type == 'text'" class=" message mx-2">{{
                  mes.content
                }}</span>
                <span v-else-if="mes.type == 'img'" class="mx-2">
                  <v-img
                    style="cursor:pointer"
                    @click="downloadImage(mes.content, mes.nameFile)"
                    :src="mes.content"
                    max-height="200"
                    max-width="300"
                    contain
                    height="200"
                    width="300"
                  ></v-img
                ></span>
                <span v-else-if="mes.type == 'video'" class="mx-2">
                  <Media
                    kind="video"
                    :src="mes.content"
                    :controls="true"
                    style="max-height:200px;max-width:300px"
                  />
                </span> </v-list-item
            ></template>
          </v-list>
          <v-text-field
            color="success"
            loading
            v-if="loading"
            disabled
          ></v-text-field>
        </v-container>
      </v-sheet>
    </v-container>
    <v-container height="100" class=" ">
      <span v-click-outside="closeEmoji">
        <div v-show="emojiPicker" id="emojipicker">
          <VEmojiPicker @select="selectEmoji" />
        </div>
        <v-btn icon @click.stop="emojiPicker = !emojiPicker" class="ml-5">
          <v-icon color="amber">mdi-sticker-emoji</v-icon>
        </v-btn>
      </span>
      <span>
        <span>
          <input type="file" hidden id="image" />
          <v-btn icon class="ml-2" @click="btnUpImage">
            <v-icon color="green accent-3">mdi-file-image</v-icon>
          </v-btn>
        </span>
      </span>

      <v-text-field
        @focus="focusBoxChat()"
        v-model="message"
        append-icon="mdi-send"
        @click:append="btnSendMessage"
        label=" Type a message"
        filled
        rounded
        dense
        @keypress="checkEnterSendMessage($event)"
      ></v-text-field>
    </v-container>
  </div>
</template>

<script>
import { VEmojiPicker } from "v-emoji-picker";
import ClickOutside from "vue-click-outside";
import { fb, firebase } from "../../../apis/firebase/config";
import { mapGetters } from "vuex";
import Media from "@dongido/vue-viaudio";
import axios from "axios";

export default {
  computed: {
    ...mapGetters("AUTH", ["getEmail", "getDefaultPhotoURL"]),
    ...mapGetters("SOCIAL", ["getAllUsers", "getEmailTarget"]),
    getLastMesSeen() {
      for (let i = this.conversation.length - 1; i >= 0; i--) {
        if (this.conversation[i].state == 2) {
          return i;
        }
      }
      return null;
    },
  },

  watch: {
    innerHeight(vl) {
      this.styles.messageArea.height = vl - 50 - 100 + "px";
    },
    idChat(value) {
      fb.collection("roomchat")
        .doc(value)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.getAllUsers.every((ele) => {
              if (ele.email == this.getEmailTarget) {
                this.targetName = ele.displayName;
                if (ele.photoURL != null) {
                  this.photoURL = ele.photoURL;
                } else {
                  this.photoURL = this.getDefaultPhotoURL;
                }
                return false;
              }
              return true;
            });

            fb.collection("roomchat")
              .doc(this.idChat)
              .onSnapshot((doc) => {
                this.conversation = doc.data().messages;
              });
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },
    getEmailTarget(value) {
      this.checkFriend(value);
    },
    conversation(value) {
      let temp = [];
      if (value.length != 0) {
        temp = value.filter((ele) => {
          if (ele.type == "img" || ele.type == "video") {
            return true;
          }
          return false;
        });
      }
      this.$emit("listMediaItem", temp);
    },
  },
  props: {
    idChat: String,
    innerHeight: Number,
  },
  data() {
    return {
      message: "",
      loading: false,
      isSendingFriend: false,
      isFriend: false,
      targetName: "",
      photoURL: "",
      emojiPicker: false,

      styles: {
        messageArea: {
          height: window.innerHeight - 50 - 100 + "px",
        },
      },
      conversation: [],
    };
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
    checkFriend(value) {
      fb.collection("user")
        .doc(value)
        .onSnapshot(
          (querySnap) => {
            for (let i = 0; i < querySnap.data().friends.length; i++) {
              if (querySnap.data().friends[i] == this.getEmail) {
                this.isFriend = true;
                break;
              }
            }
            for (let i = 0; i < querySnap.data().queueFriend.length; i++) {
              if (querySnap.data().queueFriend[i].email == this.getEmail) {
                this.isSendingFriend = true;
                break;
              }
            }
          },
          (err) => {
            console.log(err);
          }
        );
    },
    btnUpImage() {
      document.getElementById("image").click();
      document
        .getElementById("image")
        .addEventListener("change", this.handleFile, false);
    },
    async handleFile(evt) {
      if (evt.target.files[0] != null) {
        this.loading = true;
        var storageRef = firebase.storage().ref();

        if (
          ["image/gif", "image/jpeg", "image/png", "image/x-icon"].includes(
            evt.target.files[0].type
          )
        ) {
          let metadata = {
            contentType: "image/jpeg",
          };

          // Upload the file and metadata
          await storageRef
            .child(
              "sharing/" + this.idChat + "/images/" + evt.target.files[0].name
            )
            .put(evt.target.files[0], metadata);

          storageRef
            .child(
              "sharing/" + this.idChat + "/images/" + evt.target.files[0].name
            )
            .getDownloadURL()
            .then((url) => {
              this.conversation.push({
                owner: this.getEmail,
                content: url,
                date: new Date(),
                state: 0,
                type: "img",
                nameFile: evt.target.files[0].name,
              });
              fb.collection("roomchat")
                .doc(this.idChat)
                .update({
                  messages: this.conversation,
                })
                .then(function() {
                  console.log("Document successfully updated!");
                })
                .catch(function(error) {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                });
            })
            .catch(function(error) {
              console.log(error);
              // Handle any errors
            });
        } else if (evt.target.files[0].type == "video/mp4") {
          let metadata = {
            contentType: "video/mp4",
          };

          // Upload the file and metadata
          await storageRef
            .child(
              "sharing/" + this.idChat + "/videos/" + evt.target.files[0].name
            )
            .put(evt.target.files[0], metadata);

          storageRef
            .child(
              "sharing/" + this.idChat + "/videos/" + evt.target.files[0].name
            )
            .getDownloadURL()
            .then((url) => {
              this.conversation.push({
                owner: this.getEmail,
                content: url,
                date: new Date(),
                state: 0,
                type: "video",
              });
              fb.collection("roomchat")
                .doc(this.idChat)
                .update({
                  messages: this.conversation,
                })
                .then(function() {
                  console.log("Document successfully updated!");
                })
                .catch(function(error) {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                });
            })
            .catch(function(error) {
              console.log(error);
              // Handle any errors
            });
        }
      }
      this.loading = false;
    },
    createCallRoom() {
      this.$store.dispatch("SOCIAL/getTokenRoomCall", this.getEmail);
      this.$store.commit("SOCIAL/setCallTarget", this.getEmailTarget);
      this.$emit("changeCallGear", true);

      fb.collection("user")
        .doc(this.getEmailTarget)
        .update({
          videocall: this.getEmail,
        });
    },
    makeFriend() {
      this.$store.dispatch("SOCIAL/makeFriend", {
        sender: this.getEmail,
        friend: this.getEmailTarget,
      });
    },
    focusBoxChat() {
      if (this.conversation.length != 0) {
        this.conversation.forEach((ele) => {
          if (ele.state == 0 && ele.owner != this.getEmail) {
            ele.state = 2;
          }
        });
        fb.collection("roomchat")
          .doc(this.idChat)
          .update({
            messages: this.conversation,
          });
      }
    },
    checkEnterSendMessage(e) {
      if (e.charCode == 13) {
        this.btnSendMessage();
      }
    },
    checkOwner(mes) {
      if (mes == this.getEmail) {
        return true;
      }
      return false;
    },
    closeEmoji() {
      this.emojiPicker = false;
    },
    selectEmoji(emoji) {
      this.message += emoji.data + "";
    },
    btnSendMessage() {
      if (this.message.trim() != "") {
        this.conversation.push({
          owner: this.getEmail,
          content: this.message.trim(),
          date: new Date(),
          state: 0,
          type: "text",
        });
        fb.collection("roomchat")
          .doc(this.idChat)
          .update({
            messages: this.conversation,
          })
          .then(function() {
            console.log("Document successfully updated!");
          })
          .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
          });
        this.message = "";
      }
    },
  },
  updated() {
    // document
    //   .querySelector("#listMessages > div:last-child")
    //   .scrollIntoView(false);
    this.elem = document.getElementById("listMessages");
    document.getElementById("scrolling-techniques-2").scrollTop = Math.floor(
      this.elem.offsetHeight
    );
  },
  created() {
    if (this.getEmailTarget != "") {
      this.checkFriend(this.getEmailTarget);
    }
  },

  components: {
    VEmojiPicker,
    Media,
  },
  directives: {
    ClickOutside,
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

#emojipicker {
  position: absolute;
  bottom: 70px;
  left: 150px;
}

.message {
  max-width: 80%;
  padding-left: 15px;
  padding-right: 15px;
  background: #f8f8f8;
  border: solid 0.1px #f8f8f8;
  border-radius: 15px;
}

#listMessages:last-child {
  margin-bottom: 32px;
}
</style>
