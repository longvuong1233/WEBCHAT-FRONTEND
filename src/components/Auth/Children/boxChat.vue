<template>
<div>
    <v-app-bar absolute class="rounded-lg " height="50" dark src="https://picsum.photos/1920/1080?random" scroll-target="#scrolling-techniques-2">
        <template v-slot:img="{ props }">
            <v-img v-bind="props" gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"></v-img>
        </template>

        <v-toolbar-title>Title</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-find-replace</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
    </v-app-bar>

    <v-container :style="styles.messageArea">
        <v-sheet class="overflow-y-auto scrollBar " rounded height="100%" id="scrolling-techniques-2" elevation="5">
            <v-container>
                <v-list id="listMessages">
                    <v-list-item class="d-flex justify-end">
                        <v-avatar color="indigo" size="37">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                            s
                        </v-avatar>
                    </v-list-item>

                    <v-list-item>
                        <v-avatar color="indigo" size="37">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                        <span class=" message ml-2">sasdsdsaddsdsaddsdsaddddsdsaddsdsaddddsdsaddsdsaddddsdsaddsdsaddddsdsaddsdsaddddsdsaddsdsaddddsdsaddsdsaddddsdsaddsdsaddddsdsaddsdsaddddsdsaddsdsaddsdsaddsdsaddsdsaddsdddsdsaddsdsaddsdddsdsaddsdsaddsdddsdsaddsdsaddsdddsdsaddsdsaddsdddsdsaddsdsaddsdddsdsaddsdsaddsdddsdsaddsdsaddsdddsdsaddsdsaddsdsaddsdsaddsdsaddsdsaddsdsaddsdsadwadsadsd</span>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                    <v-list-item>
                        <v-avatar color="indigo">
                            <v-icon dark>
                                mdi-account-circle
                            </v-icon>
                        </v-avatar>
                    </v-list-item>
                </v-list>
            </v-container>
        </v-sheet>
    </v-container>
    <v-container height="100" class=" ">
        <span v-click-outside="hadinh">
            <div v-show="emojiPicker" id="emojipicker">
                <VEmojiPicker @select="selectEmoji" />
            </div>
            <v-btn icon @click.stop="emojiPicker = !emojiPicker" class="ml-5">
                <v-icon>mdi-sticker-emoji</v-icon>
            </v-btn>
        </span>

        <v-text-field v-model="message" append-icon="mdi-send" @click:append="btnSendMessage" label=" Type a message" filled rounded dense>dwa</v-text-field>
    </v-container>
</div>
</template>

<script>
import {
    VEmojiPicker
} from "v-emoji-picker";
import ClickOutside from "vue-click-outside";
export default {
    data() {
        return {
            message: "",
            emojiPicker: false,
            heightDevice: window.innerHeight - 10,
            styles: {
                messageArea: {
                    height: window.innerHeight - 50 - 100 + "px",
                },
            },
        };
    },
    methods: {
        hadinh() {
            this.emojiPicker = false;
        },
        selectEmoji(emoji) {
            this.message += emoji.data + "";
        },
        btnSendMessage() {
            alert("send");
        },
    },
    mounted() {
        let elem = document.getElementById("listMessages");

        document.getElementById("scrolling-techniques-2").scrollTop = Math.floor(
            elem.offsetHeight
        );
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
