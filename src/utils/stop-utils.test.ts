import { describe, it, expect } from 'vitest'
import {
  getUniqueLines,
  getUniqueStopsForLine,
  getTimesForLineAndStop,
  getAllStopsWithOrder,
  filterStopsWithOrder,
} from './stop-utils'
import type { Stop } from '@/types'

const stops: Stop[] = [
  { line: 1, stop: 'A', order: 1, time: '08:00' },
  { line: 1, stop: 'B', order: 2, time: '08:10' },
  { line: 1, stop: 'A', order: 1, time: '09:00' },
  { line: 2, stop: 'C', order: 1, time: '10:00' },
  { line: 2, stop: 'A', order: 3, time: '10:30' },
  { line: 3, stop: 'B', order: 2, time: '11:00' },
]

describe('getUniqueLines', () => {
  it('returns sorted unique line numbers', () => {
    expect(getUniqueLines(stops)).toEqual([1, 2, 3])
  })

  it('returns empty array for empty input', () => {
    expect(getUniqueLines([])).toEqual([])
  })
})

describe('getUniqueStopsForLine', () => {
  it('returns stops for given line sorted by order', () => {
    expect(getUniqueStopsForLine(stops, 1)).toEqual([
      { stop: 'A', order: 1 },
      { stop: 'B', order: 2 },
    ])
  })

  it('deduplicates stops keeping lowest order', () => {
    const data: Stop[] = [
      { line: 1, stop: 'X', order: 3, time: '08:00' },
      { line: 1, stop: 'X', order: 1, time: '09:00' },
    ]
    expect(getUniqueStopsForLine(data, 1)).toEqual([{ stop: 'X', order: 1 }])
  })

  it('returns empty array when line has no stops', () => {
    expect(getUniqueStopsForLine(stops, 99)).toEqual([])
  })
})

describe('getTimesForLineAndStop', () => {
  it('returns sorted times for given line and stop', () => {
    expect(getTimesForLineAndStop(stops, 1, 'A')).toEqual(['08:00', '09:00'])
  })

  it('returns empty array when no match', () => {
    expect(getTimesForLineAndStop(stops, 1, 'Z')).toEqual([])
  })
})

describe('getAllStopsWithOrder', () => {
  it('returns all stop+order combos sorted by stop name then order', () => {
    const result = getAllStopsWithOrder(stops)
    expect(result).toEqual([
      { stop: 'A', order: 1 },
      { stop: 'A', order: 3 },
      { stop: 'B', order: 2 },
      { stop: 'C', order: 1 },
    ])
  })

  it('deduplicates identical stop+order pairs', () => {
    const data: Stop[] = [
      { line: 1, stop: 'A', order: 1, time: '08:00' },
      { line: 2, stop: 'A', order: 1, time: '09:00' },
    ]
    expect(getAllStopsWithOrder(data)).toEqual([{ stop: 'A', order: 1 }])
  })

  it('returns empty array for empty input', () => {
    expect(getAllStopsWithOrder([])).toEqual([])
  })
})

describe('filterStopsWithOrder', () => {
  const entries = [
    { stop: 'Central Station', order: 1 },
    { stop: 'Airport', order: 2 },
    { stop: 'central Park', order: 3 },
  ]

  it('filters case-insensitively', () => {
    expect(filterStopsWithOrder(entries, 'central')).toEqual([
      { stop: 'Central Station', order: 1 },
      { stop: 'central Park', order: 3 },
    ])
  })

  it('returns all entries for empty search', () => {
    expect(filterStopsWithOrder(entries, '')).toEqual(entries)
  })

  it('returns all entries for whitespace-only search', () => {
    expect(filterStopsWithOrder(entries, '   ')).toEqual(entries)
  })

  it('returns empty array when no match', () => {
    expect(filterStopsWithOrder(entries, 'xyz')).toEqual([])
  })
})
