<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { Search } from '@element-plus/icons-vue';

import { articleApi } from "@/http/api";
import { useRouter } from "vue-router";
import Switcher from "@/components/Switcher.vue";

const router = useRouter();
const props = defineProps(["changeCategory"]);

const searchKey = ref("");
const types = reactive([]);
const handleSwitchType = async (id: number) => {
    props.changeCategory(id);
}
const searchChange = () => {
    if (searchKey.value.trim()) {
        router.push(`/results?title=${searchKey.value.trim()}`)
    }
}

onMounted(async () => {
    const data = await articleApi.getCategoriesHavingArticles();
    types.length = 0;
    types.push({id: 0, title: "全部"});
    data.forEach(element => {
        types.push({id: element.id, title: element.categoryName});
    });
});
</script>

<template>
    <div class="seh_ext">
        <div class="seh_container">
            <Switcher :tabs="types" :border="false" :onSelect="handleSwitchType" />
            <el-input
                v-model="searchKey"
                style="width: 240px; margin-left: auto;"
                placeholder="键入搜索"
                @change="searchChange()"
                :suffix-icon="Search"/>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.seh_ext {
    width: 100%;
    height: fit-content;
    background-color: #fff;

    .seh_container {
        width: 1200px;
        height: 58px;
        margin: auto;
        padding: 8px 0;
        display: flex;
        align-items: center;
        box-sizing: border-box;

        .types {
            font-size: 18px;
            font-weight: 600;
            margin-right: 48px;
            color: #212529;
            cursor: pointer;
        }
        .types:hover {
            color: #ff6900;
        }
        .types_active {
            color: #ff6900;
        }
    }
}
</style>