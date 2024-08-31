<script setup lang="ts">
    import Search from "@/components/main/Search.vue";
    import Banner from "@/components/main/Banner.vue";
    import Resources from "@/components/advs/Resources.vue";
    import AdvTemplate from "@/components/advs/AdvTemplate.vue";
    import ArticleList from "@/components/ArticleList.vue";
    
</script>

<template>
    <div class="container">
        <Search />
        <Banner />
        <div class="article_content">
            <ArticleList />
            <div class="resources">
                <AdvTemplate type="Resources" />
                <AdvTemplate type="AdvTemplate" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    background-color: #f7f8fa;

    .article_content {
        display: flex;
        padding: 0 156px;
        margin-top: 20px;
        box-sizing: border-box;

        .resources {
            width: 300px;
            flex-shrink: 0;
        }
    }
}
</style>