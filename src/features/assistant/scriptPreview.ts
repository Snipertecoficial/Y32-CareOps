type PatientPreview = { firstName: string }
type AppointmentPreview = { date: string; time: string }

export function renderScriptPreview(
  template: string,
  patient: PatientPreview,
  appointment: AppointmentPreview,
) {
  return template
    .replaceAll('{{firstName}}', patient.firstName)
    .replaceAll('{{date}}', appointment.date)
    .replaceAll('{{time}}', appointment.time)
}
