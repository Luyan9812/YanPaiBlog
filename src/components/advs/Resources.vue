<script setup lang="ts">
import { onMounted, reactive } from "vue";

import { fullUrl } from "@/utils/url";
import { configApi } from "@/http/api";

const resources = reactive([]);

onMounted(async () => {
    const data = await configApi.getConfigByType(2);
    resources.length = 0;
    data.forEach(element => {
        resources.push(element);
    });
});
</script>

<template>
    <div class="res_item"  v-for="res in resources" :key="res.id">
        <el-image :src="fullUrl(res.bannerUrl)" />
        <div class="text">
            <a :href="res.jumpUrl">{{ res.name }}</a>
            <span>{{ res.content }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.res_item {
    margin-top: 10px;
    padding: 0 20px;
    display: flex;
    box-sizing: border-box;

    .el-image {
        width: 75px;
        height: 100px;
        flex-grow: 0;
        flex-shrink: 0;
        margin-right: 10px;
    }

    .text {
        a {
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            color: #212529;
            margin-bottom: 10px;
            text-decoration: none;
            display: block;
        }
        a:hover {
            color: #ff6900;
        }

        span {
            font-size: 14px;
            color: #999;
        }
    }
}
</style>