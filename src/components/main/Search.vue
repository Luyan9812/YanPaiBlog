<script setup lang="ts">
import { reactive } from "vue";

const types = reactive([
    {id: 1, categoryName: "全部", active: true},
    {id: 2, categoryName: "后端", active: false},
    {id: 3, categoryName: "前端", active: false},
    {id: 4, categoryName: "安卓", active: false}
]);

function handleSwitchType(id: number) {
    types.map((type) => {
        type.active = type.id == id;
    })
}
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