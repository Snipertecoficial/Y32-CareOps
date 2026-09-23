export interface CampaignDraft {
  name: string
  audience: string
  startDate: string
  callTime: string
  script: string
}

export const formatCampaignSchedule = (startDate: string, callTime: string) => {
  if (!startDate || !callTime) return 'Choose a date and time'
  const [year, month, day] = startDate.split('-').map(Number)
  const [hour, minute] = callTime.split(':').map(Number)
  const date = new Date(year, month - 1, day, hour, minute)
  if (Number.isNaN(date.getTime())) return 'Choose a date and time'
  const dateLabel = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date)
  const timeLabel = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' }).format(date)
  return `${dateLabel} at ${timeLabel}`
}
