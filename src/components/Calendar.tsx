import { Calendar as CalendarLib, LocaleConfig, CalendarProps } from "react-native-calendars"

import { View, Text, StyleSheet } from "react-native"
import { theme } from "@/Theme"
import { useThemeColor } from "./Utils/Themed"
import { useEffect, useState } from "react"
import { useColorScheme } from "react-native"

export type ComponentCalendarProps = CalendarProps & {
  lightColor?: string
  darkColor?: string
  currentColor?: string
}
LocaleConfig.locales["pt_BR"] = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ],
  dayNames: [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
  today: "Hoje",
}

LocaleConfig.defaultLocale = "pt_BR"

function Calendar(props: ComponentCalendarProps) {
  const colorScheme = useColorScheme()
  const {
    lightColor = theme.colors.white.dark,
    darkColor = theme.colors.black.lightest,
    onDayPress,
    currentColor,
    ...otherProps
  } = props

  const otherColors = {
    textSectionTitleColor: currentColor,
    selectedDayBackgroundColor: "#f55",
    selectedDayTextColor: "#9f5",
    todayBackgroundColor: "rgba(0,0,0,0.3)",
    arrowColor: currentColor,
  }

  const themeColors = useThemeColor({
    light: {
      calendarBackground: lightColor,
      monthTextColor: theme.colors.black.base,
      dayTextColor: theme.colors.black.base,
      todayTextColor: theme.colors.black.base,
      textDisabledColor: "rgba(0,0,0,0.4)",
      ...otherColors,
    },
    dark: {
      calendarBackground: darkColor,
      monthTextColor: theme.colors.white.base,
      dayTextColor: theme.colors.white.base,
      todayTextColor: theme.colors.white.base,
      textDisabledColor: "rgba(255,255,255,0.4)",
      ...otherColors,
    },
  })

  const [{ key, currentTheme }, setTheme] = useState({
    key: currentColor,
    currentTheme: themeColors,
  })

  useEffect(() => {
    setTheme({ key: currentColor, currentTheme: themeColors })
  }, [currentColor])

  useEffect(() => {
    setTheme({ key: String(colorScheme), currentTheme: themeColors })
  }, [colorScheme])

  return <CalendarLib onDayPress={onDayPress} otherProps key={key} theme={currentTheme} />
}

export const styles = StyleSheet.create({
  container: {},
})

export default Calendar
export { Calendar }
