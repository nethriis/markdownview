<script setup lang="ts">
const content = ref(`## Tests

Detail how to run the tests for this system.

\`\`\`bash
npm run test
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
  <UButton block color="white" @click="add()"> Tests </UButton>
</template>
