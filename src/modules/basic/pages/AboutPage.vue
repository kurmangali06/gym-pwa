<template>
  <div>
    <ApexChart
      height="350"
      :options="chartOptions"
      :series="seriesWorkout"
      type="area"
    />
    <VanField
      v-model="result"
      is-link
      label="сортировка"
      name="picker"
      placeholder="выберите сортировку"
      readonly
      @click="showPicker = true"
    />
    <VanPopup v-model:show="showPicker" position="bottom">
      <VanPicker
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </VanPopup>
  </div>
</template>

<script setup lang="ts">
import type { ApexOptions } from 'apexcharts';
import { useWorkoutService } from 'modules/workout/model/service/index.service';
import { TypeSort } from 'shared/lib/types/app/app';
import type { ITextValue } from 'shared/lib/types/app/app';
import ApexChart from 'vue3-apexcharts';

const { getWorkoutsAll } = useWorkoutService();

const seriesWorkout = ref([]);
const countDate = ref<string[]>([]);
const showPicker = ref(false);
const result = ref('Максимальный вес');
const paramType = ref<TypeSort>(TypeSort.weigh);
function onConfirm({ selectedOptions }: { selectedOptions: ITextValue<TypeSort> [] }) {
  result.value = selectedOptions[0].text;
  paramType.value = selectedOptions[0].value;
  showPicker.value = false;
}
const columns = [
  { text: 'Максимальный вес', value: TypeSort.weigh },
  { text: 'Максимальное количество', value: TypeSort.count },
  // { text: 'Тоннаш', value: 'tonne' },
];
function getAll(val: TypeSort) {
  getWorkoutsAll().then((res: any[]) => {
    const dataMap = res.reduce((acc, item) => {
      countDate.value.push(item.date);

      if (!acc[item.name]) {
        acc[item.name] = {
          name: item.label, // Use the label for chart naming
          data: [],
        };
      }

      const keys = Object.keys(item);

      const currentList = keys
        .filter(key => key.includes('approacher'))
        .map(key => parseFloat(item[key][val]));

      const maxWeigh = currentList.length > 0 ? Math.max(...currentList) : 0; //

      acc[item.name].data.push(maxWeigh);

      return acc;
    }, {});

    seriesWorkout.value = Object.values(dataMap);
  });
}

getAll(TypeSort.weigh);

watch(() => paramType.value, (val) => {
  getAll(val);
});
const chartOptions = computed((): ApexOptions => {
  return {
    chart: {
      height: 350,
      width: 200,
      type: 'area',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: countDate.value,
      labels: {
        format: 'dd/MM/yy', // Формат меток оси X
      },
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy/HH:mm',
      },
    },
  };
});
</script>
