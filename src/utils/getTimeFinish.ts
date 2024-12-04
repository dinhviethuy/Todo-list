import moment from 'moment'

export function getTimeFinish(startTime: string, endTime: string): string {
  // Parse thời gian từ chuỗi định dạng dd/MM/yyyy HH:mm:ss
  const startDate = moment(startTime, 'DD/MM/YYYY HH:mm:ss')
  const endDate = moment(endTime, 'DD/MM/YYYY HH:mm:ss')

  // Tính khoảng thời gian
  const duration = moment.duration(endDate.diff(startDate))

  // Lọc các đơn vị lớn hơn 0
  const components = []
  if (duration.years() > 0) components.push(`${duration.years()} năm`)
  if (duration.months() > 0) components.push(`${duration.months()} tháng`)
  if (duration.days() > 0) components.push(`${duration.days()} ngày`)
  if (duration.hours() > 0) components.push(`${duration.hours()} giờ`)
  if (duration.minutes() > 0) components.push(`${duration.minutes()} phút`)
  if (duration.seconds() > 0) components.push(`${duration.seconds()} giây`)

  const result = components.join(', ')
  return result
}
