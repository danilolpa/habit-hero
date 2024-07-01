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

function getNextHour(additionalHours: number = 1, format: string = "HH:mm") {
  const nextHour = addHours(startOfHour(new Date()), additionalHours)
  return getFormattedDate(format, nextHour)
}

const generateTimeRange = (reference: "hours" | "minutes" | "seconds") => {
  let range = []
  switch (reference) {
    case "hours":
      range = [0o0, 23]
      break
    case "minutes":
      range = [0o0, 59]
      break
    case "seconds":
      range = [0o0, 59]
      break
    default:
      range = [0o0, 23]
  }

  const result = []
  for (let i = range[0]; i <= range[1]; i++) {
    result.push(Number(i).toString(10).padStart(2, "0"))
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
