<template>
  <div ref="container" class="three-container" />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import * as THREE from 'three';

// Импорт TextGeometry

// Импорт FontLoader

// Ссылка на контейнер
const container = ref<HTMLDivElement | null>(null);

onMounted(() => {
  // Создание сцены
  const scene = new THREE.Scene();

  // Создание камеры
  const aspectRatio = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.z = 5;

  // Создание рендерера с прозрачным фоном
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (container.value)
    container.value.appendChild(renderer.domElement);

  // Загрузка текстуры
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('public/images/gym1.png'); // Путь к вашему изображению

  // Создание материала с загруженной текстурой
  const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });

  // Создание геометрии плоскости и применение материала
  const planeWidth = 10; // Ширина плоскости
  const planeHeight = 5; // Высота плоскости
  const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
  const plane = new THREE.Mesh(geometry, material);
  plane.position.z = -2; // Позиционирование немного перед камерой
  scene.add(plane);

  // Переменные для анимации
  let startTime: number | null = null;
  const moveDuration = 2000; // Продолжительность анимации в миллисекундах
  const stayDuration = 5000; // Продолжительность нахождения в центре в миллисекундах

  // Цикл анимации
  function animate(time: number) {
    if (!startTime)
      startTime = time;

    const elapsedTime = time - startTime;
    const normalizedTime = elapsedTime / moveDuration;

    // Масштабирование плоскости от маленького размера до полного
    if (elapsedTime < moveDuration) {
      const scale = 0.1 + 0.9 * normalizedTime; // Масштабирование от 0.1 до 1
      plane.scale.set(scale, scale, 1);
      plane.position.z = -2 + 2 * normalizedTime; // Движение к камере
    } else if (elapsedTime < moveDuration + stayDuration) {
      // Плоскость остается в центре
      plane.scale.set(1, 1, 1);
      plane.position.z = 0;
    } else if (elapsedTime < moveDuration + stayDuration + moveDuration) {
      // Возвращение плоскости в исходное положение
      const returnTime = (elapsedTime - (moveDuration + stayDuration)) / moveDuration;
      plane.scale.set(1 - 0.9 * returnTime, 1 - 0.9 * returnTime, 1); // Масштабирование обратно до маленького размера
      plane.position.z = -2 + 2 * returnTime;
    } else {
      // Сброс анимации
      startTime = time;
      plane.scale.set(0.1, 0.1, 1);
      plane.position.z = -2;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // Обработка изменения размера окна
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize);

  // Очистка
  onUnmounted(() => {
    window.removeEventListener('resize', onWindowResize);
    renderer.dispose();
    if (container.value)
      container.value.removeChild(renderer.domElement);
  });
});
</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100%;
  background-color: black; /* Цвет фона */
}
</style>
