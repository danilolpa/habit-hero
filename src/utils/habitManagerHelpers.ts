import APP_CONSTANTS from "@/constants/AppConstants"
import { getDaysOfWeek } from "./dateHelpers"
import { goalProps } from "@/app/habitsManager/habitManagerContext"
import { pluralizeIfNeeded } from "./textHelpers"

const getGoalTypeByIndex = (index: number) => {
  try {
    if (index < 0 || index >= APP_CONSTANTS.HABIT.GOAL.GOAL_LABELS.length) {
      throw new Error("Index out of range")
    }
    return APP_CONSTANTS.HABIT.GOAL.GOAL_LABELS[index]
  } catch (error) {
    console.error(error)
    return APP_CONSTANTS.HABIT.GOAL.GOAL_LABELS[0].VALUE // or any appropriate default value
  }
}

const getGoalIndexByValue = (value: string) => {
  try {
    const index = APP_CONSTANTS.HABIT.GOAL.GOAL_LABELS.findIndex((item) => item.VALUE === value)

    if (index >= 0) {
      return index
    } else {
      throw new Error("Value not found")
    }
  } catch (error) {
    console.error(error)
    return 0 // or any appropriate default value
  }
}

const formatFrequencyText = (props: any) => {
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
      return "Todo dia: " + monthly[0]
    } else if (monthly.length === 2) {
      return "Todos os dias: " + monthly.join(" e ")
    } else {
      return (
        "Todos os dias: " + monthly.slice(0, -1).join(", ") + " e " + monthly[monthly.length - 1]
      )
    }
  }
}

const translateGoalText = (string: string) => {
  const text = string.toUpperCase()

  switch (text) {
    case "TIME":
      return "vez"
    case "TIMES":
      return "vezes"
    case "CUP":
      return "copo"
    case "CUPS":
      return "copos"
    case "PAGE":
      return "página"
    case "PAGES":
      return "páginas"
    case "KILOMETER":
      return "quilômetro"
    case "KILOMETERS":
      return "quilômetros"
    default:
      return text
  }
}

const formatGoalText = (props: goalProps, suffix = "por dia") => {
  const { goalType, goalDetails } = props

  if (goalDetails) {
    const { count, hours, minutes, seconds, type } = goalDetails

    if (goalType === "BY_UNITS") {
      return `${count} ${translateGoalText(
        pluralizeIfNeeded(String(type), Number(count)),
      ).toLowerCase()} ${suffix}`
    }
    if (goalType === "BY_TIME") {
      let timeString = ""

      if (Number(hours) > 0) {
        timeString += `${hours}h `
      }
      if (Number(minutes) > 0) {
        timeString += `${minutes}m `
      }
      if (Number(seconds) > 0) {
        timeString += `${seconds}s `
      }
      return timeString.trim() + ` ${suffix}`
    }
  }
}

export { getGoalTypeByIndex, getGoalIndexByValue, formatFrequencyText, formatGoalText }
