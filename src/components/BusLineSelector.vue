<template>
  <section class="bg-white p-6 mt-4">
    <p class="font-bold text-black">Select Bus Line</p>

    <div v-if="isLoading" class="my-6 text-sm text-slate-400">Loading...</div>
    <div v-else-if="error" class="my-6 text-sm text-red-500">{{ error }}</div>
    <div v-else class="flex flex-wrap gap-2 my-6">
      <button
        v-for="line in lines"
        :key="line"
        @click="selectLine(line)"
        :aria-label="`Bus line ${line}`"
        :aria-pressed="selectedLine === line"
        class="p-4 py-2 rounded text-sm font-medium text-white transition-colors"
        :class="selectedLine === line ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'"
      >
        {{ line }}
      </button>
    </div>
  </section>

  <div class="flex flex-col md:flex-row gap-4 md:flex-1 md:overflow-hidden">
    <ListPanel
      :title="selectedLine !== null ? `Bus Line: ${selectedLine}` : undefined"
      :is-empty="selectedLine === null"
      empty-message="Please select the bus line first"
    >
      <template #subheader>
        <div v-if="selectedLine !== null" class="flex items-center gap-2 py-4 px-6">
          <p class="text-base font-medium text-black">Bus Stops</p>
          <IconArrowDown class="text-slate-600 border border-slate-300 rounded-md p-0.5" />
        </div>
      </template>

      <button
        v-for="stop in stopsForLine"
        :key="stop.stop + stop.order"
        @click="selectStop(stop.stop)"
        :aria-pressed="selectedStop === stop.stop"
        class="w-full text-left px-6 py-4 text-sm border-b border-slate-200"
        :class="selectedStop === stop.stop ? 'bg-blue-50 font-semibold text-blue-700' : 'hover:bg-slate-50'"
      >
        {{ formatStopEntry(stop) }}
      </button>
    </ListPanel>

    <ListPanel
      :title="selectedStop !== null ? `Bus Stop: ${selectedStop}` : undefined"
      :is-empty="selectedStop === null"
      empty-message="Please select the bus stop first"
    >
      <template #subheader>
        <p v-if="selectedStop !== null" class="text-base font-medium text-black py-4 px-6">Time</p>
      </template>

      <div v-for="time in times" :key="time" class="px-6 py-4 text-sm border-b border-slate-200">
        {{ time }}
      </div>
    </ListPanel>
  </div>
</template>

<script setup lang="ts">
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import ListPanel from '@/components/ListPanel.vue'
import { storeToRefs } from 'pinia'
import { useStopsStore } from '@/store'
import { formatStopEntry } from '@/utils/stop-utils'
import { onMounted } from 'vue'

const store = useStopsStore()
const { lines, stopsForLine, times, selectedLine, selectedStop, isLoading, error } = storeToRefs(store)
const { fetchStops, selectLine, selectStop } = store

onMounted(fetchStops)
</script>
