import APP_CONSTANTS from "@/constants/AppConstants"
import { getFormattedDate, getTimestamp } from "@/utils/dateHelpers"
import React, { createContext, useContext, useState } from "react"

import "react-native-get-random-values"
import { addHabit } from "@/store/habitStoreService"
import { useRouter } from "expo-router"
import { AlertComponent, useAlert } from "@/hooks/useAlert"
import { HabitsType } from "@/types/habits"
import { HabitColorNameType } from "@/Theme"

type habitManagerContextType = {
  loading: boolean
  setLoading: (loading: boolean) => void
  error: string | null
  habitData: HabitsType
  colorHabit: string
  updateHabitData: (name: string, value: any) => void
  saveHabitService: (form: any) => void
  setColorHabit: (color: HabitColorNameType) => void
}

const HabitManagerContext = createContext<habitManagerContextType>({} as habitManagerContextType)

export const initialHabitData: HabitsType = {
  id: "",
  name: "", // Habits Names
  description: "",
  icon: "fastfood",
  repeat: false,
  frequency: APP_CONSTANTS.HABIT.FREQUENCY.DAILY,
  frequencySchedule: {
    daily: [1, 2, 3, 4, 5, 6, 7],
    weekly: 1,
    monthly: [Number(getFormattedDate("dd"))],
  },
  singleDate: {
    year: Number(getFormattedDate("yyyy")),
    month: Number(getFormattedDate("MM")),
    day: Number(getFormattedDate("dd")),
    timestamp: getTimestamp(),
    dateString: getFormattedDate("yyyy-MM-dd"),
  },
  goal: {
    hasGoal: false,
    goalType: "BY_UNITS", // Can be "BY_TIME" or "BY_UNITS"
    goalDetails: APP_CONSTANTS.HABIT.GOAL.GOAL_DETAILS_INITIAL_VALUES,
  },
  createdDate: new Date().toISOString(),
  endDate: "",
  period: ["ANYTIME"],
  reminder: false,
  reminderTimes: [],
  color: "primary",
}

const HabitManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [habitData, setHabitData] = useState(initialHabitData)
  const [colorHabit, setColorHabit] = useState<HabitColorNameType>(initialHabitData.color)
  const router = useRouter()
  const { Alert } = useAlert()

  const updateHabitData = (name: string, value: any) => {
    setHabitData((prevState) => ({ ...prevState, [name]: value }))
  }

  const saveHabitService = async (habitData: HabitsType) => {
    try {
      setLoading(true)
      const hasAdded = await addHabit(habitData)
      if (hasAdded) {
        router.dismiss(1)
      } else {
        throw new Error("Hábito não foi salvo.")
      }
    } catch (e: any) {
      setError(e.message)
      setLoading(false)
      setTimeout(() => {
        Alert.Show({
          text: e.message,
          title: "Erro ao salvar o hábito!",
        })
      }, 100)
    } finally {
      setLoading(false)
    }
  }

  return (
    <HabitManagerContext.Provider
      value={{
        loading,
        setLoading,
        error,
        habitData,
        updateHabitData,
        saveHabitService,
        colorHabit,
        setColorHabit,
      }}
    >
      <AlertComponent />
      {children}
    </HabitManagerContext.Provider>
  )
}

export const useHabitManagerContext = (): habitManagerContextType => {
  const context = useContext(HabitManagerContext)

  if (!context) {
    throw new Error("useRouteContext must be used within a RouteProvider")
  }

  return context
}

export { HabitManagerContext, HabitManagerProvider }
