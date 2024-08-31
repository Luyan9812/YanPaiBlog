<script setup lang="ts">
import { onMounted, reactive } from "vue";

import { userApi } from '@/http/api';
import { fullUrl } from '@/utils/url';

const userInfo = reactive({
    id: 0,
    userId: 0,
    nickName: "",
    photo: "",
    position: "",
    company: "",
    profile: "",
    jointDays: "",
    fansNums: "",
    followedNums: "",
    doneDegree: 0,
    createTime: "",
    updateTime: ""
});

const getUserInfo = async () => {
    const data = await userApi.getUserInfo();
    Object.assign(userInfo, data);
    let finish = 3;
    if (!userInfo.company) {
        finish--;
        userInfo.company = "公司";
    }
    if (!userInfo.position) {
        finish--;
        userInfo.position = "职位";
    }
    if (!userInfo.profile) {
        finish--;
        userInfo.profile = "点击添加简介，让大家认识你吧";
    }
    userInfo.photo = fullUrl(userInfo.photo);
    userInfo.doneDegree = parseInt(`${100 * finish / 3}`);
}

onMounted(async () => {
    getUserInfo();
});
</script>

<template>
    <div class="user-bg">
        <div class="user-head">
            <el-avatar :src="userInfo.photo" />
            <el-text class="name">{{ userInfo.nickName }}</el-text>
            <div class="job_container">
                <div class="job">
                    <el-icon><Briefcase /></el-icon>
                    {{ userInfo.company }}
                </div>
                <div class="job">
                    <el-icon><Avatar /></el-icon>
                    {{ userInfo.position }}
                </div>
            </div>
            <el-text class="info">{{ userInfo.profile }}</el-text>
            <div class="op">
                <el-text style="margin-right: 50px; font-size: 16px;">个人资料完善度：{{ userInfo.doneDegree }}%</el-text>
                <el-link style="font-size: 16px;">去编辑></el-link>
            </div>
            <div class="follow">
                <div class="follow_item">
                    <el-text>加入天数</el-text>
                    <el-text class="num">{{ userInfo.jointDays }}</el-text>
                </div>
                <el-divider direction="vertical" />
                <div class="follow_item">
                    <el-text>关注数</el-text>
                    <el-text class="num">{{ userInfo.followedNums }}</el-text>
                </div>
                <el-divider direction="vertical" />
                <div class="follow_item">
                    <el-text>粉丝数</el-text>
                    <el-text class="num">{{ userInfo.fansNums }}</el-text>
                </div>
            </div>
        </div>
        <div class="user-bg-mask"></div>
    </div>
</template>

<style scoped lang="scss">
.user-bg {
    background-image: url(@/assets/lucky.png);
    background-position: top;
    background-repeat: no-repeat;
    background-size: auto 288px;
    position: relative;
    height: 268px;
    padding-top: 42px;

    .user-head {
        position: relative;
        border-radius: 8px;
        padding-top: 36px;
        clip-path: path("M85 0c18.703 0 35.339 8.853 45.945 22.597.41.53.84 1.132 1.293 1.804A24 24 0 0 0 152.148 35H1188c6.627 0 12 5.373 12 12v169c0 6.627-5.373 12-12 12H12c-6.627 0-12-5.373-12-12V47c0-6.627 5.373-12 12-12h5.857a24 24 0 0 0 19.916-10.608c.478-.712.933-1.345 1.364-1.901C49.747 8.807 66.345 0 85 0Z");
        background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.6), hsla(0, 0%, 100%, 0.9) 76%, #fff);
        backdrop-filter: blur(10px);
        width: 1200px;
        height: 168px;
        margin: 0 auto;
        z-index: 10;

        .el-avatar {
            width: 90px;
            height: 90px;
            position: absolute;
            top: 10px;
            left: 40px;
        }

        .name {
            font-size: 24px;
            font-weight: 500;
            color: #212529;
            position: absolute;
            left: 160px;
            top: 50px;
        }

        .job_container {
            display: flex;
            position: absolute;
            top: 120px;
            left: 25px;

            .job {
                width: fit-content;
                height: 28px;
                font-size: 14px;
                line-height: 28px;
                border-radius: 14px;
                padding: 0 10px;
                color: #8a919f;
                margin-left: 10px;
                background-color: rgba(51, 51, 51, .05);

                .el-icon {
                    color: #666666;
                }
            }
        }

        .info {
            color: #212529;
            font-size: 16px;
            position: absolute;
            top: 165px;
            left: 35px;
        }

        .op {
            position: absolute;
            top: 165px;
            right: 40px;
            display: flex;
            align-items: baseline;
        }

        .follow {
            position: absolute;
            top: 60px;
            right: 40px;
            display: flex;

            .follow_item {
                display: flex;
                flex-direction: column;

                .el-text {
                    font-size: 16px;
                    font-weight: 500;
                    color: #999999;
                }
                .num {
                    color: #515767;
                    margin-top: 16px;
                }
            }

            .el-divider {
                height: 25px;
                margin: 0 35px;
                background-color: #999;
            }
        }
    }

    .user-bg-mask {
        background: linear-gradient(180deg, hsla(0, 0%, 98%, 0), hsla(0, 0%, 98%, 0.95) 85%, #f9f9f9);
        bottom: 0;
        height: 100px;
        left: 0;
        position: absolute;
        width: 100%;
    }
}
</style>