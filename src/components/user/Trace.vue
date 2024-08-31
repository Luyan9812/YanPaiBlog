<script setup lang="ts">
import { reactive, ref } from "vue";
import ArticleList from "@/components/ArticleList.vue";
import Follow from "@/components/user/Follow.vue";

const selectedId = ref(1)
const tabs = reactive([
    {id: 1, title: "文章", active: true},
    {id: 2, title: "浏览记录", active: false},
    {id: 3, title: "关注", active: false},
    {id: 4, title: "收藏", active: false},
]);

function selectTab(id: number) {
    tabs.map(tab => {
        tab.active = (id === tab.id);
    });
    selectedId.value = id;
}
</script>

<template>
    <div class="trace_container">
        <div class="header">
            <p v-for="tab in tabs" :key="tab.id" :class="{'tab_active': tab.active}" @click="selectTab(tab.id)">
                {{ tab.title }}
            </p>
        </div>
        <el-divider />
        <ArticleList v-if="selectedId !== 3" />
        <Follow v-else />
    </div>
</template>

<style scoped lang="scss">
    .trace_container {
        width: 100%;
        margin-right: 20px;
        border-radius: 4px;
        margin-bottom: 20px;
        background-color: #fff;

        .header {
            display: flex;
            padding: 0 20px;
            box-sizing: border-box;

            p {
                height: 50px;
                color: #000;
                font-size: 18px;
                font-weight: 500;
                line-height: 50px;
                margin: 0 50px 0 0;
                cursor: pointer;
            }
            p:hover {
                color: #ff8721;
            }
            .tab_active {
                color: #ff8721;
                border-bottom: 4px solid #ff8721;
            }
        }

        .el-divider {
            margin: 0;
        }
    }
</style>