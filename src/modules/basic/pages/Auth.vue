<template>
  <VanForm
    class="flex flex-col justify-center items-center h-screen"
    @submit="onSubmit"
  >
    <VanCellGroup inset>
      <VanField
        v-model="username"
        label="Username"
        name="Username"
        placeholder="Username"
        :rules="[{ required: true, message: 'Username is required' }]"
        type="email"
      />
      <VanField
        v-model="password"
        label="Password"
        name="Password"
        placeholder="Password"
        :rules="[{ required: true, message: 'Password is required' }]"
        type="password"
      />
    </VanCellGroup>
    <div class="mt-3 flex items-center gap-2">
      <VanButton
        block
        native-type="submit"
        round
        type="primary"
      >
        Создать
      </VanButton>
      <VanButton
        block
        round
        :to="{ name: PageName.BASE_SING_IN }"
      >
        Войти
      </VanButton>
    </div>
  </VanForm>
</template>

<script lang="ts" setup>
import { useAuthService } from 'shared/service/auth.service';
import { PageName } from 'shared/lib/types/app/pages';

const { createUser } = useAuthService();
const username = ref('');
const password = ref('');
async function onSubmit() {
  await createUser({
    email: username.value,
    password: password.value,
  }).then((res) => {

  }).catch((err) => {
    showNotify({ type: 'danger', message: err });
  });
}
</script>
