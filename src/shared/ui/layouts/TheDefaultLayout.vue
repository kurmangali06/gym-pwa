<template>
  <ALayout class="flex flex-col">
    <TheHeader />
    <ALayoutContent class="flex-grow ">
      <RouterView />
    </ALayoutContent>

    <BottomNavigationBar />
  </ALayout>
</template>

<script setup lang="ts">
import BottomNavigationBar from '../BottomNavigationBar.vue';
import TheHeader from '../TheHeader.vue';
</script>

<style lang="css">
.ant-layout-header {
  background: #f5f5f5 !important
}
</style>
