<template>
<div class="row">
    <div class="col-3 " id="listchat">
        <listChats />
    </div>

    <div class="col-6  " id="boxchat">
        <boxChat />
    </div>
    <div class="col-3 " id="detail">
        <detailsUser />
    </div>
</div>
</template>

<script>
import listChats from "./Children/listChats";
import boxChat from "./Children/boxChat";
import detailsUser from "./Children/details";

export default {
    mounted() {
        document.getElementById("listchat").style.maxHeight =
            window.innerHeight + "px";
        document.getElementById("boxchat").style.maxHeight =
            window.innerHeight + "px";
        document.getElementById("detail").style.maxHeight =
            window.innerHeight + "px";
    },

    components: {
        listChats,
        boxChat,
        detailsUser,
    },
};
</script>

<style scoped></style>
