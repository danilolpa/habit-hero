import APP_CONSTANTS from "@/constants/AppConstants"
import { format, getTime, isToday, isTomorrow, isYesterday } from "date-fns"
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

const constructFrequencyText = (props: any) => {
  const {
    frequency,
    frequencySchedule: { daily, weekly, monthly },
  } = props

  if (frequency === APP_CONSTANTS.HABIT.FREQUENCY.DAILY) {
    return daily.length === 7 ? "Todos os dias" : getDaysOfWeek(daily)
  } else if (frequency === APP_CONSTANTS.HABIT.FREQUENCY.WEEKLY) {
    return weekly + (weekly > 1 ? " vezes por semana" : " vez por semana")
  } else if (frequency === APP_CONSTANTS.HABIT.FREQUENCY.MONTHLY) {
    if (monthly.length === 0) {
      return "Escolha um ou vários dias no mes"
    } else if (monthly.length === 1) {
      return "No mês todo dia: " + monthly[0]
    } else if (monthly.length === 2) {
      return "No mês todos os dias: " + monthly.join(" e ")
    } else {
      return (
        "No mês todos os dias: " +
        monthly.slice(0, -1).join(", ") +
        " e " +
        monthly[monthly.length - 1]
      )
    }
  }
}

export {
  getFormattedDate,
  getDaysOfWeek,
  getTimestamp,
  isTodayDate,
  dateTextFormatter,
  constructFrequencyText,
}
