<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";

const props = defineProps(["onSelect", "border", "tabs"]);
const style = reactive({
    tab_active: true,
    border: props.border,
});
const selected = ref(0);
const onTabSelect = (id: number) => {
    selected.value = id;
    props.onSelect(id);
}

onMounted(() => {
    if (props.tabs.length > 0) {
        selected.value = props.tabs[0].id;
    }
});
</script>

<template>
    <div class="switcher_container">
        <p v-for="tab in tabs" :key="tab.id" 
          :class="selected === tab.id ? style : {}" 
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
    }
    .border {
        border-bottom: 4px solid #ff8721;
    }
}
</style>