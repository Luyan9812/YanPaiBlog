<script setup lang="ts">
import { reactive } from "vue";
import header from "@/assets/headers/0007.png";

const articles = reactive([
    {
        id: 1, 
        title: "分布式系统的特征、瓶颈以及性能指标介绍", 
        picture: "https://cdn.tobebetterjavaer.com/paicoding/8b5865e9461948aed4aacffc62adbae7.jpg", 
        summary: "分布式的概念存在年头有点久了，在正式进入我们《分布式专栏》之前，感觉有必要来聊一聊，什么是分布式，分布式特点是什么，它又有哪些问题，在了解完这个概念之后，再去看它的架构设计，理论奠基可能帮助会更大", 
        updateTime: "2022/10/08", 
        readNum: 5,
        praiseNum: 2,
        user: {
            id: 1, 
            nickName: "管理员", 
            photo: header
        }, 
        tags: [{id: 1, tagName: "Java"}, {id: 2, tagName: "Spring"}]
    },
    {
        id: 1, 
        title: "分布式系统的特征、瓶颈以及性能指标介绍", 
        picture: "", 
        summary: "分布式的概念存在年头有点久了，在正式进入我们《分布式专栏》之前，感觉有必要来聊一聊，什么是分布式，分布式特点是什么，它又有哪些问题，在了解完这个概念之后，再去看它的架构设计，理论奠基可能帮助会更大", 
        updateTime: "2022/10/08", 
        readNum: 5,
        praiseNum: 2,
        user: {
            id: 1, 
            nickName: "管理员", 
            photo: header
        }, 
        tags: [{id: 1, tagName: "Java"}]
    },
]);

const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}
</script>

<template>
    <div class="al_ext">
        <div class="al_container">
            <div v-for="article in articles" :key="article.id" class="article_item">
                <div class="item_content">
                    <div class="cl">
                        <el-link href="#" :underline="false">{{ article.title }}</el-link>
                        <el-text line-clamp="2">
                            {{ article.summary }}
                        </el-text>
                    </div>
                    <el-image v-if="article.picture !== ''" :src="article.picture" />
                </div>
                <div class="item_author">
                    <el-avatar :src="article.user.photo"/>
                    <el-text class="name">{{ article.user.nickName }}</el-text>
                    <el-text style="color: #97a3b7;">{{ article.updateTime }}</el-text>
                    <el-text class="eye">
                        <el-icon><View /></el-icon>
                        {{ article.readNum }}
                    </el-text>
                    <el-text class="eye" style="margin-right: auto;">
                        <el-icon><Star /></el-icon>
                        {{ article.praiseNum }}
                    </el-text>
                    <el-icon style="color: #212529; font-size: 12px; margin-right: 5px;"><PriceTag /></el-icon>
                    <template v-for="(tag, i) in article.tags" :key="tag.id">
                        <span style="font-size: 12px;">{{ i > 0 ? "、" : "" }}</span>
                        <el-link href="#" :underline="false">
                            {{ tag.tagName }}
                        </el-link>
                    </template>
                </div>
                <el-divider style="margin-top: 15px; margin-bottom: 5px;" />
            </div>
            <el-pagination background layout="prev, pager, next" :total="1000" @current-change="handleCurrentChange" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.al_ext {
    width: 900px;
    // flex-shrink: 0;
    height: fit-content;
    margin-right: 20px;

    .al_container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: fit-content;
        padding: 0 20px;
        box-sizing: border-box;
        background-color: #fff;

        .article_item {
            .item_content {
                display: flex;

                .cl {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;

                    .el-link {
                        font-weight: 500;
                        font-size: 18px;
                        color: #212529;
                        margin: 18px 0;
                    }
                    .el-link:hover {
                        color: #ff6900;
                    }
                    .el-text {
                        margin-bottom: 18px;
                    }
                }
                .el-image {
                    width: 180px;
                    height: 100px;
                    flex-shrink: 0;
                    margin-left: 20px;
                    margin-top: 20px;
                }
            }

            .item_author {
                display: flex;
                align-items: center;

                .el-avatar {
                    width: 32px;
                    height: 32px;
                }
                .el-text {
                    font-size: 12px;
                    color: #212529;
                }
                .name {
                    margin: 0 10px;
                    font-weight: 500;
                }
                .eye {
                    margin-left: 24px;
                }
                .el-link {
                    font-size: 12px;
                }
                .el-link:hover {
                    color: #ff6900;
                }
            }
        }
        .el-pagination {
            margin: 20px 0;
        }
    }
}
</style>