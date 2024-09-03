<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import { userApi } from "@/http/api";
import { fullUrl } from "@/utils/url";


const relations = reactive([]);

const changeFollowState = async (id: number) => {
    relations.forEach(async user => {
        if (user.id !== id) return;
        await userApi.changeFollowState(id, !user.hasFollowed);
        user.hasFollowed = !user.hasFollowed;
    })
}
const getFansOrFollow = async () => {
    let data;
    switch(selectedTab.value) {
        case 1: data = await userApi.getFollowList(); break
        case 2: data = await userApi.getFansList(); break;
    }
    if (data) {
        console.log(data);
        
        relations.length = 0;
        data.forEach(element => {
            relations.push(element);
        });
    }
}

const selectedTab = ref(1);
const tabs = reactive([
    {id: 1, title: "关注列表", active: true},
    {id: 2, title: "粉丝列表", active: false},
]);
const selectTab = (id: number) => {
    tabs.map(tab => {
        tab.active = (id === tab.id);
    });
    selectedTab.value = id;
    getFansOrFollow();
}

onMounted(async () => {
    getFansOrFollow();
});
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
        <div v-for="user in relations" :key="user.userId" class="follow_item">
            <el-avatar :src="fullUrl(user.photo)" />
            <el-text>{{ user.nickName }}</el-text>
            <el-button size="small" round @click="changeFollowState(user.userId)">
                {{ user.hasFollowed ? "取消关注" : "关 注" }}
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