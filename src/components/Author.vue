<script setup lang="ts">
import { reactive } from "vue";
import header from "@/assets/headers/0007.png";

const authorInfo = reactive({
    nickName: "管理员",
    photo: header,
    jointDays: 12,
    hasFollowed: false,  // 当前用户是否关注了这个作者
    articleNum: 8,
    praiseNum: 1,
    heartNum: 1,
    fansNum: 1
});
const numbers = reactive([
    {name: "文章数", num: authorInfo.articleNum},
    {name: "点赞数", num: authorInfo.praiseNum},
    {name: "收藏数", num: authorInfo.heartNum},
    {name: "粉丝数", num: authorInfo.fansNum},
]);
</script>

<template>
    <div class="author_container">
        <el-text>作者介绍</el-text>
        <el-avatar :src="authorInfo.photo"/>
        <el-text class="name">{{ authorInfo.nickName }}</el-text>
        <el-text class="joint_days">
            已加入 {{ authorInfo.jointDays }} 天
            <img src="@/assets/v.svg"/>
        </el-text>
        <el-button @click="authorInfo.hasFollowed = !authorInfo.hasFollowed" type="primary">
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