<script setup lang="ts">
const content = ref(`# Project Title

A brief description of what this project does and why it is useful.
`)

const emit = defineEmits<{
  (e: 'add', content: string): void
}>()

const add = () => {
  emit('add', content.value)
}
</script>

<template>
  <UButton block color="white" @click="add()"> Title and Description </UButton>
</template>
