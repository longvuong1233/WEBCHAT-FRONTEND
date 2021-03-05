<template>
  <v-row justify="center">
    <v-dialog max-width="600" v-model="dialog">
      <v-card>
        <v-toolbar color="primary" dark
          >What's on your mind <v-spacer></v-spacer
          ><v-btn icon @click="postStatus"
            ><span class="mdi mdi-18px mdi-rocket"></span> </v-btn
        ></v-toolbar>
        <v-card-text>
          <div class="mt-5">
            <v-textarea
              label="Say something ..."
              auto-grow
              append-outer-icon="mdi-sticker-emoji"
              @click:append-outer="emojiPicker = !emojiPicker"
              v-model="content"
              outlined
              :background-color="color"
              row-height="25"
              shaped
            ></v-textarea>
          </div>
          <div
            v-show="emojiPicker"
            id="emojipicker"
            v-click-outside="closeEmoji"
          >
            <VEmojiPicker @select="selectEmoji" />
          </div>
          <div class="d-flex justify-content-center">
            <v-color-picker
              dot-size="16"
              v-model="color"
              hide-inputs
              swatches-max-height="100"
            ></v-color-picker>
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { VEmojiPicker } from "v-emoji-picker";
import { fb, firebase } from "../../apis/firebase/config";
import ClickOutside from "vue-click-outside";
import { mapGetters } from "vuex";
export default {
  methods: {
    postStatus() {
      if (this.content != "") {
        const newStatus = {
          content: this.content,
          color: this.color,
          like: [],
          expireTime: new Date().getTime(),
        };
        fb.collection("user")
          .doc(this.getEmail)
          .update({
            status: firebase.firestore.FieldValue.arrayUnion(newStatus),
          });
        this.content = "";
      } else {
        alert("!!!!!");
      }
    },
    closeEmoji() {
      this.emojiPicker = false;
    },
    selectEmoji(emoji) {
      this.content += emoji.data + "";
    },
  },
  computed: {
    ...mapGetters("AUTH", ["getEmail"]),
    dialog: {
      get() {
        return this.openDialog;
      },
      set(vl) {
        this.$emit("changeDialogStatus", vl);
      },
    },
  },
  props: {
    openDialog: Boolean,
  },
  data() {
    return {
      color: "",
      content: "",
      emojiPicker: false,
    };
  },
  components: {
    VEmojiPicker,
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style scoped>
#emojipicker {
  position: absolute;
  bottom: 70px;
  left: 150px;
  z-index: 1;
}
</style>
