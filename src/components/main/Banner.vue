<script setup lang="ts">
import { reactive } from "vue";

const recommends = reactive([
    {id: 1, name: "分布式系统的特征、瓶颈以及性能指标介绍", bannerUrl: "https://cdn.tobebetterjavaer.com/paicoding/8b5865e9461948aed4aacffc62adbae7.jpg", jumpUrl: "", updateTime: "2024/07/24"},
    {id: 2, name: "分布式系统的特征、瓶颈以及性能指标介绍", bannerUrl: "https://cdn.tobebetterjavaer.com/paicoding/71505c62fb6375cbbd62af63964b2ad4.jpg", jumpUrl: "", updateTime: "2024/07/24"},
    {id: 3, name: "分布式系统的特征、瓶颈以及性能指标介绍", bannerUrl: "https://cdn.tobebetterjavaer.com/paicoding/147915cdddea55ce37c2c5ecfc7c089e.jpg", jumpUrl: "", updateTime: "2024/07/24"},
    {id: 4, name: "分布式系统的特征、瓶颈以及性能指标介绍", bannerUrl: "https://cdn.tobebetterjavaer.com/paicoding/dee73c8810cb699ae1ec774a54612080.jpg", jumpUrl: "", updateTime: "2024/07/24"}
]);
</script>

<template>
    <div class="recommend">
        <div v-for="item in recommends" :key="item.id" class="list_item">
            <el-image :src="item.bannerUrl" fit="fill" style="width: 100%; height: 150px;" />
            <div class="item_content">
                <el-link :href="item.jumpUrl" :underline="false">{{ item.name }}</el-link>
                <div class="author">
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
</template>

<style lang="scss" scoped>
.recommend {
    width: 100%;
    height: 350px;
    padding: 20px 156px;
    box-sizing: border-box;
    background-color: #e1af6c;
    display: flex;
    justify-content: space-between;

    .list_item {
        width: 285px;
        height: 310px;
        background-color: #fff;
        box-shadow: 0 6px 12px 0 rgb(0 0 0 / 25%);

        .item_content {
            width: 100%;
            padding: 20px;
            position: relative;
            top: -6px;
            box-sizing: border-box;

            a {
                font-size: 20px;
                font-weight: 500;
                margin-bottom: 15px;
            }
            a:hover {
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
</style>