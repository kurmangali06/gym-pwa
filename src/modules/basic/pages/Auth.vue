<template>
  <VanForm @submit="onSubmit">
    <VanCellGroup inset>
      <VanField
        v-model="tel"
        label="Phone"
        :rules="[{ required: true, message: 'Phone is required' }]"
        type="tel"
      />
    </VanCellGroup>
    <div style="margin: 16px;">
      <VanButton
        block
        native-type="submit"
        round
        type="primary"
        @click="onSubmit"
      >
        Войти
      </VanButton>
    </div>
  </VanForm>
</template>

<script lang="ts" setup>
import { useAuthService } from 'shared/service/auth.service';

const { authEmail } = useAuthService();
const tel = ref('');
function onSubmit() {
  authEmail(tel.value);
}
</script>
