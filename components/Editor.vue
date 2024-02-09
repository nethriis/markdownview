<script setup lang="ts">
import { EditorView, basicSetup } from 'codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { languages } from '@codemirror/language-data'
import { EditorState, Transaction } from '@codemirror/state'
import { githubDark } from '@uiw/codemirror-theme-github'

const model = defineModel<string>({
  required: true
})
const emit = defineEmits(['update:modelValue'])

const editorViewRef = ref<any>(null)

const insertTextAtCursor = (text: string) => {
  if (!editorViewRef.value) return

  const editorView = editorViewRef.value
  const insertPos = editorView.state.selection.main.from

  editorView.dispatch({
    changes: { from: insertPos, insert: text }
  })
}

defineExpose({
  insertTextAtCursor
})

onMounted(() => {
  const updateListenerExtension = EditorState.transactionFilter.of(
    (tr: Transaction) => {
      if (tr.docChanged) {
        const newValue = tr.newDoc.toString()
        emit('update:modelValue', newValue)
      }
      return tr
    }
  )

  const state = EditorState.create({
    doc: model.value,
    extensions: [
      githubDark,
      basicSetup,
      markdown({ codeLanguages: languages }),
      updateListenerExtension
    ]
  })

  editorViewRef.value = new EditorView({
    state,
    parent: document.getElementById('editor')!
  })
})

watch(
  () => model.value,
  (newValue) => {
    if (
      editorViewRef.value &&
      newValue !== editorViewRef.value.state.doc.toString()
    ) {
      editorViewRef.value.dispatch({
        changes: {
          from: 0,
          to: editorViewRef.value.state.doc.length,
          insert: newValue
        }
      })
    }
  }
)
</script>

<template>
  <div id="editor"></div>
</template>
