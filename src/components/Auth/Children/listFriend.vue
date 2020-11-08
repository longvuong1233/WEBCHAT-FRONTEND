<template>
<div id="listfriend">
    <v-list subheader class="pl-3" :max-height="heightDevice">
        <v-subheader>My Friends</v-subheader>
        <v-virtual-scroll :items="recent" :item-height="70" class="scrollBar" :max-height="heightDevice - 100">
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
    data() {
        return {
            heightDevice: window.innerHeight,
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
        };
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
