<script setup lang="ts">
import '@fontsource/geist-sans/400.css'
import '@fontsource/geist-sans/500.css'
import '@fontsource/geist-sans/600.css'
import '@fontsource/geist-sans/700.css'
import '@fontsource/geist-mono/400.css'
import '@fontsource/geist-mono/700.css'

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ],
  script: [
    {
      'data-name': 'BMC-Widget',
      'data-cfasync': 'false',
      src: 'https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js',
      'data-id': 'nethris',
      'data-description': 'Support me on Buy me a coffee!',
      'data-message': '',
      'data-color': '#BD5FFF',
      'data-position': 'Right',
      'data-x_margin': '18',
      'data-y_margin': '18'
    }
  ]
})

useSeoMeta({
  ogImage:
    'https://github.com/nethriis/markdownview/blob/main/assets/images/og-image.png?raw=true',
  twitterImage:
    'https://github.com/nethriis/markdownview/blob/main/assets/images/og-image.png?raw=true',
  twitterTitle: 'MarkdownView',
  twitterDescription: 'A simple, fast, and free markdown viewer.'
})

onMounted(() => {
  const bmc = document.getElementById('bmc-wbtn')

  if (bmc) {
    let toHide = bmc.nextElementSibling as HTMLDivElement

    toHide.style.display = 'none'
  }
})
</script>

<template>
  <NuxtLoadingIndicator color="indigo" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
