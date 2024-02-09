<script setup lang="ts">
defineProps<{
  error?: Record<string, any>
}>()
</script>

<template>
  <div>
    <NuxtLayout>
      <div class="flex items-center justify-center w-full h-[calc(100vh-65px)]">
        <div class="space-y-4">
          <div>
            <h1
              class="font-bold text-indigo-500 dark:text-indigo-400 text-4xl text-center"
            >
              {{ error?.statusCode }}
            </h1>
            <p class="text-gray-500 dark:text-gray-400 text-base">
              {{ error?.message }}
            </p>
          </div>
          <UButton block @click="clearError({ redirect: '/' })">
            Go back home
          </UButton>
        </div>
      </div>
    </NuxtLayout>
  </div>
</template>
