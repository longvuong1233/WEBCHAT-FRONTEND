<template>
<v-dialog v-model="dialog" max-width="700px">
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
                    </v-card>

                    <v-btn color="primary" @click="e1 = 2">
                        Continue
                    </v-btn>

                    <v-btn text>
                        Cancel
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

                    <v-btn color="primary" @click="e1 = 3">
                        Continue
                    </v-btn>

                    <v-btn text>
                        Cancel
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

                    <v-btn color="primary" @click="e1 = 1">
                        Continue
                    </v-btn>

                    <v-btn text>
                        Cancel
                    </v-btn>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </template>
</v-dialog>
</template>

<script>
export default {
    data() {
        return {
            e1: 1,
            dialog: true,
            email: "",
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
};
</script>
