<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import 'md-editor-v3/lib/preview.css';
import { MdPreview } from 'md-editor-v3';
import { onMounted, reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from 'element-plus'

import praisedIcon from "@/assets/praise.png";
import noPraisedIcon from "@/assets/praise_dark.png";
import heartIcon from "@/assets/heart.png";
import noHeartIcon from "@/assets/heart_dark.png";

import { fullUrl } from "@/utils/url";
import { articleApi } from "@/http/api";
import { tokenMgr } from "@/utils/token";

import Author from "@/components/Author.vue";
import AdvTemplate from "@/components/advs/AdvTemplate.vue";


const myself = ref(false);
const route = useRoute();
const router = useRouter();
const article = reactive({
    id: 0,
    title: "",
    content: "",
    updateTime: "",
    authorInfo: {
        id: 0,
        nickName: "",
        photo: ""
    },
    hasPraised: false,
    hasCollection: false,
});
const icon = {praise: [praisedIcon, noPraisedIcon], heart: [heartIcon, noHeartIcon]};


const getArticleDetails = async () => {
    const articleId = route.params.articleId;
    const data = await articleApi.getArticleDetails(articleId);
    Object.assign(article, data);
}
const changeUserState = async (type: string) => {
    if (!tokenMgr.hasToken()) {
        ElMessage.error("登录后开启功能");
        return;
    }
    if (type === 'praise') {
        await articleApi.changePraiseState(article.id, !article.hasPraised);
        article.hasPraised = !article.hasPraised;
    } else if (type === 'collection') {
        await articleApi.changeCollectionState(article.id, !article.hasCollection);
        article.hasCollection = !article.hasCollection;
    }
}
const setMySelf = (v: boolean) => {
    myself.value = v;
}
const deleteConfirm = () => {
    ElMessageBox.confirm(
        `确认删除《${article.title}》？`,
        '删除提醒',
        {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'error',
        }
    ).then(async () => {
        await articleApi.deleteArticle(article.id);
        ElMessage({
            type: 'success',
            message: '删除成功',
        });
        router.push("/");
    })
}
const edit = () => {
    router.push(`/editor/${article.id}`);
}

onMounted(async () => {
    getArticleDetails();
});
</script>

<template>
    <div class="preview_ext">
        <div class="preview_container">
            <div class="praise">
                <div class="img" @click="changeUserState('praise')">
                    <img :src="icon.praise[article.hasPraised ? 0 : 1]" />
                </div>
                <div class="img" @click="changeUserState('collection')">
                    <img :src="icon.heart[article.hasCollection ? 0 : 1]" />
                </div>
            </div>
            <div class="content">
                <el-text class="name">{{ article.title }}</el-text>
                <div class="author_info">
                    <el-avatar :src="fullUrl(article.authorInfo.photo)" />
                    <el-text style="color: #62749f;">{{ article.authorInfo.nickName }}</el-text>
                    <el-text style="margin-right: auto;">{{ article.updateTime }}</el-text>
                    <el-text v-if="myself" @click="edit" class="operate">
                        <el-icon>
                            <Edit />
                        </el-icon>
                        编辑
                    </el-text>
                    <el-text v-if="myself" @click="deleteConfirm()" class="operate">
                        <el-icon>
                            <Delete />
                        </el-icon>
                        删除
                    </el-text>
                </div>
                <el-divider />
                <MdPreview style="padding: 0;" :modelValue="article.content" />
            </div>
            <div class="author">
                <Author :authorId="article.authorInfo.id" :setMySelf="setMySelf" />
                <AdvTemplate type="Resources" />
                <AdvTemplate type="HotArticle" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.preview_ext {
    width: 100%;
    height: fit-content;
    min-height: calc(100vh - 110px);
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
                .operate {
                    cursor: pointer;
                }
                .operate:hover {
                    color: #ff6900;
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