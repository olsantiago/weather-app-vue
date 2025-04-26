export const rounded = (value) => Math.round(value)

export const getWeekDay = (day) => {
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  return weekday[new Date(day).getDay()]
}

const formatTime = (hour) => {
  const period = hour >= 12 ? 'PM' : 'AM'
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12
  return `${formattedHour} ${period}`
}

export const getHour = (timestamp) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  return formatTime(hour)
}
