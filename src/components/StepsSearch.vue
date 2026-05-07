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
      <IconSearch class="text-slate-400 shrink-0 -mt-1" />
    </fieldset>

    <div  class="flex items-center gap-2 py-4 px-6">
      <p class="text-base font-medium text-black">Bus Stops</p>
      <IconArrowDown class="text-slate-600 border border-slate-300 rounded-md p-0.5" />
    </div>

    <hr class="-mx-2 border-t-2 border-slate-200"/>

    <div class="rounded">
      <div
        v-for="stop in filteredStops"
        :key="stop.stop + stop.order"
        class="px-6 py-4 text-sm border-b border-slate-200 last:border-b-0"
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
import IconSearch from '@/components/icons/IconSearch.vue'
import IconArrowDown from '@/components/icons/IconArrowDown.vue'

const stops = ref<Stop[]>([])
const search = ref('')

onMounted(async () => {
  stops.value = await getStops()
})

const allStops = computed(() => getAllStopsWithOrder(stops.value))
const filteredStops = computed(() => filterStopsWithOrder(allStops.value, search.value))
</script>
