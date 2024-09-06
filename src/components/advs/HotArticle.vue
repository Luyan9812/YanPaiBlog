<script setup lang="ts">
import { onMounted, reactive } from "vue";

import { articleApi } from "@/http/api";

const articles = reactive([]);

onMounted(async () => {
    const data = await articleApi.getHotList();
    articles.length = 0;
    data.forEach(element => {
        articles.push(element);
    });
    articles.map((article, i) => {
        if (article.title.length > 25) {
            article.title = article.title.substring(0, 25) + "...";
        }
        article.css = {rank: true};
        switch (i) {
            case 0: 
                article.css.rank1 = true;
                break;
            case 1:
                article.css.rank2 = true;
                break;
            case 2:
                article.css.rank3 = true;
                break;
            default: 
                article.css.rank4 = true;
                break;
        }
    });
});
</script>

<template>
    <div v-for="(article, i) in articles" :key="article.id" class="book_item">
        <p :class="article.css">{{ i + 1 }}</p>
        <el-link :underline="false" :href="`/article/${article.id}`">{{ article.title }}</el-link>
    </div> 
</template>

<style lang="scss" scoped>
.book_item {
    margin: 16px 0;
    padding: 0 20px;
    display: flex;
    align-items: center;
    box-sizing: border-box;

    .el-link {
        font-size: 14px;
        color: #212529;
        font-weight: 400;
    }
    .el-link:hover {
        color: #ff6900;
    }

    .rank {
        width: 18px;
        height: 18px;
        font-size: 16px;
        color: #fff;
        font-weight: 600;
        text-align: center;
        line-height: 18px;
        font-style: italic;
        margin-right: 10px;
        flex-shrink: 0;
        padding-right: 3px;
        box-sizing: border-box;
    }

    .rank1 {
        background-color: #f85959;
    }

    .rank2 {
        background-color: #fe6617;
    }

    .rank3 {
        background-color: #f59e2f;
    }

    .rank4 {
        background-color: #ccd0d7;
    }
}
</style>