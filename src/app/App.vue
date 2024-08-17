<template>
  <div>
    <LoadingSpinner :is-visible="isLoading" />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { Locale } from 'shared/config/locale-config';
import { useGlobalLoading } from 'shared/lib/composables/useLoading';
import { useLocaleStore } from 'shared/stores/locale.store';
import LoadingSpinner from 'shared/ui/LoadingSpinner.vue';
import 'vant/lib/index.css';
import { Locale as LocaleVant } from 'vant';
import ruRU from 'vant/es/locale/lang/ru-RU';

LocaleVant.use('ru-RU', ruRU);
const localeStore = useLocaleStore();

const { isLoading } = useGlobalLoading();

localeStore.setLocale(Locale.RU);
</script>
