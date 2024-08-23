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
      <VanTab :title="tag.text">
        <div class="flex items-center justify-center my-4">
          <VanButton
            round
            size="mini"
            @click="openNewExercise"
          >
            Добавить упражение
          </VanButton>
        </div>

        <div
          v-if=" listMuscleGroup"
          class="pb-30 snap-y overflow-y-auto max-h-[700px] md:max-h-[300px] sm:max-h-[700px]"
        >
          <VanCard
            v-for="item in listMuscleGroup[tag.value]"
            :key="item.value"
            :desc="item.description"
            :thumb="item.imageUrl"
            :title="item.label"
          >
            <template #footer>
              <div class="flex justify-center items-center gap-2">
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
                <VanIcon
                  color="#1989fa"
                  name="delete"
                  size="20px"
                  @click="deleteExercise(item.id)"
                />
                <VanIcon
                  color="#1989fa"
                  name="records-o"
                  size="20px"
                  @click="editExercise(item)"
                />
              </div>
            </template>
          </VanCard>
        </div>
      </VanTab>
    </template>
  </VanTabs>
  <VanActionSheet v-model:show="show" :title="title">
    <VanForm @submit="onSave">
      <VanCellGroup inset>
        <VanField
          v-model="form.value"
          label="Англ название"
          placeholder="введите английское название"
          :rules="[{ required: true, message: 'value is required' }]"
        />
        <VanField
          v-model="form.label"
          label="Название"
          placeholder="введите  название"
          :rules="[{ required: true, message: 'label is required' }]"
        />
        <VanField
          v-model="form.sets"
          label="Подходы"
          placeholder="введите  кол-во подходов"
          :rules="[{ required: true, message: 'sets is required' }]"
          type="number"
        />
        <VanField
          v-model="form.description"
          autosize
          label="Описание"
          placeholder="введите  описание"
          rows="1"
          :rules="[{ required: true, message: 'description is required' }]"
          type="textarea"
        />
        <VanField
          v-model="form.videoUrl"
          label="Ссылка"
          placeholder="введите  Ссылку"
          :rules="[{ required: true, message: 'Ссылка is required' }]"
        />

        <VanField
          v-model="form.imageUrl"
          label="Картинка"
          placeholder="введите  Ссылку"
          :rules="[{ required: true, message: 'Ссылка is required' }]"
        />
        <VanField
          v-model="form.type"
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
          {{ form.id ? 'Изменить' : 'Создать' }}
        </VanButton>
      </div>
    </VanForm>
  </VanActionSheet>
</template>

<script setup lang="ts">
import { useWorkoutPageService } from '../model/service/workout.page.service';
import { MuscleList } from '../model/utils/constants';

const {
  listTag,
  show,
  onSave,
  title,
  form,
  showPicker,
  activeName,
  listMuscleGroup,
  watchVideo,
  startExercise,
  sortExerciseAll,
  deleteExercise,
  onConfirm,
  editExercise,
  openNewExercise,
} = useWorkoutPageService();

sortExerciseAll();
</script>
