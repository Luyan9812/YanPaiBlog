<script setup lang="ts">
import NotFound from "@/assets/404.png"
</script>

<template>
    <div class="container_404">
        <el-image :src="NotFound" />
        <el-text>哦哦~ 请求的资源不见了</el-text>
    </div>
</template>

<style lang="scss" scoped>
.container_404 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - 110px);
    background-color: #edaa26;

    .el-image {
        width: 500px;
        flex-grow: 0;  
    }
    .el-text {
        font-size: 18px;
        color: #fff;
        position: relative;
        top: -30px;
    }
}
</style>