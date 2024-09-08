<script lang="ts" setup>
import { fullUrl } from "@/utils/url";
import Empty from "@/assets/Empty.png";

defineProps(["messages"]);
</script>

<template>
    <div class="item_container">
        <template v-if="messages.length > 0">
            <div v-for="(msg, idx) in messages" :key="idx" class="msg_item">
                <el-image :src="fullUrl(msg.photo)" />
                <div class="msg_body">
                    <el-text>{{ msg.msg }}</el-text>
                    <el-text>{{ msg.updateTime }}</el-text>
                </div>
            </div>
        </template>
        <el-image v-else style="width: 300px; align-self: center;" :src="Empty" />
    </div>
</template>

<style lang="scss" scoped>
.item_container {
    display: flex;
    flex-direction: column;

    .msg_item {
        width: 900px;
        height: 90px;
        margin: auto;
        margin-top: 12px;
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        background-color: #fff;
        box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);

        .el-image {
            width: 50px;
            height: 50px;
            margin-right: 30px;
            border-radius: 25px;
        }

        .msg_body {
            display: flex;
            flex-direction: column;

            .el-text:first-child {
                font-size: 15px;
                color: #212529;
                margin-bottom: 10px;
            }

            .el-text:last-child {
                font-size: 12px;
                color: #888;
                align-self: flex-start;
            }
        }
    }
}
</style>