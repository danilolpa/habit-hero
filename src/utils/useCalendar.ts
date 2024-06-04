import { format } from "date-fns"
import { toZonedTime } from "date-fns-tz"
import { ptBR } from "date-fns/locale"
import { getCalendars } from "expo-localization"

const timeZone = getCalendars()[0].timeZone || "America/Sao_Paulo"

const getFormattedDate = (dateFormat: string, date: Date = new Date()) => {
  return format(toZonedTime(date, timeZone), dateFormat, { locale: ptBR })
}

export { getFormattedDate }
