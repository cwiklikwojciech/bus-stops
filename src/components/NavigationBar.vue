<template>
  <div class="mb-6">
    <h1 class="text-3xl font-semibold text-slate-900">Timetable</h1>
  </div>

  <div class="flex gap-6 bg-white">
    <button
      @click="emit('update:modelValue', 'lines')"
      :aria-selected="modelValue === 'lines'"
      role="tab"
      class="font-medium border-b-2 p-5 ml-6 transition-colors duration-200"
      :class="tabClass('lines')"
    >
      Bus Lines
    </button>

    <button
      @click="emit('update:modelValue', 'stops')"
      :aria-selected="modelValue === 'stops'"
      role="tab"
      class="font-medium border-b-2 p-5 transition-colors duration-200"
      :class="tabClass('stops')"
    >
      Stops
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Tab } from '@/types'

const props = defineProps<{
  modelValue: Tab
}>()

function tabClass(tab: Tab) {
  return props.modelValue === tab
    ? 'border-blue-600 text-slate-900'
    : 'border-transparent text-slate-500 hover:text-slate-900'
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: Tab): void
}>()
</script>
