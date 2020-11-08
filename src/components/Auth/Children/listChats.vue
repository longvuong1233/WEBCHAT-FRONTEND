<template>
<div id="listchat">
    <v-toolbar color="deep-purple accent-4" dark class="rounded-lg" height="50">
        <v-fab-transition>
            <v-toolbar-title v-show="!isSearch">
                <v-btn icon>
                    <v-icon color="deep-orange">
                        mdi-comment-plus-outline
                    </v-icon>
                </v-btn>

                Chats
            </v-toolbar-title>
        </v-fab-transition>

        <v-fab-transition>
            <v-text-field v-show="isSearch" hide-details prepend-icon="mdi-account-search" single-line></v-text-field>
        </v-fab-transition>

        <v-spacer></v-spacer>

        <v-btn icon @click="isSearch = !isSearch" :color="isSearch == true ? 'red' : 'none'">
            <v-icon>{{ actionToolbar }}</v-icon>
        </v-btn>
    </v-toolbar>

    <v-list subheader class="pl-3">
        <v-subheader>Recent chat</v-subheader>
        <v-virtual-scroll :items="recent" :item-height="70" height="300" class="scrollBar">
            <template v-slot:default="{ item }">
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img :alt="`${item.title} avatar`" :src="item.avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>ssd
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-virtual-scroll>
    </v-list>

    <v-divider></v-divider>

    <v-list subheader class="pl-3">
        <v-subheader>Previous chats</v-subheader>
        <v-virtual-scroll :items="previous" :item-height="50" height="150" class="scrollBar">
            <template v-slot:default="{ item }">
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img :alt="`${item.title} avatar`" :src="item.avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-text="item.title"></v-list-item-title>ssd
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-virtual-scroll>
    </v-list>
</div>
</template>

<script>
export default {
    data: () => ({
        heightDevice: window.innerHeight,
        isSearch: false,
        recent: [{
                active: true,
                avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                title: "Jason Oner",
            },
            {
                active: true,
                avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
                title: "Mike Carlson",
            },
            {
                avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
                title: "Cindy Baker",
            },
            {
                avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                title: "Ali Connors",
            },
            {
                avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                title: "Ali Connors",
            },
            {
                avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                title: "Ali Connors",
            },
            {
                avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                title: "Ali Connors",
            },
            {
                avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                title: "Ali Connors",
            },
            {
                avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                title: "Ali Connors",
            },
            {
                avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                title: "Ali Connors",
            },
            {
                avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                title: "Ali Connors",
            },
        ],
        previous: [{
                title: "Travis Howard",
                avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
            },
            {
                title: "Travis Howard",
                avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
            },
            {
                title: "Travis Howard",
                avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
            },
            {
                title: "Travis Howard",
                avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
            },
            {
                title: "Travis Howard",
                avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
            },
            {
                title: "Travis Howard",
                avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
            },
            {
                title: "Travis Howard",
                avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
            },
            {
                title: "Travis Howard",
                avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
            },
            {
                title: "Travis Howard",
                avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
            },
        ],
    }),
    computed: {
        actionToolbar() {
            return this.isSearch == true ? "mdi-close" : "mdi-magnify";
        },
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
</style>
