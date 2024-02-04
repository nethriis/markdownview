<script setup lang="ts">
import { marked } from 'marked'

const markdown = ref(
`# Welcome to MarkdownView

This Markdown example is designed to help you get started with Markdown formatting. Markdown allows you to write using an easy-to-read, easy-to-write plain text format, which then converts to structurally valid HTML.

## Basic Syntax

Below are some of the most common elements of Markdown syntax.

### Headings

Headings from \`h0\` through \`h6\` are constructed with a \`#\` for each level:

\`\`\`markdown
# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading
\`\`\`
`
)
const filename = ref('README.md')
const loading = ref(false)

const headings = computed(() => {
  const tokens = marked.lexer(markdown.value, { gfm: true })
  const filteredTokens = tokens.filter((token) => token.type === 'heading')
  return filteredTokens.map((token) => ({
    level: token.raw.match(/#/g)?.length || 0,
    text: token.raw.replace(/#+\s/, '')
  }))
})
const markdownToHtml = computed(() => marked(markdown.value))

const downloadMarkdown = () => {
  loading.value = true
  const blob = new Blob([markdown.value], { type: 'text/markdown;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename.value || 'README.md'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  loading.value = false
}

const { copy, copied } = useClipboard({ source: markdown })
</script>

<template>
  <div class="max-w-7xl h-[calc(100vh-65px)] flex items-center px-4 mx-auto">
    <div class="w-64 h-[calc(100vh-192px)] pr-4 space-y-3 flex flex-col">
      <h1 class="flex items-center space-x-2 dark:text-white font-medium">
        <Icon name="ri:list-check" size="18" class="text-gray-700 dark:text-gray-300" />
        <span class="text-gray-900 dark:text-white">
          Summary
        </span>
      </h1>
      <div class="flex-grow flex flex-col justify-between">
        <ul class="space-y-1 max-h-[464px] overflow-auto">
          <li v-for="heading of headings" :key="heading.text">
            <UButton variant="soft" block class="flex justify-between">
              <span class="max-w-40 whitespace-nowrap overflow-hidden text-ellipsis">
                {{ heading.text }}
              </span>
              <Icon :name="`ri:h-${heading.level}`" size="12" />
            </UButton>
          </li>
        </ul>
        <UButton block icon="ri:download-line" :loading="loading" @click="downloadMarkdown()">Download</UButton>
      </div>
    </div>
    <div
      class="flex w-full max-h-[calc(100vh-192px)] h-[calc(100vh-192px)] space-x-4"
    >
      <div class="relative w-full bg-[#1e1e1e] rounded-xl overflow-hidden">
        <div
          class="absolute top-4 flex items-center w-full px-4 space-x-1 z-30"
        >
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#42a5f5" d="M2.25 15.75v-8h2l3 3 3-3h2v8h-2v-5.17l-3 3-3-3v5.17zm14-8h3v4h2.5l-4 4.5-4-4.5h2.5z"/></svg>
          <input
            type="text"
            name="filename"
            id="filename"
            v-model="filename"
            class="leading-none text-sm text-gray-300 w-1/2 bg-transparent px-1 rounded-sm outline-none focus:bg-[#313131] focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <MonacoEditor
          v-model="markdown"
          lang="markdown"
          :options="{ theme: 'vs-dark' }"
          class="editor h-full pt-12 pb-2"
        />
        <UButton
          square
          :icon="copied ? 'ri:check-line' : 'ri:file-copy-line'"
          @click="copy(markdown)"
          class="absolute top-2 right-2 z-30"
        />
      </div>
      <div class="w-full h-full flex flex-col">
        <div
          class="flex w-full border border-gray-200 dark:border-gray-700 p-4 rounded-t-xl"
        >
          <span
            class="leading-none text-sm font-medium flex items-center space-x-2"
          >
            <Icon
              name="ri:book-open-line"
              size="16"
              class="text-gray-700 dark:text-gray-300"
            />
            <span class="text-gray-900 dark:text-white">
              {{ filename.split('.')[0] }}
            </span>
          </span>
        </div>
        <div
          v-html="markdownToHtml"
          class="view text-gray-900 dark:text-white w-full max-h-full h-full flex-grow flex flex-col space-y-4 p-4 border-x border-b border-x-gray-200 border-b-gray-200 dark:border-x-gray-700 dark:border-b-gray-700 rounded-b-xl overflow-auto"
        />
      </div>
    </div>
  </div>
</template>

<style>
.line-number {
  font-family: 'Geist Mono', sans-serif;
  user-select: none;
}

.editor * {
  tab-size: 2;
  font-family: 'Geist Mono', sans-serif !important;
}

.view h1 {
  font-size: 2em;
  font-weight: 600;
  line-height: 1.25;
  padding-bottom: 0.3em;
  @apply border-b border-b-gray-200 dark:border-b-gray-700;
}

.view h2 {
  font-size: 1.5em;
  font-weight: 600;
  line-height: 1.25;
  padding-bottom: 0.3em;
  @apply border-b border-b-gray-200 dark:border-b-gray-700;
}

.view h3 {
  font-size: 1.25em;
  font-weight: 600;
  line-height: 1.25;
}

.view h4 {
  font-size: 1em;
  font-weight: 600;
  line-height: 1.25;
}

.view h5 {
  font-size: 0.875em;
  font-weight: 600;
  line-height: 1.25;
}

.view h6 {
  font-size: 0.85em;
  font-weight: 600;
  line-height: 1.25;
  @apply text-gray-500 dark:text-gray-400;
}

.view p {
  margin: 0;
}

.view a {
  color: #0969da;
  text-decoration: underline;
}

.view ul {
  padding-left: 2em;
  list-style: disc;
}

.view ol {
  padding-left: 2em;
  list-style: decimal;
}

.view pre {
  @apply text-sm bg-gray-100 dark:bg-gray-800 p-4;
}

.view p code {
  @apply text-sm bg-gray-200 dark:bg-gray-700 px-1.5 py-1 rounded-md;
}

.view code {
  font-family: 'Geist Mono', sans-serif !important;
}

.view table {
  @apply block;
}

.view table th {
  font-weight: 500;
  padding: 6px 13px;
  @apply border border-gray-200 dark:border-gray-700;
}

.view table td {
  padding: 6px 13px;
  @apply border border-gray-200 dark:border-gray-700;
}

.view table tr:nth-child(2n) {
  @apply bg-gray-50 dark:bg-gray-800;
}

.view img {
  @apply max-w-full;
}
</style>
