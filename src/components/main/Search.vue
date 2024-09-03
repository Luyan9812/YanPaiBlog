<script setup lang="ts">
import { onMounted, reactive } from "vue";

import { articleApi } from "@/http/api";

const props = defineProps(["changeCategory"]);

const types = reactive([]);

const handleSwitchType = async (id: number) => {
    types.map((type) => {
        type.active = type.id == id;
    });
    props.changeCategory(id);
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
            <el-icon size="20" style="margin-left: auto;"><Search  /></el-icon>
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