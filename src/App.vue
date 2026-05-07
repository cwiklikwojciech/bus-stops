<template>
  <main class="mx-auto max-w-full px-4 py-8 flex flex-col md:h-screen">
    <NavigationBar v-model="linesOrStops" />

    <KeepAlive>
      <component :is="tabs[linesOrStops]" />
    </KeepAlive>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NavigationBar from './components/NavigationBar.vue'
import BusLineSelector from './components/BusLineSelector.vue'
import StepsSearch from './components/StepsSearch.vue'
import type { Tab } from '@/types'

const linesOrStops = ref<Tab>('lines')

const tabs = {
  lines: BusLineSelector,
  stops: StepsSearch,
}
</script>
