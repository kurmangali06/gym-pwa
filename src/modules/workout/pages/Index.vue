<template>
  <ACard :title="`Тренировка ${currenDate}` ">
    <ACardGrid style="width: 100%;">
      <ARadioGroup
        v-model:value="selectDay"
        class="grid grid-cols-3"
        style="pointer-events: none;"
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
    <ACardGrid style="width: 100%; padding: 0;">
      {{ expandedRowKeys }}
      <ATable
        bordered
        class="components-table-demo-nested"
        :columns="columns"
        :data-source="listMuscleList"

        :pagination="false"
        style="width: 100%;"
      >
        <template #bodyCell="{ column, record, value }">
          <template v-if="column.key === 'operation'">
            <APopconfirm
              v-if="listMuscleList.length"
              title="Вы действительно хотите удалить?"
              @confirm="onDelete(record)"
            >
              <a>Удалить</a>
            </APopconfirm>
          </template>
          <template v-else-if="column.key">
            {{ value[column.key] }}
          </template>
        </template>
        <template #expandedRowRender="{ record }">
          {{ record.approaches }}
          <ATable
            v-if="howCountApproaches(record.approaches).length"
            bordered
            :columns="subColumns"
            :data-source="howCountApproaches(record.approaches)"
            :pagination="false"
          >
            <template #bodyCell="{ column, value }">
              <template v-if="column.key === 'count'">
                {{ value[column.key] }}
              </template>
              <template v-else-if="column.key">
                {{ value[column.key] }}
              </template>
            </template>
          </ATable>
        </template>
      </ATable>
    </ACardGrid>
  </ACard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { type DateType, MuscleGroup } from 'shared/lib/types/app/pages';
import { FORMAT_DATE } from 'shared/lib/utils/constants';
import { MuscleList, columns, dayList, subColumns } from '../model/utils/constants';
import { dayChest } from '../model/utils/types';
import type { IMuscleValue } from '../model/DTO';

const route = useRoute();
const selectDay = ref(dayjs(route.params.date as string).day());
const muscleSelect = ref<string[]>([]);

const currenDay = computed(() => dayjs().day());
const listMuscleList = ref<IMuscleValue[]>([]);
const expandedRowKeys = ref([]);
const currenDate = computed(() => dayjs(route.params.date as string).format(FORMAT_DATE));
function isBeforeDay(day: DateType) {
  return currenDay.value < day;
}

function onDelete(key: Record<string, any>) {
  listMuscleList.value = listMuscleList.value.filter(e => e.exercise !== key.exercise);
}

watch(() => muscleSelect.value, (val) => {
  if (val.includes(MuscleGroup.Chest))
    listMuscleList.value = [...dayChest];
});

function howCountApproaches(value: number) {
  const list = [];
  for (let i = 0; i < value; ++i) {
    list.push({
      approach: `${i + 1} Подход`,
      count: 0,
    });
  }
  return list;
}
</script>
