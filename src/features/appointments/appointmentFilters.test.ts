import { describe, expect, it } from 'vitest'
import { appointments } from '../../data/mockData'
import { filterAppointments } from './appointmentFilters'

describe('filterAppointments', () => {
  it('matches patient names case-insensitively', () => {
    expect(filterAppointments(appointments, 'MAYA', 'all', 'all').map((row) => row.id)).toEqual(['appt-h-01'])
  })
})
