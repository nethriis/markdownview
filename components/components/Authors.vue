<script setup lang="ts">
const content = ref(`## Authors

- **Author Name** - _Initial work_ - [@username](https://github.com/username)
- Other contributors
`)

const emit = defineEmits<{
  (e: 'add', content: string): void
}>()

const add = () => {
  emit('add', content.value)
}
</script>

<template>
  <UButton block color="white" @click="add()"> Authors </UButton>
</template>
