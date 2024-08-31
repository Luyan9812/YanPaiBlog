<script setup lang="ts">
import { reactive } from "vue";

const articles = reactive([
    {id: 1, name: "分布式系统的特征、瓶颈以及性能指标介绍", jumpUrl: ""},
    {id: 2, name: "分布式系统的38个知识点", jumpUrl: ""},
    {id: 3, name: "官宣：技术派上线了！⭐️一款好用又强大的开源社区，学编程，就上技术派?", jumpUrl: ""},
    {id: 4, name: "分布式系统的8个谬误", jumpUrl: ""},
    {id: 5, name: "技术派全方位视角解读", jumpUrl: ""},
    {id: 6, name: "技术派的知识星球，开通啦！附 120 篇技术派的详细教程！", jumpUrl: ""},
]);

articles.map((article, i) => {
    if (article.name.length > 25) {
        article.name = article.name.substring(0, 25) + "...";
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
</script>

<template>
    <div v-for="(article, i) in articles" :key="article.id" class="book_item">
        <p :class="article.css">{{ i + 1 }}</p>
        <el-link :underline="false" :src="article.jumpUrl">{{ article.name }}</el-link>
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