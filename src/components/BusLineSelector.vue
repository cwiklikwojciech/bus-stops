<template>
  <section class="bg-white p-6 mt-4">
    <p class="font-bold text-black">Select Bus Line</p>

    <div class="flex flex-wrap gap-2 my-6">
      <button
        v-for="line in lines"
        :key="line"
        @click="selectLine(line)"
        class="p-4 py-2 rounded text-sm font-medium text-white transition-colors"
        :class="selectedLine === line ? 'bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'"
      >
        {{ line }}
      </button>
    </div>

  </section>

  <div class="flex flex-col md:flex-row gap-4 md:flex-1 md:overflow-hidden">
    <section class="bg-white mt-4 flex flex-col md:flex-1 md:overflow-hidden">
      <p
        v-if="selectedLine !== null"
        class="text-lg font-bold text-black py-4 px-6"
      >
        Bus Line: {{ selectedLine }}
      </p>
      <div v-if="selectedLine !== null" class="flex items-center gap-2 py-4 px-6">
        <p class="text-base font-medium text-black">Bus Stops</p>
        <IconArrowDown class="text-slate-600 border border-slate-300 rounded-md p-0.5" />
      </div>

      <hr v-if="selectedLine !== null" class="-mx-6 border-t-2 border-slate-200"/>

      <div
        class="md:flex-1 overflow-y-auto"
        :class="selectedLine === null ? 'dashed-border' : ''"
      >
        <template v-if="selectedLine !== null">
          <div
            v-for="stop in stopsForLine"
            :key="stop.stop + stop.order"
            @click="selectedStop = stop.stop"
            class="px-6 py-4 text-sm cursor-pointer border-b border-slate-200"
            :class="selectedStop === stop.stop
              ? 'bg-blue-50 font-semibold text-blue-700'
              : 'hover:bg-slate-50'"
          >
            {{ stop.stop }} {{ String(stop.order).padStart(2, '0') }}
          </div>
        </template>
        <div v-else class="flex items-center justify-center h-full text-slate-400 text-sm">
          Please select the bus line first
        </div>
      </div>
    </section>

    <section class="bg-white mt-4 flex flex-col md:flex-1 md:overflow-hidden">
      <p
        v-if="selectedStop !== null"
        class="text-lg font-bold text-black py-4 px-6"
      >
        Bus Stop: {{ selectedStop }}
      </p>
      <p v-if="selectedStop !== null" class="text-base font-medium text-black py-4 px-6">Time</p>

      <hr v-if="selectedStop !== null" class="-mx-6 border-t-2 border-slate-200"/>

      <div
        class="md:flex-1 overflow-y-auto"
        :class="selectedStop === null ? 'dashed-border' : ''"
      >
        <template v-if="selectedStop !== null">
          <div v-for="time in times" :key="time" class="px-6 py-4 text-sm border-b border-slate-200">
            {{ time }}
          </div>
        </template>
        <div v-else class="flex items-center justify-center h-full text-slate-400 text-sm">
          Please select the bus stop first
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import IconArrowDown from '@/components/icons/IconArrowDown.vue'
import { storeToRefs } from 'pinia'
import { useStopsStore } from '@/store'
import { onMounted } from 'vue'

const store = useStopsStore()
const { lines, stopsForLine, times, selectedLine, selectedStop } = storeToRefs(store)
const { fetchStops, selectLine } = store

onMounted(fetchStops)
</script>

<style scoped>
.dashed-border {
  border-radius: 12px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='12' ry='12' stroke='%2394A3B8' stroke-width='4' stroke-dasharray='20 24' stroke-linecap='butt'/%3e%3c/svg%3e");
}
</style>
