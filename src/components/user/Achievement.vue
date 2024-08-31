<script setup lang="ts">
import { reactive } from "vue";
import p1 from "@/assets/achievement_01.png";
import p2 from "@/assets/achievement_02.png";
import p3 from "@/assets/achievement_03.png";
import p4 from "@/assets/achievement_04.png";

const data = reactive([
    {id: 1, img: p1, title: "已发布文章", num: 0, suffix: "篇"},
    {id: 2, img: p2, title: "文章被点赞", num: 0, suffix: "次"},
    {id: 3, img: p3, title: "文章被阅读", num: 10, suffix: "次"},
    {id: 4, img: p4, title: "文章被收藏", num: 0, suffix: "篇"},
]);
</script>

<template>
    <div class="achievement">
        <el-text class="title">个人成就</el-text>
        <div v-for="item in data" :key="item.id" class="item">
            <el-image :src="item.img" />
            <el-text style="margin-right: auto;">{{ item.title }}</el-text>
            <el-text style="font-weight: 600;">{{ item.num }}&nbsp;&nbsp;{{ item.suffix }}</el-text>
        </div>
    </div>
</template>

<style scoped lang="scss">
.achievement {
    width: 300px;
    height: fit-content;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 4px;
    display: flex;
    margin-bottom: 20px;
    flex-direction: column;
    flex-shrink: 0;
    background-color: #fff;

    .title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 24px;
        align-self: flex-start;
        color: rgb(51, 51, 51);
    }

    .item {
        display: flex;
        align-items: center;
        margin: 10px 0;

        .el-image {
            width: 32px;
            height: 32px;
            margin-right: 10px;
        }

        .el-text {
            font-size: 16px;
            color: #212529;
        }
    }
}
</style>