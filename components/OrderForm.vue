<template>
  <div>
    <h1>基本</h1>
    <ValidationObserver ref="myform">
      <validation-provider v-slot="{ errors }" rules="email|required">
        <input v-model="email" name="email" type="text" />
        <span>{{ errors[0] }}</span>
      </validation-provider>
    </ValidationObserver>
    <MyFooter />
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
    }
  },
}
</script>
