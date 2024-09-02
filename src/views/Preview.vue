<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { useRoute } from 'vue-router';

import { articleApi } from "@/http/api";
import { fullUrl } from "@/utils/url";

import Author from "@/components/Author.vue";
import AdvTemplate from "@/components/advs/AdvTemplate.vue";

import 'md-editor-v3/lib/preview.css';
import { MdPreview } from 'md-editor-v3';

const route = useRoute();
const article = reactive({
    id: 0,
    title: "",
    content: "",
    updateTime: "",
    authorInfo: {
        id: 0,
        nickName: "",
        photo: ""
    }
});


const getArticleDetails = async () => {
    const articleId = route.query.id;
    const data = await articleApi.getArticleDetails(articleId);
    Object.assign(article, data);
}

onMounted(async () => {
    getArticleDetails();
});
</script>

<template>
    <div class="preview_ext">
        <div class="preview_container">
            <div class="praise">
                <div class="img">
                    <img src="@/assets/praise_dark.png" />
                </div>
                <div class="img">
                    <img src="@/assets/heart_dark.png" />
                </div>
            </div>
            <div class="content">
                <el-text class="name">{{ article.title }}</el-text>
                <div class="author_info">
                    <el-avatar :src="fullUrl(article.authorInfo.photo)" />
                    <el-text style="color: #62749f;">{{ article.authorInfo.nickName }}</el-text>
                    <el-text>{{ article.updateTime }}</el-text>
                </div>
                <el-divider />
                <MdPreview style="padding: 0;" :modelValue="article.content" />
            </div>
            <div class="author">
                <Author :authorId="article.authorInfo.id" />
                <AdvTemplate type="Resources" />
                <AdvTemplate type="AdvTemplate" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.preview_ext {
    width: 100%;
    height: fit-content;
    background-color: #f7f8fa;

    .preview_container {
        width: 1200px;
        display: flex;
        padding: 0;
        margin: auto;
        box-sizing: border-box;

        .praise {
            width: 48px;
            margin-top: 100px;
            cursor: pointer;

            .img {
                width: 48px;
                height: 48px;
                position: fixed;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 24px;
                background-color: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);

                img {
                    width: 22px;
                    height: 22px;
                }
            }
            .img:last-child {
                margin-top: 80px;
                img {
                    width: 24px;
                    height: 24px;
                }
            }
        }

        .content {
            width: 820px;
            height: fit-content;
            margin: 20px;
            padding: 20px;
            box-sizing: border-box;
            flex-grow: 2;
            flex-shrink: 0;
            background-color: #fff;
            box-shadow: 0 2px 4px 0 rgb(3 27 78 / 6%);

            .el-text {
                font-size: 26px;
                color: #212529;
            }
            .author_info {
                display: flex;
                align-content: center;
                margin-top: 20px;

                .el-avatar {
                    width: 22px;
                    height: 22px;
                    margin-right: 10px;
                }
                .el-text {
                    font-size: 14px;
                    color: #999;
                    margin-right: 10px;
                }
            }
            .el-divider {
                margin-bottom: 0;
            }
            ::v-deep .md-editor-preview-wrapper {
                padding: 0;
            }
        }

        .author {
            width: 280px;
            margin: 20px 0;
        }
    }
}
</style>