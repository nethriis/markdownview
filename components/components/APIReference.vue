<script setup lang="ts">
const content = ref(`
## API Reference

If your project is a library, describe the functions that can be called, their parameters, and return values.

**Base URL**

https://api.example.com/v1

### Get all items
\`\`\`html
GET /items
\`\`\`

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| \`api_key\` | \`string\` | **Required**. Your API key |
`)

const emit = defineEmits<{
  (e: 'add', content: string): void
}>()

const add = () => {
  emit('add', content.value)
}
</script>

<template>
  <UButton block color="white" @click="add()"> API Reference </UButton>
</template>
