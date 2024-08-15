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
      <ATable
        bordered
        :columns="columns"
        :data-source="listMuscleList"
        style="width: 100%;"
      >
        <!-- <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'name'">
            <div class="editable-cell">
              <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
                <AInput v-model:value="editableData[record.key].name" @press-enter="save(record.key)" />
                <CheckOutlined class="editable-cell-icon-check" @click="save(record.key)" />
              </div>
              <div v-else class="editable-cell-text-wrapper">
                {{ text || ' ' }}
                <EditOutlined class="editable-cell-icon" @click="edit(record.key)" />
              </div>
            </div>
          </template>
          <template v-else-if="column.dataIndex === 'operation'">
            <APopconfirm
              v-if="dataSource.length"
              title="Sure to delete?"
              @confirm="onDelete(record.key)"
            >
              <a>Delete</a>
            </APopconfirm>
          </template>
        </template> -->
      </ATable>
    </ACardGrid>
  </ACard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { type DateType, MuscleGroup } from 'shared/lib/types/app/pages';
import { FORMAT_DATE } from 'shared/lib/utils/constants';
import { MuscleList, columns, dayList } from '../model/utils/constants';
import { dayChest } from '../model/utils/types';
import type { IMuscleValue } from '../model/DTO';

const route = useRoute();
const selectDay = ref(dayjs(route.params.date as string).day());
const muscleSelect = ref<string[]>([]);

const currenDay = computed(() => dayjs().day());
const listMuscleList = ref<IMuscleValue[]>([]);
const currenDate = computed(() => dayjs(route.params.date as string).format(FORMAT_DATE));
function isBeforeDay(day: DateType) {
  return currenDay.value < day;
}
watch(() => muscleSelect.value, (val) => {
  if (val.includes(MuscleGroup.Chest))
    listMuscleList.value = [...dayChest];
});
</script>
