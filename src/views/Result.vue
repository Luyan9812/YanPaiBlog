<script setup lang="ts">
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";

import { articleApi } from "@/http/api";
import ArticleList from "@/components/ArticleList.vue";

const route = useRoute();
const pageInfo = reactive({
    current: 1,
    pages: 0,
    total: 0,
    records: []
});
const queryParam = reactive({
    tagId: 0,
    title: "",
    type: "",
    currentPage: 1
});
const changePage = (value: number) => {
    queryParam.currentPage = value;
    queryData();
}
const queryData = async () => {
    let data;
    switch (queryParam.type) {
        case "tag": 
            data = await articleApi.getArticlesByTag(queryParam.tagId, queryParam.currentPage);
            break;
        case "search":
            data = await articleApi.search(queryParam.title, queryParam.currentPage);
            break;
    }
    Object.assign(pageInfo, data);
}

onMounted(() => {
    if (route.query.tag) {
        queryParam.type = "tag";
        queryParam.currentPage = 1;
        queryParam.tagId = route.query.tag;
    } else if (route.query.title) {
        queryParam.type = "search";
        queryParam.currentPage = 1;
        queryParam.title = route.query.title;
    } else {
        ElMessage.error('参数错误');
    }
    queryData();
});
</script>

<template>
    <div class="result_container">
        <el-text v-if="queryParam.type === 'search'" size="large" style="margin-top: 20px;">
            关键字“<span style="color: #409EFF;">{{ queryParam.title }}</span>”的搜索结果
        </el-text>
        <ArticleList style="margin: 0 auto;" :pageInfo="pageInfo" :changePage="changePage" />
    </div>
</template>

<style lang="scss" scoped>
.result_container {
    width: 1200px;
    min-height: calc(100vh - 110px);
    margin: auto;
    display: flex;
    flex-direction: column;
    align-content: center;
}
</style>