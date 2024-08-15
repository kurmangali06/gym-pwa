<template>
  <ACalendar
    v-model:value="value"
    :disabled-date="(date) => date.isAfter(new Date())"
    @select="onSelectDay"
  />
</template>

<script setup lang="ts">
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { PageName } from 'shared/lib/types/app/pages';

const router = useRouter();

const value = ref(dayjs(new Date()));
function onSelectDay(date: Dayjs) {
  value.value = date;
  if (date.isBefore(new Date())) {
    router.push({
      name: PageName.BASE_WORKOUT,
      params: {
        date: `${date.toDate()}`,
      },
    });
  }
}

function getMonthData(value: Dayjs) {
  const currentMonth = new Date().getMonth();
  if (value.month() === currentMonth)
    return 1394;
}
</script>
