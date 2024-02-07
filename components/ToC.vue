<script setup lang="ts">
import markdownit from 'markdown-it'
import anchor from 'markdown-it-anchor'
import toc from 'markdown-it-table-of-contents'

const model = defineModel<string>({
  required: true
})

const generateHtmlFromMarkdown = (markdown: string) => {
  const md = markdownit()
    .use(anchor)
    .use(toc, {
      includeLevel: [1, 2, 3, 4, 5, 6]
    })

  return md.render(markdown + '\n[[toc]]')
}
</script>

<template>
  <div class="mdview-toc" v-html="generateHtmlFromMarkdown(model)"></div>
</template>

<style>
div.mdview-toc > :not(.table-of-contents) {
  @apply hidden;
}

div.mdview-toc .table-of-contents {
  @apply text-sm block;
}

div.mdview-toc .table-of-contents > ul {
  @apply font-semibold list-none pl-0;
}

div.mdview-toc .table-of-contents ul a {
  @apply inline-block w-full px-2 py-1.5;
}

div.mdview-toc .table-of-contents > ul ul {
  @apply text-sm font-normal list-none pl-4;
}
</style>
