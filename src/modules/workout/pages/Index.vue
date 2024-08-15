<template>
  <ACard>
    <template #title>
      <h2 class="flex justify-center items-center font-bold text-2xl">
        {{ `Тренировка ${currenDate}` }}
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
      <ATable
        bordered
        :columns="columns"
        :data-source="listMuscle"
        :pagination="false"
        style="width: 100%"
      >
        <template #title>
          <AButton :disabled="!muscleSelect.length" @click="showDrawer">
            Добавить
          </AButton>
        </template>
        <template #headerCell />
        <template #bodyCell="{ column, record, value }">
          <template v-if="column.key === 'operation'">
            <div class="flex justify-around items-center gap-1">
              <FormOutlined class="text-green-600" @click="showDrawer" />
              <APopconfirm
                v-if="listMuscle.length"
                title="Вы действительно хотите удалить?"
                @confirm="onDelete(record)"
              >
                <DeleteOutlined class="text-red-400" />
              </APopconfirm>
            </div>
          </template>
          <template v-else-if="column.key">
            {{ value[column.key] }}
          </template>
        </template>
      </ATable>
    </ACardGrid>
  </ACard>
  <ADrawer
    v-model:open="open"
    class="custom-class"
    height="60vh"
    placement="bottom"
    root-class-name="root-class-name"
    :root-style="{ color: 'blue' }"
    style="color: red"
    title="Новое упражнение"
  >
    <AForm
      layout="vertical"
      :model="form"
      :rules="rules"
      @validate="onFinishFailed"
    >
      <ACol>
        <AFormItem label="Name" name="name">
          <AInput v-model:value="form.name" placeholder="Please enter user name" />
        </AFormItem>
      </ACol>
      <ACol>
        <AFormItem label="Count" name="count">
          <AInput
            v-model:value="form.count"
            placeholder="Please enter user name"
            type="number"
          />
        </AFormItem>
      </ACol>
    </AForm>
    <template #footer>
      <div class="flex justify-between items-center gap-2">
        <AButton class="w-1/2" @click="onClose">
          Отмена
        </AButton>
        <AButton
          class="w-1/2"
          :disabled="validField"
          type="primary"
          @click="onSave"
        >
          Сохранить
        </AButton>
      </div>
    </template>
  </ADrawer>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { type DateType } from 'shared/lib/types/app/pages';
import { FORMAT_DATE } from 'shared/lib/utils/constants';
import { type Rule, useForm } from 'ant-design-vue/es/form';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons-vue';
import { MuscleList, columns, dayList } from '../model/utils/constants';
import type { IMuscleValue } from '../model/DTO';

const route = useRoute();
const selectDay = ref(dayjs(route.params.date as string).day());
const muscleSelect = ref<string[]>([]);
const open = ref<boolean>(false);

const currenDay = computed(() => dayjs().day());
const listMuscle = ref<IMuscleValue[]>([]);
const validField = ref(true);
const form = reactive({
  name: '',
  count: 4,
});

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: 'Please enter  exercise' }],
  count: [{ required: true, message: 'please enter count' }],
};
const { resetFields } = useForm(
  form,
  reactive({
    name: [{ required: true, message: 'Please enter  exercise' }],
    count: [{ required: true, message: 'please enter count' }],
  }),
);
const currenDate = computed(() => dayjs(route.params.date as string).format(FORMAT_DATE));
function isBeforeDay(day: DateType) {
  return currenDay.value < day;
}

function onDelete(key: Record<string, any>) {
  listMuscle.value = listMuscle.value.filter(e => e.exercise !== key.exercise);
}
function showDrawer() {
  open.value = true;
}

function onClose() {
  open.value = false;
}
function onSave() {
  listMuscle.value.push({
    exercise: form.name,
    approaches: form.count,
  });
  open.value = false;
  resetFields();
}
function onFinishFailed(
  _name: string | number | string[] | number[],
  status: boolean,
  _errors: string[],
) {
  validField.value = !status;
}
</script>
