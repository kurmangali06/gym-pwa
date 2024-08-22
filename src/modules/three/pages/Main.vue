<template>
  <div>
    <!-- 3D сцена -->
    <TresCanvas window-size>
      <TresPerspectiveCamera ref="camera" :position="[2, 1, 5]" />
      <TresGroup
        ref="groupRef"
        :position="[2, 2, 0]"
        :scale="groupScale"
        @wheel="increaseScale"
      >
        <TresMesh>
          <TresBoxGeometry />
          <TresMeshBasicMaterial color="red" />
        </TresMesh>
        <TresMesh>
          <TresSphereGeometry />
          <TresMeshBasicMaterial color="blue" />
        </TresMesh>
      </TresGroup>
    </TresCanvas>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { TresCanvas, useRenderLoop } from '@tresjs/core';

// Ссылки на объекты в сцене
const groupRef = shallowRef();
const camera = shallowRef();

// Масштаб группы
const groupScale = ref([1, 1, 1]); // Изначальный масштаб 1x1x1

// Функция для увеличения масштаба
function increaseScale(event: WheelEvent) {
  if (event.deltaY > 0)
    groupScale.value = groupScale.value.map(s => s + 0.1); // Увеличиваем масштаб на 0.1
  else
    groupScale.value = groupScale.value.map(s => s - 0.1);
}

// Анимация в цикле
const { onLoop } = useRenderLoop();
onLoop(() => {
  if (groupRef.value)
    groupRef.value.rotation.y += 0.02; // Вращение группы
  if (camera.value)
    camera.value.lookAt(groupRef.value.position); // Камера смотрит на группу
});
</script>
