<script setup lang="ts">
import { reactive } from "vue";
import header from "@/assets/headers/0005.png";

const tabs = reactive([
    {id: 1, title: "关注列表", active: true},
    {id: 2, title: "粉丝列表", active: false},
]);

const follows = reactive([
    {id: 1, photo: header, nickName: "张三", followed: true},
    {id: 2, photo: header, nickName: "李四", followed: false},
    {id: 3, photo: header, nickName: "王五", followed: true},
]);

function selectTab(id: number) {
    tabs.map(tab => {
        tab.active = (id === tab.id);
    });
}

function changeFollowState(id: number) {
    follows.map(follow => {
        if (follow.id !== id) return;
        follow.followed = !follow.followed;
    })
}
</script>

<template>
    <div class="follow_container">
        <div class="header">
            <template v-for="(tab, i) in tabs" :key="tab.id">
                <el-divider v-if="i > 0" direction="vertical"  />
                <p :class="{'tab_active': tab.active}" @click="selectTab(tab.id)">
                    {{ tab.title }}
                </p>
            </template>
        </div>
        <div v-for="follow in follows" :key="follow.id" class="follow_item">
            <el-avatar :src="follow.photo" />
            <el-text>{{ follow.nickName }}</el-text>
            <el-button size="small" round @click="changeFollowState(follow.id)">
                {{ follow.followed ? "取消关注" : "关 注" }}
            </el-button>
        </div>
    </div>    
</template>

<style scoped lang="scss">
.follow_container {
    width: 900px;

    .header {
        display: flex;
        padding: 0 20px;
        align-items: center;
        box-sizing: border-box;

        p {
            height: 50px;
            color: #000;
            font-size: 18px;
            font-weight: 500;
            line-height: 50px;
            cursor: pointer;
        }
        p:hover {
            color: #ff8721;
        }
        .tab_active {
            color: #ff8721;
        }

        .el-divider {
            height: 20px;
            margin: 20px;
        }
    }

    .follow_item {
        display: flex;
        padding: 0 20px;
        margin-bottom: 20px;
        align-items: center;
        box-sizing: border-box;

        .el-avatar {
            width: 50px;
            height: 50px;
            margin-right: 15px;
        }

        .el-text {
            font-size: 18px;
            color: #000;
            margin-right: auto;
        }

        .el-button {
            width: 80px;
        }
    }
}
</style>