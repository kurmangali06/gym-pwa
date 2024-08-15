<template>
  <div>
    <RouterView />
    <div class="fixed bottom-0 left-0  right-0 z-10">
      <BottomNavigationBar />
    </div>
  </div>
</template>

<script setup lang="ts">
import BottomNavigationBar from '../BottomNavigationBar.vue';
</script>
