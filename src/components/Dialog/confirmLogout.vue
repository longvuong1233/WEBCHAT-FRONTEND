<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-card-title class="headline">
        Are you sure you want to log out !!!
      </v-card-title>

      <v-card-text>
        You must log in again for next time
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="btnDisagree">
          Disagree
        </v-btn>

        <v-btn color="green darken-1" text @click="btnAgree">
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["openDialog"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    btnAgree() {
      this.dialog = false;
      this.$emit("changeOpenDialog", this.dialog);
      this.$store.dispatch("AUTH/logout");
      this.$cookies.remove("idtoken");
    },
    btnDisagree() {
      this.dialog = false;
      this.$emit("changeOpenDialog", this.dialog);
    },
  },
  watch: {
    openDialog(newValue) {
      if (newValue == true) {
        this.dialog = true;
      }
    },
    dialog(newValue) {
      if (newValue == false) {
        this.$emit("changeOpenDialog", this.dialog);
      }
    },
  },
};
</script>
