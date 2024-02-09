<script setup lang="ts">
const content = ref(`## Usage

Show examples of how to use your project. This will help users get the most out of it.

\`\`\`javascript
import MyProject from 'myproject';

MyProject.doSomething();
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
  <UButton block color="white" @click="add()"> Usage </UButton>
</template>
