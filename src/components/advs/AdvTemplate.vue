<script setup lang="ts">
import Resources from "@/components/advs/Resources.vue";
import HotArticle from "@/components/advs/HotArticle.vue";

defineProps(["type"])
</script>

<template>
    <div class="at_container">
        <div class="img_top">
            {{ type === 'Resources' ? "资源分享" : "热门文章" }}
        </div>
        <Resources v-if="type === 'Resources'" />
        <HotArticle v-else />
    </div>
</template>

<style lang="scss" scoped>
    .at_container {
        width: 100%;
        margin-bottom: 20px;
        padding-bottom: 20px;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgb(3 27 78 / 6%);

        .img_top {
            width: 100%;
            height: 60px;
            font-size: 18px;
            font-weight: 400;
            line-height: 60px;
            padding-left: 20px;
            box-sizing: border-box;
            background-image: url("@/assets/adv.png");
            background-repeat: no-repeat;
            background-position:0% 80%;
        }  
    }
</style>