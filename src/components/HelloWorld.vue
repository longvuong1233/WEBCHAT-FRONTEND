<template>
<div>
    <menu-V>
        <v-fab-transition>
            <router-view />
        </v-fab-transition>
    </menu-V>
</div>
</template>

<script>
import menuV from "./Auth/Menu/menuV";
export default {
    components: {
        menuV,
    },
};
</script>
