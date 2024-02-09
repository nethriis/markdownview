<script setup lang="ts">
const content = ref(`
## Acknowledgments

- Mention anyone who helped you
- Inspiration sources
- etc.
`)

const emit = defineEmits<{
  (e: 'add', content: string): void
}>()

const add = () => {
  emit('add', content.value)
}
</script>

<template>
  <UButton block color="white" @click="add()"> Acknowledgments </UButton>
</template>
