<template>
  <div id="loginArea" class="container d-flex justify-content-center">
    <v-sheet color="white" elevation="5" height="650" shaped width="400">
      <div class=" px-5 py-5">
        <div id="title" class="pb-5 pt-3 mb-3 text-center ">
          <h1 class="font-weight-bold" style="font-family:Georgia">Sign up</h1>
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
            >Or sign up with</span
          >
          <hr style="display:inline-block; width:30%" />
        </div>
        <v-form v-model="valid" @submit.prevent ref="formsignup">
          <div id="infor" class="text-center">
            <div class="mb-4" id="fullname">
              <v-text-field
                prepend-icon="mdi-human-greeting"
                v-model="displayName"
                label="Full name"
                :rules="rules.fullname"
                hide-details="auto"
                counter
              ></v-text-field>
            </div>
            <div class="mb-4" id="Email">
              <v-text-field
                v-model="email"
                counter
                prepend-icon="mdi-email"
                :rules="rules.emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </div>

            <div id="password" class="mb-4">
              <v-text-field
                prepend-icon="mdi-owl"
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.password.required, rules.password.min]"
                :type="showPassword ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                hint="At least 8 characters"
                counter
                @click:append="showPassword = !showPassword"
              ></v-text-field>
            </div>
          </div>
          <div id="mainaction">
            <v-btn
              type="submit"
              @click="signupApi"
              rounded
              dark
              block
              style="background: rgb(67,212,13);
    background: rgb(67,212,13);
background: linear-gradient(90deg, rgba(67,212,13,1) 6%, rgba(9,9,121,1) 30%, rgba(0,212,255,1) 44%, rgba(255,0,236,1) 68%, rgba(255,0,99,1) 87%);"
            >
              Sign up
            </v-btn>
          </div>
        </v-form>
        <div id="ortheraction">
          <div id="signup" class="mt-3">
            <p class="text-center">
              <small
                ><em
                  ><span class="mdi mdi-account-edit"></span>Already on Hadinh ?
                  <span class="link" @click="changeToLogin">Sign in</span></em
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
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    styles: {},
    showPassword: false,

    password: "",
    email: "",
    displayName: "",
    valid: false,

    rules: {
      fullname: [(value) => !!value || "Required."],

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
    changeToLogin() {
      this.$store.dispatch("AUTH/removeMesError");
      this.propSelectComponent = "loginPage";
    },
    signupApi() {
      if (this.valid) {
        const credential = {
          password: this.password,
          email: this.email,
          displayName: this.displayName,
        };
        this.$store.dispatch("AUTH/signup", credential);
      } else {
        this.$refs.formsignup.validate();
      }
    },
    redirectToHome() {
      this.$router.push({
        name: "index",
      });
    },
  },
  computed: {
    ...mapGetters("AUTH", [
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
    isEmailVerified(newValue) {
      if (newValue == -1) {
        this.$store.dispatch("AUTH/verifyEmail", this.getIdToken);
      }
    },
  },
  mounted() {
    if (this.getAuth == true) {
      this.redirectToHome();
    }
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
