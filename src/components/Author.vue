<script setup lang="ts">
import { reactive, ref, watch } from "vue";

import { userApi } from "@/http/api";
import { fullUrl } from "@/utils/url";

const btnDisabled = ref(false);
const props = defineProps(["authorId", "setMySelf"]);
const authorInfo = reactive({
    userId: 0,
    nickName: "",
    photo: "",
    jointDays: 0,
    hasFollowed: false,  // 当前用户是否关注了这个作者
    publishNum: 0,
    praisedNum: 0,
    collectionNum: 0,
    fansNum: 0,
    myself: false
});
const numbers = reactive([
    {name: "文章数", alias: "publishNum", num: 0},
    {name: "点赞数", alias: "praisedNum", num: 0},
    {name: "收藏数", alias: "collectionNum", num: 0},
    {name: "粉丝数", alias: "fansNum", num: 0},
]);
const getAuthorInfo = async (authorId: number) => {
    const data = await userApi.getAuthorInfo(authorId);
    Object.assign(authorInfo, data);
    numbers.forEach((item) => {
        item.num = authorInfo[item.alias];
    });
    props.setMySelf(authorInfo.myself);
}
const changeFollowState = async () => {
    btnDisabled.value = true;
    const authorId = authorInfo.userId;
    const followState = !authorInfo.hasFollowed;
    await userApi.changeFollowState(authorId, followState);
    btnDisabled.value = false;
}

watch(() => props.authorId, async (val) => {
    if (val <= 0) return;
    getAuthorInfo(val);
});
</script>

<template>
    <div class="author_container">
        <el-text>作者介绍</el-text>
        <el-avatar :src="fullUrl(authorInfo.photo)"/>
        <el-text class="name">{{ authorInfo.nickName }}</el-text>
        <el-text class="joint_days">
            已加入 {{ authorInfo.jointDays }} 天
            <img src="@/assets/v.svg"/>
        </el-text>
        <el-button v-if="!authorInfo.myself" :disabled="btnDisabled" @click="changeFollowState()" type="primary">
            {{ authorInfo.hasFollowed ? "取消关注" : "关注" }}
        </el-button>
        <el-divider />
        <div class="num">
            <div v-for="item in numbers" :key="item.name">
                <p style="font-size: 12px; margin-bottom: 10px;">{{ item.name }}</p>
                <p>{{ item.num }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .author_container {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        background: url('@/assets/author.svg') no-repeat;
        background-position: right top;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgb(3 27 78 / 6%);

        .el-text {
            margin: 20px;
            font-size: 16px;
            font-weight: 500;
            color: #212529;
            align-self: flex-start;
        }
        .name {
            margin: 16px 0;
            align-self: center;
        }
        .joint_days {
            font-size: 12px;
            color: #999;
            align-self: center;
            margin: 0;
            margin-bottom: 16px;
        }
        .el-avatar {
            width: 80px;
            height: 80px;
            align-self: center;
        }

        .el-button {
            width: 90px;
            height: 30px;
            border-radius: 0;
            align-self: center;
        }
        .el-divider {
            width: 260px;
            margin: 20px 0;
            align-self: center;
        }
        .num {
            display: flex;
            margin-bottom: 20px;
            padding: 0 20px;
            box-sizing: border-box;
            justify-content: space-around;

            p {
                color: #999;
                font-size: 16px;
                text-align: center;
            }
        }
    }
</style>