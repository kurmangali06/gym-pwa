<template>
  <ACard v-if="!isLoading">
    <template #title>
      <h2 class="flex justify-center items-center font-bold text-2xl">
        {{ `Тренировка ${currentDate}` }}
      </h2>
    </template>
    <ACardGrid style="width: 100%">
      <ARadioGroup
        v-model:value="selectDay"
        class="grid grid-cols-3"
        style="pointer-events: none"
      >
        <ARadio
          v-for="item in dayList"
          :key="item.value"
          :disabled="isBeforeDay(item.value)"
          :value="item.value"
        >
          {{ item.label }}
        </ARadio>
      </ARadioGroup>
    </ACardGrid>
    <ACardGrid style="width: 100%; text-align: center">
      <ACheckboxGroup v-model:value="muscleSelect" class="grid grid-cols-3">
        <ACheckbox
          v-for="item in MuscleList"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </ACheckbox>
      </ACheckboxGroup>
    </ACardGrid>
    <ACardGrid style="width: 100%; padding: 0">
      <Table :muscle-select="muscleSelect" :select-list="selectList" />
    </ACardGrid>
  </ACard>
</template>

<script setup lang="ts">
import { useWorkoutService } from '../model/service/index.service';
import { useWorkoutPageService } from '../model/service/workout.page.service';
import Table from '../ui/Table.vue';

const {
  selectDay,
  muscleSelect,
  currentDate,
  MuscleList,
  dayList,
  selectList,
  isBeforeDay,
} = useWorkoutPageService();
const { getWorkout, isLoading } = useWorkoutService();
getWorkout();
</script>
