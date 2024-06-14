import { format, getTime, isToday } from "date-fns"
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

export { getFormattedDate, getDaysOfWeek, getTimestamp, isTodayDate }
