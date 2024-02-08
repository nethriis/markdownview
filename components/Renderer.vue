<script setup lang="ts">
import markdownit from 'markdown-it'
import checkbox from 'markdown-it-task-checkbox'
import { full as emoji } from 'markdown-it-emoji'
import footnote from 'markdown-it-footnote'
import hljs from 'highlight.js'

const model = defineModel<string>({
  required: true
})

const md = markdownit({
  html: true,
  linkify: true,
  xhtmlOut: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value
      } catch (_) {}
    }

    return ''
  }
})
  .use(checkbox, {
    liClass: 'list-none'
  })
  .use(emoji, { shortcuts: {} })
  .use(footnote)
</script>

<template>
  <div id="preview" class="view p-4" v-html="md.render(model)" />
</template>

<style>
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
  @apply relative pl-8 list-disc;
}

.view ol {
  @apply pl-8 list-decimal;
}

.view :not(ul li) > input[type='checkbox'] {
  @apply hidden;
}

.view ul li input[type='checkbox'] {
  @apply mt-0 mr-[.2em] mb-[.25em] ml-[-1.4em];
}

.view code {
  font-family: 'Geist Mono', sans-serif !important;
  @apply text-sm bg-gray-200 dark:bg-gray-700 px-1.5 py-1 rounded-md;
}

.view code * {
  font-family: 'Geist Mono', sans-serif !important;
}

.view pre {
  @apply text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-auto;
}

.view pre code {
  @apply bg-gray-100 dark:bg-gray-800 p-0 rounded-none;
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

.view blockquote {
  @apply px-4 border-l-4 border-gray-200 dark:border-gray-700;
}

.view blockquote * {
  @apply text-gray-500 dark:text-gray-400;
}

.view hr {
  @apply border-t-4 border-gray-200 dark:border-gray-700;
}

.view img {
  @apply max-w-full;
}

.view hr.footnotes-sep {
  @apply hidden;
}

.view .footnotes {
  @apply border-t border-gray-200 dark:border-gray-700;
}

.view .footnotes ol {
  @apply space-y-4 mt-4;
}

.view .footnotes * {
  @apply text-xs text-gray-500 dark:text-gray-400;
}

/* Highlight.js */

pre code.hljs {
  @apply block overflow-x-auto p-4;
}

code.hljs {
  @apply py-[3px] px-[5px];
}

.hljs {
  @apply text-[#24292e] bg-[#ffffff] dark:text-[#c9d1d9] dark:bg-[#0d1117];
}

.hljs-doctag,
.hljs-keyword,
.hljs-meta .hljs-keyword,
.hljs-template-tag,
.hljs-template-variable,
.hljs-type,
.hljs-variable.language_ {
  @apply text-[#d73a49] dark:text-[#ff7b72];
}

.hljs-title,
.hljs-title.class_,
.hljs-title.class_.inherited__,
.hljs-title.function_ {
  @apply text-[#6f42c1] dark:text-[#d2a8ff];
}

.hljs-attr,
.hljs-attribute,
.hljs-literal,
.hljs-meta,
.hljs-number,
.hljs-operator,
.hljs-variable,
.hljs-selector-attr,
.hljs-selector-class,
.hljs-selector-id {
  @apply text-[#005cc5] dark:text-[#79c0ff];
}

.hljs-regexp,
.hljs-string,
.hljs-meta .hljs-string {
  @apply text-[#032f62] dark:text-[#a5d6ff];
}

.hljs-built_in,
.hljs-symbol {
  @apply text-[#e36209] dark:text-[#ffa657];
}

.hljs-comment,
.hljs-code,
.hljs-formula {
  @apply text-[#6a737d] dark:text-[#8b949e];
}

.hljs-name,
.hljs-quote,
.hljs-selector-tag,
.hljs-selector-pseudo {
  @apply text-[#22863a] dark:text-[#7ee787];
}

.hljs-subst {
  @apply text-[#24292e] dark:text-[#c9d1d9];
}

.hljs-section {
  @apply text-[#005cc5] dark:text-[#1f6feb] font-bold;
}

.hljs-bullet {
  @apply text-[#735c0f] dark:text-[#f2cc60];
}

.hljs-emphasis {
  @apply text-[#24292e] dark:text-[#c9d1d9] italic;
}

.hljs-strong {
  @apply text-[#24292e] dark:text-[#c9d1d9] font-bold;
}

.hljs-addition {
  @apply text-[#22863a] dark:text-[#aff5b4] bg-[#f0fff4] dark:bg-[#033a16];
}

.hljs-deletion {
  @apply text-[#b31d28] dark:text-[#ffdcd7] bg-[#ffeef0] dark:bg-[#67060c];
}

.hljs-char.escape_,
.hljs-link,
.hljs-params,
.hljs-property,
.hljs-punctuation,
.hljs-tag {
}
</style>
