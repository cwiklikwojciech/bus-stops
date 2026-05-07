import type { Stop, StopEntry } from '@/types'

export function getUniqueLines(stops: Stop[]): number[] {
  return Array.from(new Set(stops.map(s => s.line))).sort((a, b) => a - b)
}

export function getUniqueStopsForLine(stops: Stop[], line: number): StopEntry[] {
  const stopMap = new Map<string, number>()

  for (const entry of stops) {
    if (entry.line !== line) continue
    const existing = stopMap.get(entry.stop)
    if (existing === undefined || entry.order < existing) {
      stopMap.set(entry.stop, entry.order)
    }
  }

  return Array.from(stopMap.entries())
    .map(([stop, order]) => ({ stop, order }))
    .sort((a, b) => a.order - b.order)
}

export function getTimesForLineAndStop(stops: Stop[], line: number, stopName: string): string[] {
  return stops
    .filter(entry => entry.line === line && entry.stop === stopName)
    .map(entry => entry.time)
    .sort()
}

export function getAllStopsWithOrder(stops: Stop[]): StopEntry[] {
  const seen = new Map<string, Set<number>>()

  for (const s of stops) {
    const orders = seen.get(s.stop) ?? new Set<number>()
    orders.add(s.order)
    seen.set(s.stop, orders)
  }

  const result: StopEntry[] = []
  for (const [stop, orders] of seen) {
    for (const order of orders) {
      result.push({ stop, order })
    }
  }

  return result.sort((a, b) => {
    const cmp = a.stop.localeCompare(b.stop)
    return cmp !== 0 ? cmp : a.order - b.order
  })
}

export function filterStopsWithOrder(stops: StopEntry[], searchTerm: string): StopEntry[] {
  const term = searchTerm.trim().toLowerCase()
  return term ? stops.filter(s => s.stop.toLowerCase().includes(term)) : stops
}
