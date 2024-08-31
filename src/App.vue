<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <Header/>
  <RouterView />
  <div class="footer">
      备案被小人偷袭了 © 2022-2024 技术派
  </div>
</template>

<style scoped>
.footer {
    width: 100%;
    height: 50px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    line-height: 50px;
    background-color: rgb(36, 41, 47);
}
</style>
