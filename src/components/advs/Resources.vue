<script setup lang="ts">
import { reactive } from "vue";

const resources = reactive([
    {id: 1, name: "高并发手册", content: "内容肝、配图美、可读性高，高并发经典之作！", bannerUrl: "https://img11.360buyimg.com/ddimg/jfs/t1/159287/38/34144/95370/63c7ee9aFc184be3d/94e07dc5dd5b573f.png", jumpUrl: "", updateTime: "2024/07/24"},
    {id: 2, name: "高并发手册", content: "内容肝、配图美、可读性高，高并发经典之作！", bannerUrl: "https://img11.360buyimg.com/ddimg/jfs/t1/159287/38/34144/95370/63c7ee9aFc184be3d/94e07dc5dd5b573f.png", jumpUrl: "", updateTime: "2024/07/24"},
]);
</script>

<template>
    <el-row v-for="res in resources" :key="res.id">
        <el-col :span="8">
            <el-image :src="res.bannerUrl" />
        </el-col>
        <el-col :span="16">
            <a :href="res.jumpUrl">{{ res.name }}</a>
            <span>{{ res.content }}</span>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
    .el-row {
        width: 100%;
        padding: 0 20px;
        margin-top: 10px;
        box-sizing: border-box;

        .el-image {
            width: 75px;
            height: 100px;
        }

        a {
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            color: #212529;
            margin-bottom: 10px;
            text-decoration: none;
            display: block;
        }
        a:hover {
            color: #ff6900;
        }

        span {
            font-size: 14px;
            color: #999;
        }
    }
</style>