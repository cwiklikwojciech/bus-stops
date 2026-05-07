import { Stop } from '@/types'
import data from '../../data.json'

export function getStops(): Promise<Stop[]> {
  return Promise.resolve(data.stops as Stop[])
}
