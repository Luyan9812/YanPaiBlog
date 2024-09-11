<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import emitter from "@/utils/emitter";

const isShow = ref(false)
const props = defineProps(["width", "title", "name", "onClose"])

const close = () => {
    if (props.onClose) {
        props.onClose()
    }
}

onMounted(() => {
    emitter.on("changeDialogState", (obj: any) => {
        console.log(obj);
        
        if (props.name === obj.name) {
            isShow.value = obj.state;
        }
    });
});
onUnmounted(() => {
    emitter.off("changeDialogState")
});
</script>

<template>
    <el-dialog v-model="isShow" :title="title" @close="close"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        style="padding: 16px 24px 1px 24px; font-weight: 500;" 
        close-icon="CloseBold" :width="width">
        <el-divider style="margin: 0 0 15px 0;" />
        <slot></slot>
    </el-dialog>
</template>

<style lang="scss" scoped>

</style>