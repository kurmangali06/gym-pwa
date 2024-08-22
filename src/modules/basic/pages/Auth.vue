<template>
  <VanForm @submit="onSubmit">
    <VanCellGroup inset>
      <VanField
        v-model="username"
        label="Username"
        name="Username"
        placeholder="Username"
        :rules="[{ required: true, message: 'Username is required' }]"
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
    <div style="margin: 16px;">
      <VanButton
        block
        native-type="submit"
        round
        type="primary"
      >
        Войти
      </VanButton>
    </div>
  </VanForm>
</template>

<script lang="ts" setup>
const username = ref('');
const password = ref('');
function onSubmit(values: {
  Password: string
  Username: string
}) {

}
</script>
