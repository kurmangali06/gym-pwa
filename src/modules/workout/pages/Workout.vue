<template>
  <VanTag
    v-for="tag in listLabel"
    :key="tag.value"
    closeable
    mark
    round
    size="large"
    type="primary"
    @close="close(tag.value)"
  >
    {{ tag.label }}
  </VanTag>
  <VanTreeSelect
    v-model:active-id="activeIds"
    v-model:main-active-index="activeIndex"
    height="100vh"
    :items="MuscleListVant"
  />
  <VanSticky
    v-if="activeIds.length"
    :offset-bottom="50"
    position="bottom"
  >
    <VanButton
      size="large"
      type="primary"
      @click="redirect"
    >
      Начать тренировку
    </VanButton>
  </VanSticky>
</template>

<script lang="ts" setup>
import { type MuscleGroup, PageName } from 'shared/lib/types/app/pages';
import { MuscleList, MuscleListVant } from '../model/utils/constants';

const router = useRouter();
const activeIds = ref<MuscleGroup[]>([]);
const activeIndex = ref(0);

const listLabel = computed(() => {
  return MuscleList.value.filter(e => activeIds.value.includes(e.value));
});

function close(val: MuscleGroup) {
  activeIds.value = activeIds.value.filter(e => e !== val);
}
function redirect() {
  router.push({
    name: PageName.BASE_WORKOUT,
    params: {
      types: JSON.stringify(activeIds.value),
    },
  });
}
</script>
