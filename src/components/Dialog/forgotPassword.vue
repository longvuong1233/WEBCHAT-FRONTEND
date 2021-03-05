<template>
<div v-if="propDialogForgotPW">
    <v-dialog v-model="propDialogForgotPW" max-width="700px">
        <template>
            <v-stepper v-model="e1">
                <v-stepper-header>
                    <v-stepper-step :complete="e1 > 1" step="1">
                        Enter Your Email
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="e1 > 2" step="2">
                        Enter Your Secret Key
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">
                        Enter Your New Password
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card class="mb-12 pt-12 " height="200px">
                            <div class="mb-4" id="email">
                                <v-text-field prepend-icon="mdi-account" v-model="email" label="Email" :rules="rules.emailRules" hide-details="auto" counter class="mx-15 px-10"></v-text-field>
                            </div>
                            <div class="errEmail" v-if="getMesError != ''">
                                <v-alert dense outlined type=" error">
                                    {{ getMesError }}
                                </v-alert>
                            </div>
                        </v-card>

                        <v-btn color="primary" @click="btnEnterEmail">
                            Continue
                        </v-btn>

                        <v-btn text @click="propDialogForgotPW = false">
                            Cancel
                        </v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card class="mb-12 pt-12 " height="200px">
                            <div class="mb-4" id="token">
                                <v-text-field prepend-icon="mdi-key-variant" v-model="token" label="Token" hide-details="auto" class="mx-15 px-10"></v-text-field>
                            </div>
                            <div class="errEmail" v-if="getMesError != ''">
                                <v-alert dense outl ined type=" error">
                                    {{ getMesError }}s
                                </v-alert>
                            </div>
                        </v-card>

                        <v-btn color="primary" @click="btnEnterToken">
                            Continue
                        </v-btn>

                        <v-btn text @click="propDialogForgotPW = false">
                            Cancel
                        </v-btn>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <v-card class="mb-12 pt-12 " height="200px">
                            <div class="mb-4" id="password">
                                <v-text-field class="mx-15 px-10" prepend-icon="mdi-owl" v-model="newPassword" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.password.required, rules.password.min]" :type="showPassword ? 'text' : 'password'" name="input-10-1" label="New Password" hint="At least 8 characters" counter @click:append="showPassword = !showPassword"></v-text-field>
                            </div>
                            <div class="errEmail" v-if="getMesError != ''">
                                <v-alert dense outlined type=" error">
                                    {{ getMesError }}
                                </v-alert>
                            </div>
                            <div class="success" v-if="notifySuccess != ''">
                                <v-alert dense outlined type=" success">
                                    {{ notifySuccess }}
                                </v-alert>
                            </div>
                        </v-card>

                        <v-btn color="primary" @click="btnEnterNewPW">
                            Save
                        </v-btn>

                        <v-btn text @click="propDialogForgotPW = false">
                            Cancel
                        </v-btn>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </template>
    </v-dialog>
    <div id="another_dialog">
        <v-dialog v-model="getLoading" hide-overlay persistent width="300">
            <v-card color="primary" dark>
                <v-card-text>
                    {{ actionNotification }}
                    <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from "vuex";

export default {
    props: ["dialogForgotPW"],
    data() {
        return {
            e1: 1,
            showPassword: false,
            lastEmail: "",
            email: "",
            notifySuccess: "",
            actionNotification: "",
            token: "",
            newPassword: "",
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
        };
    },
    methods: {
        btnEnterEmail() {
            this.$store.dispatch("AUTH/removeMesError");
            this.lastEmail = this.email;
            this.actionNotification = "We are checking your email ....";
            this.$store.dispatch("AUTH/forgotpassword", this.lastEmail);
        },
        btnEnterToken() {
            this.$store.dispatch("AUTH/removeMesError");
            this.actionNotification = "We are checking your token ....";
            this.$store.dispatch("AUTH/resetpassword", this.token);
        },
        btnEnterNewPW() {
            this.$store.dispatch("AUTH/removeMesError");
            this.actionNotification = "Loading ....";
            this.$store.dispatch(
                "AUTH/changePassword",
                this.lastEmail,
                this.newPassword
            );
            if (this.getMesError == "") {
                this.notifySuccess = "Saved";
            }
        },
    },
    computed: {
        ...mapGetters("AUTH", ["getLoading", "getMesError", "getStatusForgotPW"]),
        propDialogForgotPW: {
            get() {
                return this.dialogForgotPW;
            },
            set(value) {
                this.$emit("changeDialogForgotPW", value);
            },
        },
    },
    watch: {
        getStatusForgotPW(newVL) {
            if (newVL == 1) {
                this.e1 = 2;
            } else if (newVL == 2) {
                this.e1 = 3;
            }
        },
    },
};
</script>
