<script setup lang="ts">
import { onMounted, reactive } from "vue";

import { fullUrl } from "@/utils/url";
import { articleApi } from "@/http/api";

const props = defineProps(["category"]);
const pageInfo = reactive({
    current: 1,
    pages: 0,
    size: 10,
    total: 0,
    records: []
});
const listArticles = async (categoryId: number, currentPage: number) => {
    const data = await articleApi.list(categoryId, currentPage);
    Object.assign(pageInfo, data);
    console.log(pageInfo);
    
}
const handleCurrentChange = (val: number) => {
    console.log(`current page: ${val}`)
}

onMounted(async () => {
    listArticles(props.category, 1);
});
</script>

<template>
    <div class="al_ext">
        <div class="al_container">
            <div v-for="article in pageInfo.records" :key="article.id" class="article_item">
                <div class="item_content">
                    <div class="cl">
                        <el-link href="#" :underline="false">{{ article.title }}</el-link>
                        <el-text line-clamp="2">
                            {{ article.summary }}
                        </el-text>
                    </div>
                    <el-image v-if="article.picture" :src="fullUrl(article.picture)" />
                </div>
                <div class="item_author">
                    <el-avatar :src="fullUrl(article.userInfo.photo)"/>
                    <el-text class="name">{{ article.userInfo.nickName }}</el-text>
                    <el-text style="color: #97a3b7;">{{ article.updateTime }}</el-text>
                    <el-text class="eye">
                        <el-icon><View /></el-icon>
                        {{ article.readNums }}
                    </el-text>
                    <el-text class="eye" style="margin-right: auto;">
                        <el-icon><Star /></el-icon>
                        {{ article.collectionNums }}
                    </el-text>
                    <el-icon style="color: #212529; font-size: 12px; margin-right: 5px;"><PriceTag /></el-icon>
                    <template v-for="(tag, i) in article.tags" :key="tag.id">
                        <span style="font-size: 12px;">{{ i > 0 ? "&nbsp;&nbsp;&nbsp;&nbsp;" : "" }}</span>
                        <el-link href="#" :underline="false">
                            {{ tag.tagName }}
                        </el-link>
                    </template>
                </div>
                <el-divider style="margin-top: 15px; margin-bottom: 5px;" />
            </div>
            <el-pagination background layout="prev, pager, next" :page-size="10" :total="pageInfo.total" @current-change="handleCurrentChange" />
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
            width: 100%;

            .item_content {
                display: flex;

                .cl {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    margin-right: auto;

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
                        align-self: flex-start;
                    }
                }
                .el-image {
                    width: 180px;
                    height: 100px;
                    flex-shrink: 0;
                    margin-left: 20px;
                    margin-top: 20px;
                    margin-bottom: 10px;
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