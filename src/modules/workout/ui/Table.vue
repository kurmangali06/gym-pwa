<template>
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
        <div class="cursor-pointer" @click="onChange(record)">
          {{ value[column.key] }}
        </div>
      </template>
    </template>
  </ATable>
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
    >
      <ACol>
        <AFormItem
          label="Name"
          name="name"
        >
          <AInput v-model:value="form.name" placeholder="Please enter user name" />
          <AAlert
            v-if="validateInfos.name.help"
            :message="validateInfos.name.help"
            type="error"
          />
        </AFormItem>
      </ACol>
      <ACol>
        <AFormItem
          label="Count"
          name="count"
          :rules="rulesRef.count"
        >
          <AInput
            v-model:value="form.count"
            placeholder="Please enter user name"
            type="number"
          />
          <AAlert
            v-if="validateInfos.count.help"
            :message="validateInfos.count.help"
            type="error"
          />
        </AFormItem>
      </ACol>
      <ACol>
        <AFormItem
          label="Group"
          name="select"
          :rules="rulesRef.select"
        >
          <ASelect
            v-model:value="form.select"
            :options="selectList"
          />
          <AAlert
            v-if="validateInfos.select.help"
            :message="validateInfos.select.help"
            type="error"
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
import { DeleteOutlined } from '@ant-design/icons-vue';
import type { PropType } from 'vue';
import type { MuscleGroup } from 'shared/lib/types/app/pages';
import { useWorkoutTableService } from '../model/service/workout.table.service';
import { columns } from '../model/utils/constants';
import type { ILabelValue } from '../model/DTO';

const props = defineProps({
  muscleSelect: {
    type: Array as PropType<MuscleGroup[]>,
    default: () => [],
  },
  selectList: {
    type: Array as PropType<ILabelValue[]>,
    default: () => [],
  },
});
function onChange(record: any) {

}
const {
  open,
  form,
  listMuscle,
  validateInfos,
  rulesRef,
  onDelete,
  showDrawer,
  onClose,
  onSave,
} = useWorkoutTableService(props.muscleSelect);
</script>
