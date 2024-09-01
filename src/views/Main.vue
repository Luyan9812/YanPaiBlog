<script setup lang="ts">
    import { ref } from "vue";

    import Search from "@/components/main/Search.vue";
    import Banner from "@/components/main/Banner.vue";
    import Resources from "@/components/advs/Resources.vue";
    import AdvTemplate from "@/components/advs/AdvTemplate.vue";
    import ArticleList from "@/components/ArticleList.vue";
    
    const category = ref(0)


    const changeCategory = (value: number) => {
        category.value = value;
    }

</script>

<template>
    <div class="container">
        <Search :changeCategory="changeCategory" />
        <Banner />
        <div class="article_content">
            <ArticleList :category="category" />
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