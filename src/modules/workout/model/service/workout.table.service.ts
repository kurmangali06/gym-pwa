import type { Rule } from 'ant-design-vue/es/form';
import { useForm } from 'ant-design-vue/es/form';
import type { IMuscleValue } from 'shared/model/base.dto';
import type { MuscleGroup } from 'shared/lib/types/app/pages';
import { useWorkoutStore } from '../workout.store';
import { useWorkoutService } from './index.service';

export function useWorkoutTableService(muscleSelect: MuscleGroup[]) {
  const open = ref<boolean>(false);
  const workoutStore = useWorkoutStore();
  const form = reactive({
    name: '',
    count: 4,
    select: '',
  });
  const listMuscle = ref< IMuscleValue[]>([]);
  const getAllWorkout = computed(() => workoutStore.getWorkoutList);
  watch(() => muscleSelect, (val) => {
    if (val.length) {
      getAllWorkout.value.forEach((e) => {
        if (val.includes(e.type))
          listMuscle.value.push(e);
      });
    } else {
      listMuscle.value = [];
    }
  }, {
    immediate: true,
  });
  const rules: Record<string, Rule[]> = {
    name: [{ required: true, message: 'Please enter  exercise' }],
    count: [{ required: true, message: 'please enter count' }],
    select: [{ required: true, message: 'please enter select', trigger: 'change' }],
  };
  const { resetFields, validate, validateInfos, rulesRef } = useForm(
    form,
    rules,
  );
  const { createExercise, deleteExercise } = useWorkoutService();
  async function onDelete(key: Record<string, any>) {
    await deleteExercise(key.id);
  }
  function showDrawer() {
    open.value = true;
  }

  function onClose() {
    open.value = false;
  }
  async function onSave() {
    await validate();
    const formData: IMuscleValue = {
      exercise: form.name,
      approaches: form.count,
      type: form.select as MuscleGroup,
    };
    await createExercise(formData);

    open.value = false;
    resetFields();
  }

  return {
    rules,
    open,
    form,
    listMuscle,
    validateInfos,
    rulesRef,
    onDelete,
    showDrawer,
    onClose,
    onSave,
  };
}
