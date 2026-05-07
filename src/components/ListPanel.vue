<template>
  <section class="bg-white mt-4 flex flex-col md:flex-1 md:overflow-hidden">
    <template v-if="title">
      <p class="text-lg font-bold text-black py-4 px-6">{{ title }}</p>
    </template>

    <slot name="subheader" />

    <hr v-if="title" class="-mx-6 border-t-2 border-slate-200" />

    <div
      class="md:flex-1 overflow-y-auto"
      :class="isEmpty ? 'dashed-border' : ''"
    >
      <slot v-if="!isEmpty" />
      <div v-else class="flex items-center justify-center h-full text-slate-400 text-sm">
        {{ emptyMessage }}
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  isEmpty: boolean
  emptyMessage: string
}>()
</script>

<style scoped>
.dashed-border {
  border-radius: 12px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%2394A3B8' stroke-width='4' stroke-dasharray='20 24' stroke-linecap='butt'/%3e%3c/svg%3e");
}
</style>
