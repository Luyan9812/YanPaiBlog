<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import { fullUrl } from "@/utils/url";
import { articleApi } from "@/http/api";

import Search from "@/components/main/Search.vue";
import Banner from "@/components/main/Banner.vue";
import Resources from "@/components/advs/Resources.vue";
import AdvTemplate from "@/components/advs/AdvTemplate.vue";
import ArticleList from "@/components/ArticleList.vue";


const categoryId = ref(0);
const currentPage = ref(1);
const pageInfo = reactive({
    current: 1,
    pages: 0,
    total: 0,
    records: []
});


const changeCategory = (value: number) => {
    categoryId.value = value;
    listArticles(categoryId.value, currentPage.value);
}
const changePage = (value: number) => {
    currentPage.value = value;
    listArticles(categoryId.value, currentPage.value);
}
const listArticles = async (categoryId: number, currentPage: number) => {
    const data = await articleApi.list(categoryId, currentPage);
    Object.assign(pageInfo, data);
}

onMounted(async () => {
    listArticles(categoryId.value, currentPage.value);
});

</script>

<template>
    <div class="container">
        <Search :changeCategory="changeCategory" />
        <Banner />
        <div class="article_content">
            <ArticleList :pageInfo="pageInfo" :changePage="changePage" />
            <div class="resources">
                <AdvTemplate type="Resources" />
                <AdvTemplate type="HotArticle" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    min-height: calc(100vh - 110px);
    background-color: #f7f8fa;

    .article_content {
        display: flex;
        padding: 0;
        margin-top: 20px;
        box-sizing: border-box;
        justify-content: center;

        .resources {
            width: 280px;
            flex-shrink: 0;
        }
    }
}
</style>