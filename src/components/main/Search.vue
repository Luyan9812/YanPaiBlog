<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { Search } from '@element-plus/icons-vue';

import { articleApi } from "@/http/api";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps(["changeCategory"]);

const title = ref("");
const types = reactive([]);
const handleSwitchType = async (id: number) => {
    types.map((type) => {
        type.active = type.id == id;
    });
    props.changeCategory(id);
}
const searchChange = () => {
    if (title.value.trim()) {
        router.push(`/results?title=${title.value.trim()}`)
    }
}

onMounted(async () => {
    const data = await articleApi.getCategoriesHavingArticles();
    types.length = 0;
    types.push({id: 0, categoryName: "全部", active: true});
    data.forEach(element => {
        element.active = false;
        types.push(element);
    });
});
</script>

<template>
    <div class="seh_ext">
        <div class="seh_container">
            <template v-for="type in types" :key="type.id">
                <div @click="handleSwitchType(type.id)" 
                    :class="{'types': true, 'types_active': type.active}">
                    {{ type.categoryName }}
                </div>
            </template>
            <el-input
                v-model="title"
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