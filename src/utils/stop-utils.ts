import { Stop } from '@/types'

export function getUniqueLines(stops: Stop[]): number[] {
  return Array.from(new Set(stops.map(stop => stop.line))).sort((a, b) => a - b)
}

export function getUniqueStopsForLine(
  stops: Stop[],
  line: number,
  ascending = true,
): Array<{ stop: string, order: number }> {
  const stopMap = new Map<string, number>()

  stops
    .filter(entry => entry.line === line)
    .forEach((entry) => {
      const existingOrder = stopMap.get(entry.stop)
      if (existingOrder === undefined || entry.order < existingOrder) {
        stopMap.set(entry.stop, entry.order)
      }
    })

  return Array.from(stopMap.entries())
    .map(([stop, order]) => ({ stop, order }))
    .sort((a, b) => (ascending ? a.order - b.order : b.order - a.order))
}

export function getTimesForLineAndStop(stops: Stop[], line: number, stopName: string): string[] {
  return stops
    .filter(entry => entry.line === line && entry.stop === stopName)
    .map(entry => entry.time)
    .sort((a, b) => a.localeCompare(b))
}

export function getAllStopsWithOrder(
  stops: Stop[],
  ascending = true,
): Array<{ stop: string, order: number }> {
  const seen = new Set<string>()
  const result: Array<{ stop: string, order: number }> = []
  for (const s of stops) {
    const key = `${s.stop}\x00${s.order}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push({ stop: s.stop, order: s.order })
    }
  }
  return result.sort((a, b) => {
    const cmp = ascending ? a.stop.localeCompare(b.stop) : b.stop.localeCompare(a.stop)
    return cmp !== 0 ? cmp : ascending ? a.order - b.order : b.order - a.order
  })
}

export function filterStopsWithOrder(
  stops: Array<{ stop: string, order: number }>,
  searchTerm: string,
): Array<{ stop: string, order: number }> {
  const term = searchTerm.trim().toLowerCase()
  return term ? stops.filter(s => s.stop.toLowerCase().includes(term)) : stops
}
