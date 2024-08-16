import type { Rule } from 'ant-design-vue/es/form';
import { useForm } from 'ant-design-vue/es/form';
import type { IApproacher, IMuscleValue } from 'shared/model/base.dto';
import type { MuscleGroup } from 'shared/lib/types/app/pages';
import { useWorkoutStore } from '../workout.store';
import { useWorkoutService } from './index.service';

export function useWorkoutTableService(muscleSelect: MuscleGroup[]) {
  const open = ref<boolean>(false);
  const edit = ref(false);
  const current = ref<IMuscleValue | null>(null);
  const workoutStore = useWorkoutStore();
  const form = reactive({
    name: '',
    count: 4,
    select: '',
  });
  const exercise = ref<Record<string, IApproacher>>({});
  const listMuscle = ref< IMuscleValue[]>([]);
  const getAllWorkout = computed(() => workoutStore.getWorkoutList);
  watch(() => muscleSelect, (val) => {
    if (!val.length) {
      listMuscle.value = [];
    } else {
      getAllWorkout.value.forEach((e) => {
        if (val.includes(e.type))
          listMuscle.value.push(e);
      });
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
  const { createExercise, deleteExercise, createCurrentWorkout } = useWorkoutService();
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
  function onChange(record: IMuscleValue) {
    current.value = record;
    for (let i = 1; i <= record.approaches; i++) {
      exercise.value[`${i}approacher`] = {
        count: 0,
        weigh: 0,
      };
    }
    edit.value = true;
  }
  async function onSaveExercise() {
    const formData = {
      ...exercise.value,
      type: current.value?.type,
      date: new Date(),
      name: current.value?.exercise,
    };

    await createCurrentWorkout(formData);

    edit.value = false;
  }
  return {
    rules,
    open,
    form,
    listMuscle,
    validateInfos,
    rulesRef,
    current,
    edit,
    exercise,

    onChange,
    onDelete,
    showDrawer,
    onClose,
    onSave,
    onSaveExercise,
  };
}
