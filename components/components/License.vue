<script setup lang="ts">
const content = ref(`## License

Distributed under the MIT License. See \`LICENSE\` for more information.
`)

const emit = defineEmits<{
  (e: 'add', content: string): void
}>()

const add = () => {
  emit('add', content.value)
}
</script>

<template>
  <UButton block color="white" @click="add()"> License </UButton>
</template>
