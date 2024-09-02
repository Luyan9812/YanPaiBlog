<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import { articleApi } from "@/http/api";
import Follow from "@/components/user/Follow.vue";
import ArticleList from "@/components/ArticleList.vue";


const tabs = reactive([
    {id: 1, title: "文章", active: true},
    {id: 2, title: "浏览记录", active: false},
    {id: 3, title: "关注", active: false},
    {id: 4, title: "收藏", active: false},
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
    tabs.map(tab => {
        tab.active = (id === tab.id);
    });
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
            <p v-for="tab in tabs" :key="tab.id" :class="{'tab_active': tab.active}" @click="selectTab(tab.id)">
                {{ tab.title }}
            </p>
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

            p {
                height: 50px;
                color: #000;
                font-size: 18px;
                font-weight: 500;
                line-height: 50px;
                margin: 0 50px 0 0;
                cursor: pointer;
            }
            p:hover {
                color: #ff8721;
            }
            .tab_active {
                color: #ff8721;
                border-bottom: 4px solid #ff8721;
            }
        }

        .el-divider {
            margin: 0;
        }
    }
</style>