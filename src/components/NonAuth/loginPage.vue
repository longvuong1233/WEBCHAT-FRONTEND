<template>
  <div id="loginArea" class="container d-flex justify-content-center">
    <v-sheet color="white" elevation="5" height="600" shaped width="400">
      <div class=" px-5 py-5">
        <div id="title" class="pb-5 pt-3 mb-3 text-center ">
          <h1 class="font-weight-bold" style="font-family:Georgia">Welcome</h1>
        </div>

        <div class="d-flex justify-space-around">
          <v-btn color="green" fab dark class="">
            <v-icon>mdi-google</v-icon>
          </v-btn>
          <v-btn color="blue" fab dark class="">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
        </div>

        <div class="my-3">
          <hr style="display:inline-block; width:30%" />
          <span style="display:inline-block; width:40%" class="text-center"
            >Or login with</span
          >
          <hr style="display:inline-block; width:30%" />
        </div>
        <v-form @submit.prevent v-model="valid" ref="formlogin">
          <div id="infor" class="text-center">
            <div class="mb-4" id="email">
              <v-text-field
                prepend-icon="mdi-account"
                v-model="email"
                label="Email"
                :rules="rules.emailRules"
                hide-details="auto"
                name="email"
                counter
              ></v-text-field>
            </div>
            <div id="password" class="mb-4">
              <v-text-field
                prepend-icon="mdi-owl"
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.password.required, rules.password.min]"
                :type="showPassword ? 'text' : 'password'"
                name="password"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </div>
          </div>
          <div id="mainaction">
            <v-btn
              @click="signinApi"
              type="submit"
              rounded
              dark
              block
              style="background: #3A1C71;
    background: -webkit-linear-gradient(to right, #FFAF7B, #D76D77, #3A1C71);
    background: linear-gradient(to right, #FFAF7B, #D76D77, #3A1C71);"
            >
              Sign in
            </v-btn>
          </div>
        </v-form>

        <div id="anotheraction">
          <div id="forgot">
            <p class="text-end">
              <small
                class="link text-warning"
                @click="dialogForgotPW = !dialogForgotPW"
                ><em
                  ><span class="mdi mdi-account-key"></span> Forgot your
                  password ?</em
                ></small
              >
            </p>
          </div>

          <div id="signup" class="mt-3">
            <p class="text-center">
              <small
                ><em
                  ><span class="mdi mdi-account-edit"></span>New to Hadinh ?
                  <span class="link" @click="changeToSignup">Sign up</span></em
                ></small
              >
            </p>
          </div>
          <div id="loading">
            <v-text-field
              v-show="getLoading"
              color="success"
              loading
              disabled
            ></v-text-field>
          </div>
          <div id="error">
            <v-alert v-show="getMesError != ''" type="error" dense>
              {{ getMesError }}
            </v-alert>
          </div>
        </div>
      </div>
    </v-sheet>
    <div id="dialogs">
      <forgotPassword
        :dialogForgotPW="dialogForgotPW"
        @changeDialogForgotPW="dialogForgotPW = $event"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import forgotPassword from "../Dialog/forgotPassword";
export default {
  props: {
    selectComponent: String,
  },
  data: () => ({
    dialogForgotPW: false,
    styles: {},
    showPassword: false,
    email: "",
    password: "",
    valid: false,

    rules: {
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      password: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    },
  }),
  methods: {
    signinApi() {
      if (this.valid) {
        const user = {
          password: this.password,
          email: this.email,
        };
        this.$store.dispatch("AUTH/signin", user);
      } else {
        this.$refs.formlogin.validate();
      }
    },
    changeToSignup() {
      this.$store.dispatch("AUTH/removeMesError");
      this.propSelectComponent = "signupPage";
    },
    redirectToHome() {
      this.$router.push({
        name: "index",
      });
    },
  },
  computed: {
    ...mapGetters("AUTH", [
      "getAuth",
      "getLoading",
      "getMesError",
      "isEmailVerified",
      "getIdToken",
    ]),
    propSelectComponent: {
      set(value) {
        this.$emit("changePage", value);
      },
      get() {
        return this.selectComponent;
      },
    },
  },
  watch: {
    getAuth(newValue) {
      if (newValue == true) {
        this.$cookies.set("idtoken", this.getIdToken);
        this.redirectToHome();
      }
    },

    isEmailVerified(newValue) {
      if (newValue == -1) {
        this.$store.dispatch("AUTH/verifyEmail");
      }
    },
  },
  mounted() {
    if (this.getAuth == true) {
      this.redirectToHome();
    }
  },
  components: {
    forgotPassword,
  },
};
</script>

<style scoped>
.link {
  color: blue;
  cursor: pointer;
}

.link:hover {
  text-decoration-line: underline;
}
</style>
