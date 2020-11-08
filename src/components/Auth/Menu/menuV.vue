<template>
<div id="menu">
    <v-card :width="widthDevice" :max-width="widthDevice" :height="heightDevice" :max-height="heightDevice">
        <v-navigation-drawer permanent expand-on-hover fixed>
            <v-layout column fill-height justify-space-between>
                <v-list>
                    <v-list-item class=" px-2">
                        <v-speed-dial transition="scale-transition" v-model="fab" direction="right">
                            <template v-slot:activator>
                                <v-list-item-avatar color="blue darken-2" dark fab id="avatar">
                                    <v-img v-if="!fab" src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
                                    <v-icon v-else>
                                        mdi-close
                                    </v-icon>
                                </v-list-item-avatar>
                            </template>

                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab dark small color="green" v-bind="attrs" v-on="on" @click="btnVer">
                                        <v-icon>mdi-account-edit</v-icon>
                                    </v-btn>
                                </template>
                                <span>Profile</span>
                            </v-tooltip>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab dark small color="red" v-bind="attrs" v-on="on" @click="openDialogConfirm = true">
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
                                Sandra Adams
                            </v-list-item-title>
                            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                <v-divider></v-divider>

                <v-list nav dense>
                    <v-list-item link @click="gotoMessagePage">
                        <v-list-item-icon>
                            <v-icon>mdi-message</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>Message</v-list-item-title>
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
    <div id="dialogs">
        <CfLogout :openDialog="openDialogConfirm" @changeOpenDialog="openDialogConfirm = $event" />
    </div>
</div>
</template>

<script>
import CfLogout from "../../Dialog/confirmLogout";
import {
    mapGetters
} from "vuex";
export default {
    data() {
        return {
            openDialogConfirm: false,
            fab: false,
            widthDevice: window.innerWidth - 30,
            heightDevice: window.innerHeight,
        };
    },
    methods: {
        gotoListFriendPage() {
            this.$router.push("/myfriend");
        },
        gotoMessagePage() {
            this.$router.push("/");
        },
        btnVer() {
            alert("Sds");
            this.$store.dispatch("AUTH/verifyEmail");
        },
    },
    computed: {
        ...mapGetters("AUTH", ["getAuth"]),
    },
    components: {
        CfLogout,
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
