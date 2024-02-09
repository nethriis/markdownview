<script setup lang="ts">
const content = ref(`
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Build Status](https://img.shields.io/travis/com/username/projectname/master.svg)
`)

const emit = defineEmits<{
  (e: 'add', content: string): void
}>()

const add = () => {
  emit('add', content.value)
}
</script>

<template>
  <UButton block color="white" @click="add()"> Badges </UButton>
</template>
