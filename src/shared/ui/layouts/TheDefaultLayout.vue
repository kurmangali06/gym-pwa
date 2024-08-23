<template>
  <div class="mobile-layout">
    <TheHeader />
    <div class="content flex-grow">
      <RouterView />
    </div>
    <BottomNavigationBar />
  </div>
</template>

<script setup lang="ts">
import BottomNavigationBar from '../BottomNavigationBar.vue';
import TheHeader from '../TheHeader.vue';
</script>

<style lang="css">
.mobile-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  padding: 4px;
  flex-grow: 1;
  overflow-y: auto;
}
</style>
