import APP_CONSTANTS from "@/constants/AppConstants"
import { addHours, format, getTime, isToday, isTomorrow, isYesterday, startOfHour } from "date-fns"
import { toZonedTime } from "date-fns-tz"
import { ptBR } from "date-fns/locale"
import { getCalendars } from "expo-localization"

const timeZone = getCalendars()[0].timeZone || "America/Sao_Paulo"

const getFormattedDate = (dateFormat: string, date: Date = new Date()) => {
  return format(toZonedTime(date, timeZone), dateFormat, { locale: ptBR })
}

function getDaysOfWeek(array: any) {
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"]
  const dayNames = array.map((num: number) => days[num - 1])

  if (dayNames.length === 0) {
    return ""
  }

  return dayNames.length === 1
    ? dayNames[0]
    : `${dayNames.slice(0, -1).join(", ")} e ${dayNames[dayNames.length - 1]}`
}

function getTimestamp(date: Date = new Date()) {
  return getTime(
    format(toZonedTime(date, timeZone), "yyyy-MM-dd HH:mm", {
      locale: ptBR,
    }),
  )
}

function isTodayDate(date: Date = new Date()) {
  return isToday(toZonedTime(date, timeZone))
}

function dateTextFormatter(date: string | Date = new Date()) {
  const dateFormatted = getFormattedDate(String(date))

  if (isToday(toZonedTime(dateFormatted, timeZone))) {
    return "Hoje"
  } else if (isTomorrow(toZonedTime(dateFormatted, timeZone))) {
    return "Amanhã"
  } else if (isYesterday(toZonedTime(dateFormatted, timeZone))) {
    return "Ontem"
  } else {
    return format(toZonedTime(date, timeZone), "dd 'de' MMM", { locale: ptBR })
  }
}

function getNextHour(additionalHours: number = 1) {
  const nextHour = addHours(startOfHour(new Date()), additionalHours)
  return getFormattedDate("HH:mm", nextHour)
}

const generateTimeRange = (start: number, end: number) => {
  const result = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

export {
  getFormattedDate,
  getDaysOfWeek,
  getTimestamp,
  isTodayDate,
  dateTextFormatter,
  getNextHour,
  generateTimeRange,
}
