import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Stop } from '@/types'
import { getStops } from '@/services/api'
import {
  getUniqueLines,
  getUniqueStopsForLine,
  getTimesForLineAndStop,
  getAllStopsWithOrder,
} from '@/utils/stop-utils'

export const useStopsStore = defineStore('stops', () => {
  const stops = ref<Stop[]>([])
  const selectedLine = ref<number | null>(null)
  const selectedStop = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const lines = computed(() => getUniqueLines(stops.value))
  const stopsForLine = computed(() =>
    selectedLine.value !== null
      ? getUniqueStopsForLine(stops.value, selectedLine.value)
      : [],
  )
  const times = computed(() =>
    selectedLine.value !== null && selectedStop.value !== null
      ? getTimesForLineAndStop(stops.value, selectedLine.value, selectedStop.value)
      : [],
  )
  const allStops = computed(() => getAllStopsWithOrder(stops.value))

  async function fetchStops() {
    if (stops.value.length > 0) return
    isLoading.value = true
    error.value = null
    try {
      stops.value = await getStops()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load stops'
    } finally {
      isLoading.value = false
    }
  }

  function selectLine(line: number | null) {
    selectedLine.value = line
    selectedStop.value = null
  }

  function selectStop(stop: string | null) {
    selectedStop.value = stop
  }

  return {
    stops,
    selectedLine,
    selectedStop,
    isLoading,
    error,
    lines,
    stopsForLine,
    times,
    allStops,
    fetchStops,
    selectLine,
    selectStop,
  }
})
