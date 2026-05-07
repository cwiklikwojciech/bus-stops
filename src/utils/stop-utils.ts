import type { Stop, StopEntry } from '@/types'

export function getUniqueLines(stops: Stop[]): number[] {
  return Array.from(new Set(stops.map(s => s.line))).sort((a, b) => a - b)
}

export function getUniqueStopsForLine(stops: Stop[], line: number): StopEntry[] {
  const stopMap = stops
    .filter(e => e.line === line)
    .reduce((map, e) => {
      const existing = map.get(e.stop)
      if (existing === undefined || e.order < existing) map.set(e.stop, e.order)
      return map
    }, new Map<string, number>())

  return Array.from(stopMap, ([stop, order]) => ({ stop, order }))
    .sort((a, b) => a.order - b.order)
}

export function getTimesForLineAndStop(stops: Stop[], line: number, stopName: string): string[] {
  return stops
    .filter(entry => entry.line === line && entry.stop === stopName)
    .map(entry => entry.time)
    .sort()
}

export function getAllStopsWithOrder(stops: Stop[]): StopEntry[] {
  const seen = stops.reduce((map, s) => {
    map.set(s.stop, (map.get(s.stop) ?? new Set<number>()).add(s.order))
    return map
  }, new Map<string, Set<number>>())

  return Array.from(seen, ([stop, orders]) =>
    Array.from(orders, order => ({ stop, order })),
  ).flat().sort((a, b) => {
    const cmp = a.stop.localeCompare(b.stop)
    return cmp !== 0 ? cmp : a.order - b.order
  })
}

export function formatStopEntry(entry: StopEntry): string {
  return `${entry.stop} ${String(entry.order).padStart(2, '0')}`
}

export function filterStopsWithOrder(stops: StopEntry[], searchTerm: string): StopEntry[] {
  const term = searchTerm.trim().toLowerCase()
  return term ? stops.filter(s => s.stop.toLowerCase().includes(term)) : stops
}
