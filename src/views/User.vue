<script setup lang="ts">
import UserHeader from '@/components/user/UserHeader.vue';
import Trace from "@/components/user/Trace.vue";
import Achievement from "@/components/user/Achievement.vue";
</script>

<template>
    <div class="user">
        <UserHeader />
        <div class="content">
            <Trace />
            <Achievement />
        </div>
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