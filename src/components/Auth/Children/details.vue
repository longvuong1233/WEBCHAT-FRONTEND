<template>
<div>
    <v-toolbar color="white" light class="rounded-lg " height="50">
        <v-btn icon>
            <v-icon color="green">mdi-account-circle</v-icon>
        </v-btn>
        <v-btn icon>
            <v-icon @mouseover="hoverAlbum($event)" @mouseleave="mouseOutAlbum($event)">mdi-image-multiple</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon>
            <v-icon @mouseover="hoverClose($event)" @mouseleave="mouseOutClose($event)">mdi-close-octagon-outline</v-icon>
        </v-btn>
    </v-toolbar>
    <v-list-item three-line>
        <v-list-item-content>
            <div class="overline mb-4">
                General Infor
            </div>
            <v-list-item-title class="headline mb-1">
                Headline 5
            </v-list-item-title>
            <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar class="rounded-circle" tile size="80" color="grey"></v-list-item-avatar>
    </v-list-item>
    <v-divider></v-divider>
    <v-card color="#26c6da" dark class="mx-5" :max-height="400">
        <v-card-title>
            <v-icon large left>
                mdi-twitter
            </v-icon>
            <span class="title font-weight-light">Twitter</span>
        </v-card-title>

        <v-card-text class="headline font-weight-bold">
            "Turns out semicolon-less style is easier and safer in TS because most
            gotcha edge cases are type invalid as well."
        </v-card-text>

        <v-card-actions>
            <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                    <v-img class="elevation-6" alt="" src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>Evan You</v-list-item-title>
                </v-list-item-content>

                <v-row align="center" justify="end">
                    <v-icon class="mr-1">
                        mdi-heart
                    </v-icon>
                    <span class="subheading mr-2">256</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1">
                        mdi-share-variant
                    </v-icon>
                    <span class="subheading">45</span>
                </v-row>
            </v-list-item>
        </v-card-actions>
    </v-card>
</div>
</template>

<script>
export default {
    data() {
        return {
            heightDevice: window.innerHeight,
        };
    },
    methods: {
        hoverClose(event) {
            event.target.style.color = "red";
        },
        mouseOutClose(event) {
            event.target.style.color = "";
        },
        hoverAlbum(event) {
            event.target.style.color = "#eb34de";
        },
        mouseOutAlbum(event) {
            event.target.style.color = "";
        },
    },
};
</script>
