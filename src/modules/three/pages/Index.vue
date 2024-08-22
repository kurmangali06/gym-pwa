<template>
  <VanButton @click="scaleCamera++ ">
    увеличить
  </VanButton>
  <div ref="container" class="three-container" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as THREE from 'three';

const container = ref<HTMLDivElement | null>(null); // Ссылка на div-контейнер
const scene = new THREE.Scene();
const scaleCamera = ref(5);
// Объект
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 'purple',
  wireframe: true,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Камера
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(75, aspectRatio);
camera.position.z = scaleCamera.value;
scene.add(camera);

// Рендерер
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(sizes.width, sizes.height);

const clock = new THREE.Clock();

function tick() {
  const elapsedTime = clock.getElapsedTime();
  // mesh.rotation.y = elapsedTime;
  camera.position.x = Math.cos(elapsedTime);
  camera.position.y = Math.sin(elapsedTime);
  camera.lookAt(mesh.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
}
tick();
onMounted(() => {
  if (container.value)
    container.value.appendChild(renderer.domElement); // Добавляем рендерер в контейнер

  renderer.render(scene, camera); // Рендерим сцену
});
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100%;
  background-color: black; /* Цвет фона */
}
</style>
