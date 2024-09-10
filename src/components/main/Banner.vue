<script setup lang="ts">
import { onMounted, reactive } from "vue";

import { fullUrl } from "@/utils/url";
import { configApi } from "@/http/api";

const recommends = reactive([]);

onMounted(async () => {
    const data = await configApi.getConfigByType(1);
    recommends.length = 0;
    data.forEach(element => {
        recommends.push(element);
    });
});
</script>

<template>
    <div class="rmd_ext">
        <div class="rmd_container">
            <div v-for="item in recommends" :key="item.id" class="list_item">
                <el-image :src="fullUrl(item.bannerUrl)" fit="fill" style="width: 100%; height: 150px;" />
                <div class="item_content">
                    <el-link :href="item.jumpUrl" :underline="false">{{ item.name }}</el-link>
                    <div class="author" style="margin-top: auto;">
                        <div></div>
                        <el-text>管理员</el-text>
                    </div>
                    <div class="author">
                        <div style="background-color: #a2a2a2;"></div>
                        <el-text style="font-weight: 400;">{{ item.updateTime }}</el-text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.rmd_ext {
    width: 100%;
    min-width: 1200px;
    height: fit-content;
    background-color: #e1af6c;

    .rmd_container {
        width: 1200px;
        height: 350px;
        padding: 20px 0;
        margin: auto;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;

        .list_item {
            width: 285px;
            height: 310px;
            background-color: #fff;
            box-shadow: 0 6px 12px 0 rgb(0 0 0 / 25%);

            .item_content {
                width: 100%;
                height: 160px;
                padding: 20px;
                padding-bottom: 10px;
                box-sizing: border-box;
                position: relative;
                top: -5.5px;
                display: flex;
                flex-direction: column;

                .el-link {
                    font-size: 18px;
                    font-weight: 500;
                }
                .el-link:hover {
                    color: #ff8721;
                }

                .author {
                    display: flex;
                    align-items: center;
                    margin-bottom: 6px;

                    div {
                        width: 10px;
                        height: 10px;
                        border-radius: 5px;
                        margin-right: 10px;
                        background-color: #e1af6c;
                    }
                    span {
                        font-size: 16px;
                        font-weight: bold;
                        color: #8a919f;
                    }
                }
            }
        }
    }
}
</style>