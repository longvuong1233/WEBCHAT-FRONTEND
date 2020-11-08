<template>
<div class="row">
    <div class="col">
        <listFriend />
    </div>
    <v-divider vertical></v-divider>
    <div class="col">
        <listChats />
    </div>
</div>
</template>

<script>
import listFriend from "./Children/listFriend";
import listChats from "./Children/listChats";
export default {
    components: {
        listFriend,
        listChats,
    },
};
</script>

<style scoped></style>
