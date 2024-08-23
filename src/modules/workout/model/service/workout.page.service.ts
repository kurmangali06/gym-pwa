import type { MuscleGroup } from 'shared/lib/types/app/pages';
import { PageName } from 'shared/lib/types/app/pages';
import type { ITextValue } from 'shared/lib/types/app/app';
import type { Exercise } from '../utils/constants';
import { MuscleList } from '../utils/constants';
import { useWorkoutStore } from '../workout.store';
import type { IExerciseList, ITypeExercise } from '../DTO';
import { useExerciseService } from './exercise.service';

export function useWorkoutPageService() {
  const route = useRoute();
  const router = useRouter();
  const workoutStore = useWorkoutStore();
  const list = computed(() => JSON.parse(route.params.types as string));
  const activeName = ref(0);
  const currentType = computed(() => list.value[activeName.value]);
  const listTag = computed(() => MuscleList.value.filter(e => (list.value).includes(e.value)));
  const listMuscleGroup = ref<IExerciseList | null>(null);
  const show = ref(false);
  const title = ref('Новое Упражение');
  const form = reactive({
    value: '',
    label: '',
    sets: 0,
    description: '',
    videoUrl: '',
    imageUrl: '',
    type: '',
    id: null as null | number,
  });
  const showPicker = ref(false);
  const paramType = ref<MuscleGroup>();
  const { getExerciseAll, createExercise, deleteExercise, updateExercise } = useExerciseService();

  function onConfirm({ selectedOptions }: { selectedOptions: ITextValue<MuscleGroup> [] }) {
    form.type = selectedOptions[0].text;
    paramType.value = selectedOptions[0].value;
    showPicker.value = false;
  }
  async function onSave() {
    const formData = {
      value: form.value,
      label: form.label,
      sets: form.sets,
      description: form.description,
      videoUrl: form.videoUrl,
      imageUrl: form.imageUrl,
      type: paramType.value,
    };
    if (form.id)
      await updateExercise(form.id, formData);
    else
      await createExercise(formData);

    show.value = false;
    sortExerciseAll();
  }
  async function deleteExerciseGroup(id: number) {
    await deleteExercise(id).then(() => {
      sortExerciseAll();
    });
  }
  function editExercise(item: Exercise) {
    resetForm();
    const text = MuscleList.value.find(e => e.value === item.type);
    title.value = item.label;
    form.description = item.description;
    form.imageUrl = item.imageUrl;
    form.label = item.label;
    form.value = item.value;
    form.sets = item.sets;
    form.videoUrl = item.videoUrl;
    form.type = text ? text.text : '';
    paramType.value = item.type;
    show.value = true;
    form.id = item.id;
  }
  function watchVideo(url: string) {
    window.open(url, '_blank');
  }

  function startExercise(val: string, type: MuscleGroup) {
    workoutStore.setWorkoutList(list.value);
    router.push({
      name: PageName.BASE_EXERCISE,
      params: {
        type,
        name: val,
      },
    });
  }
  function sortExerciseAll() {
    getExerciseAll(list.value).then((res) => {
      listMuscleGroup.value = res.reduce((acc, item) => {
        if (!acc[item.type])
          acc[item.type] = [];
        acc[item.type].push(item);
        return acc;
      }, {} as ITypeExercise);
    });
  }
  function openNewExercise() {
    resetForm();
    title.value = 'Новое Упражение';
    form.id = null;
    show.value = true;
  }

  function resetForm() {
    form.description = '';
    form.imageUrl = '';
    form.label = '';
    form.sets = 0;
    form.type = '';
    form.videoUrl = '';
    form.value = '';
  }
  return {
    listTag,
    show,
    form,
    showPicker,
    list,
    activeName,
    listMuscleGroup,
    currentType,
    title,
    watchVideo,
    startExercise,
    sortExerciseAll,
    createExercise,
    deleteExercise: deleteExerciseGroup,
    onConfirm,
    onSave,
    editExercise,
    openNewExercise,
  };
}
