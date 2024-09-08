<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import { articleApi } from "@/http/api";
import Follow from "@/components/user/Follow.vue";
import Switcher from "@/components/Switcher.vue";
import ArticleList from "@/components/ArticleList.vue";


const tabs = reactive([
    {id: 1, title: "文章"},
    {id: 2, title: "浏览记录"},
    {id: 3, title: "关注"},
    {id: 4, title: "收藏"},
]);
const pageInfo = reactive({
    current: 1,
    pages: 0,
    total: 0,
    records: []
});

const changePage = (value: number) => {
    getArticleList(value);
}
const getPublishedArticles = async (currentPage: number) => {
    const data = await articleApi.getPublishedArticles(currentPage);
    Object.assign(pageInfo, data);
}
const getReadArticles = async (currentPage: number) => {
    const data = await articleApi.getReadArticles(currentPage);
    Object.assign(pageInfo, data);
}
const getCollectionArticles = async (currentPage: number) => {
    const data = await articleApi.getCollectionArticles(currentPage);
    Object.assign(pageInfo, data);
}
const getArticleList = async (currentPage: number) => {
    switch(selectedTab.value) {
        case 1: getPublishedArticles(currentPage); break;
        case 2: getReadArticles(currentPage); break;
        case 4: getCollectionArticles(currentPage); break;
    }
}

const selectedTab = ref(1);
const selectTab = (id: number) => {
    selectedTab.value = id;
    getArticleList(1);
}

onMounted(async () => {
    getArticleList(1);
});
</script>

<template>
    <div class="trace_container">
        <div class="header">
            <Switcher :tabs="tabs" :border="true" :onSelect="selectTab" />
        </div>
        <el-divider />
        <ArticleList v-if="selectedTab !== 3" :pageInfo="pageInfo" :changePage="changePage" />
        <Follow v-else />
    </div>
</template>

<style scoped lang="scss">
    .trace_container {
        width: 900px;
        margin-right: 20px;
        border-radius: 4px;
        margin-bottom: 20px;
        background-color: #fff;

        .header {
            display: flex;
            padding: 0 20px;
            box-sizing: border-box;
        }

        .el-divider {
            margin: 0;
        }
    }
</style>