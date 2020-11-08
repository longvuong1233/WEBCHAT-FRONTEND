<template>
<div>
    <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" :height="heightDevice" :max-height="heightDevice">
        <v-scale-transition>
            <component class="my-3" :is="selectComponent" :selectComponent="selectComponent" @changePage="selectComponent = $event"></component>
        </v-scale-transition>
    </v-parallax>
</div>
</template>

<script>
import loginPage from "./loginPage";
import signupPage from "./signupPage";
export default {
    data() {
        return {
            heightDevice: window.innerHeight,
            selectComponent: "loginPage",
        };
    },
    components: {
        loginPage,
        signupPage,
    },
};
</script>
