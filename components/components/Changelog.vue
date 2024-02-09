<script setup lang="ts">
const content = ref(`## Changelog

- 1.0.0
  - Added feature A
  - Fixed bug B
`)

const emit = defineEmits<{
  (e: 'add', content: string): void
}>()

const add = () => {
  emit('add', content.value)
}
</script>

<template>
  <UButton block color="white" @click="add()"> Changelog </UButton>
</template>
