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
      <VanTab class="" :title="tag.text">
        <VanButton
          block
          round
          type="primary"
          @click="show = true"
        >
          Добавить упражение
        </VanButton>
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
  <VanActionSheet v-model:show="show" title="упражение">
    <VanForm @submit="onSave">
      <VanCellGroup inset>
        <VanField
          v-model="value"
          placeholder="Use pattern"
          :rules="[{ required: true, message: 'weight is required' }]"
        />
        <VanField
          v-model="label"
          placeholder="Use pattern"
          :rules="[{ required: true, message: 'weight is required' }]"
        />
        <VanField
          v-model="sets"
          placeholder="Use pattern"
          :rules="[{ required: true, message: 'weight is required' }]"
          type="number"
        />
        <VanField
          v-model="description"
          placeholder="Use pattern"
          :rules="[{ required: true, message: 'weight is required' }]"
        />
        <VanField
          v-model="videoUrl"
          placeholder="Use pattern"
          :rules="[{ required: true, message: 'weight is required' }]"
        />
        <VanField
          v-model="imageUrl"
          placeholder="Use pattern"
          :rules="[{ required: true, message: 'weight is required' }]"
        />
        <VanField
          v-model="type"
          is-link
          label="Тип упраженения"
          name="picker"
          readonly
          @click="showPicker = true"
        />
        <VanPopup v-model:show="showPicker" position="bottom">
          <VanPicker
            :columns="MuscleList"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </VanPopup>
      </VanCellGroup>
      <div style="margin: 16px;">
        <VanButton
          block
          native-type="submit"
          round
          type="primary"
        >
          Submit
        </VanButton>
      </div>
    </VanForm>
  </VanActionSheet>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import type { ITextValue } from 'shared/lib/types/app/app';
import type { MuscleGroup } from 'shared/lib/types/app/pages';
import { useWorkoutService } from '../model/service/index.service';
import { useWorkoutPageService } from '../model/service/workout.page.service';
import { MuscleList } from '../model/utils/constants';

const {
  startExercise,
  activeName,
  listTag,
  watchVideo,
  getExerciseAll,
  createExercise,
  exercisesByMuscleGroup,
} = useWorkoutPageService();
const show = ref(false);
const value = ref('');
const label = ref('');
const sets = ref(0);
const description = ref('');
const videoUrl = ref('');
const imageUrl = ref('');
const type = ref('');
const showPicker = ref(false);
const paramType = ref<MuscleGroup>();
function onConfirm({ selectedOptions }: { selectedOptions: ITextValue<MuscleGroup> [] }) {
  type.value = selectedOptions[0].text;
  paramType.value = selectedOptions[0].value;
  showPicker.value = false;
}
async function onSave() {
  const formData = {
    value: value.value,
    label: label.value,
    sets: sets.value,
    description: description.value,
    videoUrl: videoUrl.value,
    imageUrl: imageUrl.value,
    type: paramType.value,
  };
  const res = await createExercise(formData);
}

const { getCurrentWorkout } = useWorkoutService();
getCurrentWorkout(dayjs().toDate().toDateString());
getExerciseAll();
</script>
