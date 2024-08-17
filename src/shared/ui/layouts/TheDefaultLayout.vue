<template>
  <ALayout class="layout">
    <TheHeader />
    <ALayoutContent class="pb-[90px] h-[90vh]">
      <RouterView />
    </ALayoutContent>
    <ALayoutFooter class="fixed left-0 right-0 bottom-0  border border-solid border-blue-500 rounded-t-2xl p-3">
      <BottomNavigationBar />
    </ALayoutFooter>
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
