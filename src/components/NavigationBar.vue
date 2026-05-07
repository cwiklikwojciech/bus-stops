<template>
  <div class="mb-6">
    <h1 class="text-3xl font-semibold text-slate-900">Timetable</h1>
  </div>

  <div class="flex gap-6 bg-white">
    <div
      @click="emit('update:modelValue', 'lines')"
      class="font-medium border-b-2 p-5 ml-6 cursor-pointer transition-colors duration-200"
      :class="tabClass('lines')"
    >
      Bus Lines
    </div>

    <div
      @click="emit('update:modelValue', 'stops')"
      class="font-medium border-b-2 p-5 cursor-pointer transition-colors duration-200"
      :class="tabClass('stops')"
    >
      Stops
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: 'lines' | 'stops'
}>()

function tabClass(tab: 'lines' | 'stops') {
  return props.modelValue === tab
    ? 'border-blue-600 text-slate-900'
    : 'border-transparent text-slate-500 hover:text-slate-900'
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: 'lines' | 'stops'): void
}>()
</script>
