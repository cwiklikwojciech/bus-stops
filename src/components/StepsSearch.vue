<template>
    <section class="bg-white p-2 mt-4">
    <fieldset class="flex items-center border border-slate-300 focus-within:border-blue-500 px-4 py-3 gap-3 max-w-sm bg-white rounded-md">
      <legend class="text-xs text-slate-400 px-1 ml-2">Search</legend>
      <input
        v-model="search"
        type="text"
        placeholder="Search..."
        class="flex-1 text-sm outline-none placeholder-slate-400 -mt-1"
      />
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-400 shrink-0 -mt-1">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    </fieldset>

    <div  class="flex items-center gap-2 py-4 px-6">
      <p class="text-base font-medium text-black">Bus Stops</p>
      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-600 border border-slate-300 rounded-md p-0.5">
        <path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>
      </svg>
    </div>

    <hr class="-mx-2 border-t-2 border-slate-200"/>

    <div class="rounded">
      <div
        v-for="stop in filteredStops"
        :key="stop.stop + stop.order"
        class="px-6 py-4 text-sm border-b last:border-b-0"
      >
        {{ stop.stop }} {{ String(stop.order).padStart(2, '0') }}
      </div>
    </div>

  </section>

</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getStops } from '@/services/api'
import { getAllStopsWithOrder, filterStopsWithOrder } from '@/utils/stop-utils'
import type { Stop } from '@/types'

const stops = ref<Stop[]>([])
const search = ref('')

onMounted(async () => {
  stops.value = await getStops()
})

const allStops = computed(() => getAllStopsWithOrder(stops.value))
const filteredStops = computed(() => filterStopsWithOrder(allStops.value, search.value))
</script>
