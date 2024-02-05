<script lang="ts">
import { EditorView, basicSetup } from 'codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { EditorState, Transaction } from '@codemirror/state'
import { githubDark } from '@uiw/codemirror-theme-github'

export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value: string) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  mounted() {
    const updateListenerExtension = EditorState.transactionFilter.of(
      (tr: Transaction) => {
        if (tr.docChanged) {
          const newValue = tr.newDoc.toString()
          this.$emit('update:modelValue', newValue)
        }
        return tr
      }
    )

    const state = EditorState.create({
      doc: this.value,
      extensions: [
        githubDark,
        basicSetup,
        markdown({ codeLanguages: languages }),
        updateListenerExtension
      ]
    })

    new EditorView({
      state,
      doc: this.value,
      parent: document.getElementById('editor')!
    })
  }
}
</script>

<template>
  <div id="editor"></div>
</template>
