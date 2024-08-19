<template>
  <div class="canvas-container">
    <TresCanvas
      clear-color="#82DBC5"
    >
      <TresPerspectiveCamera
        :look-at="[0, 0, 0]"
        :position="[1, 2, 1]"
      />
      <TresMesh>
        <TresTorusGeometry :args="[1, 0.5, 16, 32]" />
        <TresMeshBasicMaterial color="orange" />
      </TresMesh>
      <TresAmbientLight :intensity="1" />
    </TresCanvas>
  </div>
</template>

<script setup lang="ts">
import { TresCanvas } from '@tresjs/core';
</script>

<style scoped>
.canvas-container {

  height:200px;/* Optional: Makes it full height as well */
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
