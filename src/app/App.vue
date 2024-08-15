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

const localeStore = useLocaleStore();

const { isLoading } = useGlobalLoading();

localeStore.setLocale(Locale.RU);
</script>
