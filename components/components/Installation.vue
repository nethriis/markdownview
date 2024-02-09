<script setup lang="ts">
const content = ref(`
## Installation

Provide instructions on how to install all development dependencies and how to run an initial setup of the project.

\`\`\`bash
npm install myproject
\`\`\`
`)

const emit = defineEmits<{
  (e: 'add', content: string): void
}>()

const add = () => {
  emit('add', content.value)
}
</script>

<template>
  <UButton block color="white" @click="add()"> Installation </UButton>
</template>
