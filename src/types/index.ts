export type Tab = 'lines' | 'stops'

export interface Stop {
  line: number
  stop: string
  order: number
  time: string
}

export interface StopEntry {
  stop: string
  order: number
}
