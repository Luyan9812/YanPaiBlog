<script setup lang="ts">
import { ref } from "vue";
import emitter from "@/utils/emitter";
import Trace from "@/components/user/Trace.vue";
import UserHeader from '@/components/user/UserHeader.vue';
import Achievement from "@/components/user/Achievement.vue";
import PersonDataDialog from "@/components/PersonDataDialog.vue";

const userHeader = ref();
const updateInfoSuccess = () => {
    userHeader.value.getUserInfo();
    emitter.emit("changeDialogState", {name: "PersonData", state: false});
}
</script>

<template>
    <div class="user">
        <UserHeader ref="userHeader" />
        <div class="content">
            <Trace />
            <Achievement />
        </div>
        <PersonDataDialog :onSuccess="updateInfoSuccess" />
    </div>
</template>

<style lang="scss" scoped>
.user {
    width: 100%;
    min-height: calc(100vh - 110px);
    background-color: #f7f8f9;

    .content {
        display: flex;
        padding: 0 156px;
        box-sizing: border-box;
        justify-content: center;
    }
}
</style>