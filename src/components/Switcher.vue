<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";

const props = defineProps(["onSelect", "border", "bold", "tabs"]);
const commonStyle = reactive({
    bold: true,
});
const selectStyle = reactive({
    tab_active: true,
    border: false,
});
const selected = ref(0);
const onTabSelect = (id: number) => {
    selected.value = id;
    props.onSelect(id);
}

onMounted(() => {
    if (props.bold !== undefined) {
        commonStyle.bold = props.bold;
    }
    if (props.border !== undefined) {
        selectStyle.border = props.border;
    }
    if (props.tabs.length > 0) {
        selected.value = props.tabs[0].id;
    }
});
</script>

<template>
    <div class="switcher_container">
        <p v-for="tab in tabs" :key="tab.id" 
          :class="[selected === tab.id ? selectStyle : {}, commonStyle]" 
          @click="onTabSelect(tab.id)">
            {{ tab.title }}
        </p>
    </div>
</template>

<style lang="scss" scoped>
.switcher_container {
    display: flex;

    p {
        height: 50px;
        color: #000;
        font-size: 16px;
        line-height: 50px;
        margin: 0 50px 0 0;
        cursor: pointer;
    }
    p:hover {
        color: #ff8721;
    }
    .tab_active {
        color: #ff8721;
    }
    .border {
        border-bottom: 4px solid #ff8721;
    }
    .bold {
        font-size: 18px;
        font-weight: 500;
    }
}
</style>