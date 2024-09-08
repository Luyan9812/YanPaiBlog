<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";

import { userApi } from "@/http/api";
import Switcher from "@/components/Switcher.vue";
import MessageList from "@/components/MessageItemList.vue";

const selectedTab = ref(0);
const tabs = reactive([
    {id: 0, title: "点赞"},
    {id: 1, title: "收藏"},
    {id: 2, title: "关注消息"},
    {id: 3, title: "系统消息"},
]);
const messages = reactive([
    {photo: "/headers/0010.png", msg: "用户 xxx 点赞了你的文章《xxx》", updateTime: "2024-09-08 21:06"},
    {photo: "/headers/0011.png", msg: "用户 xxx 收藏了你的文章《xxx》", updateTime: "2024-09-08 21:06"},
    {photo: "/headers/0012.png", msg: "用户 xxx 关注了你", updateTime: "2024-09-08 21:06"},
    {photo: "/headers/yan_pai.jpg", msg: "欢迎使用研派博客，更多精彩等你来发现！", updateTime: "2024-09-08 21:06"},
]);
const onTabSelect = (id: number) => {
    console.log(id);
    
    selectedTab.value = id;
    getMessages();
}
const getMessages = async () => {
    const data = await userApi.getMessages(selectedTab.value);
    messages.length = 0;
    data.forEach(element => {
        messages.push(element);
    });
}

onMounted(() => {
    getMessages();
});
</script>

<template>
    <div class="msg_container">
        <div class="header">
            <Switcher style="width: 1200px;" :tabs="tabs" :bold="false" :onSelect="onTabSelect" />
        </div>
        <MessageList :messages="messages" />
    </div>
</template>

<style lang="scss" scoped>
.msg_container {
    padding-bottom: 12px;
    box-sizing: border-box;
    background-color: #f4f5f5;
    min-height: calc(100vh - 110px);

    .header {
        height: 50px;
        display: flex;
        justify-content: center;
        background: #fff;
    }
}
</style>