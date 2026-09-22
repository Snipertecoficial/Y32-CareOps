import type { Appointment } from '../../domain/types'

export function filterAppointments(appointments: Appointment[], query: string, status: string, location: string) {
  const normalized = query.trim().toLowerCase()
  return appointments.filter((appointment) => {
    const matchesQuery = !normalized || [appointment.patientName, appointment.provider, appointment.status, appointment.visitType].some((value) => value.toLowerCase().includes(normalized))
    const matchesStatus = status === 'all' || appointment.status === status
    const matchesLocation = location === 'all' || appointment.location === location
    return matchesQuery && matchesStatus && matchesLocation
  })
}
