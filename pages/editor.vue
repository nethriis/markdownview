<script setup lang="ts">
import html2canvas from 'html2canvas'

const content = ref('# Welcome to MarkdownView')
const filename = ref('README.md')
const loading = ref(false)
const isOpen = ref(false)
const importMd = ref<HTMLInputElement | null>(null)
const isShareOpen = ref(false)
const exportsOpen = ref(false)

const share = useShare()

const clickImport = () => {
  if (importMd.value) {
    importMd.value.click()
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
  link.download = `${removeFileExtension(filename.value)}.md` || 'README.md'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  loading.value = false
  isOpen.value = true
}

const downloadPNG = async () => {
  loading.value = true
  const canvas = await html2canvas(document.querySelector('.view')!, {
    useCORS: true
  })
  const img = document.createElement('img')

  img.src = canvas.toDataURL('image/png')
  document.body.appendChild(img)

  const a = document.createElement('a')

  a.href = img.src
  a.download = `${removeFileExtension(filename.value)}.png` || 'README.png'
  a.click()
  loading.value = false
}

const downloadHTML = async () => {
  loading.value = true

  try {
    const data = await $fetch('/api/html', {
      method: 'POST',
      body: {
        html: content.value
      },
      headers: {
        'Content-Type': 'application/json'
      },
      responseType: 'blob'
    })

    const url = URL.createObjectURL(data as any)
    const link = document.createElement('a')

    link.href = url
    link.download =
      `${removeFileExtension(filename.value)}.html` || 'README.html'
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Error downloading HTML', err)
  } finally {
    loading.value = false
    isOpen.value = true
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

const exportItems = [
  [
    {
      label: 'Markdown',
      icon: 'ri:markdown-line',
      click: downloadMarkdown
    },
    {
      label: 'PNG',
      icon: 'ri:image-2-line',
      click: downloadPNG
    },
    {
      label: 'HTML',
      icon: 'ri:html5-line',
      click: downloadHTML
    }
  ]
]

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
    class="max-w-7xl sm:h-[calc(100vh-65px)] flex items-center flex-col sm:flex-row px-4 py-4 sm:py-0 mx-auto"
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
            variant="soft"
            icon="ri:share-line"
            @click="shareMarkdown()"
          >
            Share
          </UButton>
          <UButton
            block
            variant="outline"
            icon="ri:import-line"
            @click="clickImport()"
          >
            Import file
          </UButton>
          <UDropdown
            v-model:open="exportsOpen"
            :items="exportItems"
            :popper="{ placement: 'top-start' }"
            class="w-full"
          >
            <UButton
              block
              :loading="loading"
              loadingIcon="ri:loader-2-fill"
              trailing-icon="ri:arrow-down-s-line"
            >
              Export
            </UButton>
          </UDropdown>
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
            class="leading-none text-sm text-gray-300 w-1/2 bg-transparent px-1 rounded-sm outline-none focus:bg-[#1e1e1e] focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <Editor v-model="content" class="max-w-full w-full h-full" />
        <button
          @click="clickImport()"
          class="absolute hidden sm:block lg:hidden top-2 right-12 z-30 py-1.5 font-medium text-sm text-indigo-400 hover:bg-indigo-950 border border-indigo-400 px-2.5 rounded-md"
        >
          Import...
        </button>
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
          <UButton
            square
            variant="soft"
            @click="shareMarkdown()"
            class="hidden sm:block lg:hidden absolute top-2 right-36"
          >
            <Icon name="ri:share-line" size="20" />
          </UButton>
          <div class="hidden sm:block lg:hidden absolute top-2 right-12">
            <UDropdown
              v-model:open="exportsOpen"
              :items="exportItems"
              :popper="{ placement: 'bottom-start' }"
            >
              <UButton
                :loading="loading"
                loadingIcon="ri:loader-2-fill"
                trailing-icon="ri:arrow-down-s-line"
              >
                Export
              </UButton>
            </UDropdown>
          </div>
          <div class="absolute top-2 right-2">
            <UPopover :popper="{ placement: 'bottom-end' }">
              <UButton variant="ghost" color="gray" square>
                <Icon name="ri:list-check" size="20" />
              </UButton>
              <template #panel>
                <div
                  class="max-w-64 max-h-[calc(100vh-242px)] p-4 overflow-y-auto"
                >
                  <ToC v-model="content" />
                </div>
              </template>
            </UPopover>
          </div>
        </div>
        <div
          class="w-full max-h-[calc(100%-50px)] h-[calc(100%-50px)] flex-grow flex flex-col border-x border-b border-x-gray-200 border-b-gray-200 dark:border-x-gray-700 dark:border-b-gray-700 rounded-b-xl"
        >
          <div class="h-full max-h-full overflow-auto">
            <Renderer
              v-model="content"
              class="text-gray-900 dark:text-white space-y-4"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="block sm:hidden w-full space-y-2">
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
        variant="soft"
        icon="ri:share-line"
        @click="shareMarkdown()"
      >
        Share
      </UButton>
      <UButton
        block
        variant="outline"
        icon="ri:import-line"
        @click="clickImport()"
      >
        Import file
      </UButton>
      <UDropdown
        v-model:open="exportsOpen"
        :items="exportItems"
        :popper="{ placement: 'top-start' }"
        class="w-full"
      >
        <UButton
          block
          :loading="loading"
          loadingIcon="ri:loader-2-fill"
          trailing-icon="ri:arrow-down-s-line"
        >
          Export
        </UButton>
      </UDropdown>
    </div>
    <UModal v-model="isOpen" :ui="{ width: 'w-fit' }">
      <div class="max-w-sm p-6 space-y-6">
        <p class="text-center text-7xl">📜</p>
        <h3
          class="text-center text-lg text-gray-900 dark:text-white font-medium"
        >
          Your file has been generated successfully!
        </h3>
        <p
          class="text-center text-sm text-gray-500 dark:text-gray-400 flex flex-col items-center space-y-2"
        >
          <span>
            Thanks for using MarkdownView. Do not hesitate to give me your
            feedback or suggestions.
          </span>
          <span>
            You can support me by buying me a coffee or sponsoring me on github.
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
            You can support me by buying me a coffee or sponsoring me on github.
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
