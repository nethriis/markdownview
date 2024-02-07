<script setup lang="ts">
const content = ref('# Welcome to MarkdownView')
const filename = ref('README.md')
const loading = ref(false)
const isOpen = ref(false)
const importMd = ref<HTMLInputElement | null>(null)
const isShareOpen = ref(false)

const share = useShare()

const clickImport = () => {
  if (importMd.value) {
    importMd.value.click()
  }
}

const onImport = (event: Event) => {
  const file = (event.target as HTMLInputElement).files![0]

  if (file) {
    const reader = new FileReader()

    reader.readAsText(file, 'UTF-8')
    reader.onload = (evt) => {
      content.value = String(evt.target?.result)
      console.log(content.value)
    }
    reader.onerror = (_) => {
      console.error('Error reading file')
    }
  }
}

const downloadMarkdown = () => {
  loading.value = true
  const blob = new Blob([content.value], {
    type: 'text/markdown;charset=utf-8'
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = filename.value || 'README.md'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  loading.value = false
  isOpen.value = true
}

const shareMarkdown = () => {
  const encodedContent = share.encodeMarkdown(content.value)
  const shareUrl = share.createShareUrl(encodedContent)

  navigator.clipboard
    .writeText(shareUrl)
    .then(() => {
      isShareOpen.value = true
    })
    .catch((err) => {
      console.error('Error sharing markdown', err)
    })
}

const { copy, copied } = useClipboard({ source: content })

onMounted(() => {
  const markdownText = share.getMarkdownFromUrl()

  if (markdownText) {
    content.value = markdownText
  }
})
</script>

<template>
  <div
    class="max-w-7xl sm:h-[calc(100vh-65px)] flex items-center px-4 py-4 sm:py-0 mx-auto"
  >
    <div
      class="lg:flex w-64 sm:h-[calc(100vh-192px)] pr-4 space-y-3 hidden flex-col"
    >
      <h1 class="flex items-center space-x-2 dark:text-white font-medium">
        <Icon
          name="ri:box-3-line"
          size="18"
          class="text-gray-700 dark:text-gray-300"
        />
        <span class="text-gray-900 dark:text-white">Components</span>
      </h1>
      <div class="flex-grow flex flex-col justify-between">
        <ul class="space-y-1 max-h-[464px] overflow-auto">
          <li></li>
        </ul>
        <div class="space-y-2">
          <input
            ref="importMd"
            type="file"
            name="import-md"
            id="import-md"
            class="w-0 h-0 overflow-hidden"
            accept=".md"
            @change="onImport"
          />
          <UButton
            block
            variant="outline"
            icon="ri:import-line"
            @click="clickImport()"
            :loading="loading"
          >
            Import file
          </UButton>
          <UButton
            block
            icon="ri:share-line"
            @click="shareMarkdown()"
            :loading="loading"
          >
            Share
          </UButton>
        </div>
      </div>
    </div>
    <div
      class="grid sm:grid-cols-2 grid-cols-1 grid-rows-2 gap-4 w-full sm:max-h-[calc(100vh-192px)] sm:h-[calc(100vh-192px)]"
    >
      <div
        class="relative bg-[#333338] h-[calc(100vh-192px)] pt-12 rounded-xl overflow-hidden"
      >
        <div
          class="absolute top-4 flex items-center w-full px-4 space-x-1 z-30"
        >
          <svg
            class="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="#42a5f5"
              d="M2.25 15.75v-8h2l3 3 3-3h2v8h-2v-5.17l-3 3-3-3v5.17zm14-8h3v4h2.5l-4 4.5-4-4.5h2.5z"
            />
          </svg>
          <input
            type="text"
            name="filename"
            id="filename"
            v-model="filename"
            class="leading-none text-sm text-gray-300 w-1/2 bg-transparent px-1 rounded-sm outline-none focus:bg-[#1e1e1e] focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <Editor v-model="content" class="max-w-full w-full h-full" />
        <UButton
          square
          @click="copy(content)"
          class="absolute top-2 right-2 z-30"
        >
          <Icon v-if="copied" name="ri:check-line" size="20" />
          <Icon v-else name="ri:file-copy-line" size="20" />
        </UButton>
      </div>
      <div class="h-[calc(100vh-192px)] flex flex-col">
        <div
          class="relative flex w-full border border-gray-200 dark:border-gray-700 p-4 rounded-t-xl"
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
          <div class="hidden lg:block absolute top-2 right-12">
            <UButton
              block
              icon="ri:download-line"
              :loading="loading"
              @click="downloadMarkdown()"
            >
              Download
            </UButton>
          </div>
          <div class="lg:hidden absolute top-2 right-12">
            <UButton square @click="downloadMarkdown()">
              <Icon name="ri:download-line" size="20" />
            </UButton>
          </div>
          <div class="absolute top-2 right-2">
            <UPopover :popper="{ placement: 'bottom-end' }">
              <UButton variant="ghost" color="gray" square>
                <Icon name="ri:list-check" size="20" />
              </UButton>
              <template #panel>
                <div class="p-4">
                  <ToC v-model="content" />
                </div>
              </template>
            </UPopover>
          </div>
        </div>
        <div
          class="w-full max-h-[calc(100%-50px)] h-[calc(100%-50px)] flex-grow flex flex-col border-x border-b border-x-gray-200 border-b-gray-200 dark:border-x-gray-700 dark:border-b-gray-700 rounded-b-xl"
        >
          <Renderer
            v-model="content"
            class="text-gray-900 dark:text-white h-full max-h-full space-y-4 overflow-auto"
          />
        </div>
      </div>
      <UModal v-model="isOpen" :ui="{ width: 'w-fit' }">
        <div class="max-w-sm p-6 space-y-6">
          <p class="text-center text-7xl">📜</p>
          <h3
            class="text-center text-lg text-gray-900 dark:text-white font-medium"
          >
            {{ filename }} generated successfully!
          </h3>
          <p
            class="text-center text-sm text-gray-500 dark:text-gray-400 flex flex-col items-center space-y-2"
          >
            <span>
              Thanks for using MarkdownView. Do not hesitate to give me your
              feedback or suggestions.
            </span>
            <span>
              You can support me by buying me a coffee or sponsoring me on
              github.
            </span>
          </p>
          <div class="flex justify-center space-x-4">
            <UButton
              variant="outline"
              size="sm"
              icon="ri:heart-line"
              to="https://github.com/sponsors/nethriis"
              target="_blank"
            >
              Sponsor
            </UButton>
          </div>
        </div>
      </UModal>
      <UModal v-model="isShareOpen" :ui="{ width: 'w-fit' }">
        <div class="max-w-sm p-6 space-y-6">
          <p class="text-center text-7xl">📝</p>
          <h3
            class="text-center text-lg text-gray-900 dark:text-white font-medium"
          >
            Link copied to clipboard!
          </h3>
          <p
            class="text-center text-sm text-gray-500 dark:text-gray-400 flex flex-col items-center space-y-2"
          >
            <span>
              Thanks for using MarkdownView. Do not hesitate to give me your
              feedback or suggestions.
            </span>
            <span>
              You can support me by buying me a coffee or sponsoring me on
              github.
            </span>
          </p>
          <div class="flex justify-center space-x-4">
            <UButton
              variant="outline"
              size="sm"
              icon="ri:heart-line"
              to="https://github.com/sponsors/nethriis"
              target="_blank"
            >
              Sponsor
            </UButton>
          </div>
        </div>
      </UModal>
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
</style>
