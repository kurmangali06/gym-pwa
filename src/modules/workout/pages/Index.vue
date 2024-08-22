<template>
  <VanTabs
    v-if="listTag.length"
    v-model:active="activeName"
    animated
  >
    <template
      v-for="tag in listTag"
      :key="tag.value"
    >
      <VanTab class="" :title="tag.label">
        <div class="pb-30 snap-y overflow-y-auto max-h-[700px] md:max-h-[300px] sm:max-h-[700px]">
          <VanCard
            v-for="item in exercisesByMuscleGroup[listTag[activeName].value]"
            :key="item.value"
            :desc="item.description"
            :thumb="item.imageUrl"
            :title="item.label"
          >
            <template #footer>
              <VanButton
                plain
                size="mini"
                type="primary"
                @click="watchVideo(item.videoUrl)"
              >
                Ссылка на видео
              </VanButton>
              <VanButton size="mini" @click="startExercise(item.value, listTag[activeName].value)">
                Начать
              </VanButton>
            </template>
          </VanCard>
        </div>
      </VanTab>
    </template>
  </VanTabs>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { useWorkoutService } from '../model/service/index.service';
import { useWorkoutPageService } from '../model/service/workout.page.service';

const {
  startExercise,
  activeName,
  listTag,
  watchVideo,
  exercisesByMuscleGroup,
} = useWorkoutPageService();
const { getCurrentWorkout } = useWorkoutService();
getCurrentWorkout(dayjs().toDate().toDateString());
</script>
