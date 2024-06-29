import APP_CONSTANTS from "@/constants/AppConstants"
import { getFormattedDate, getTimestamp } from "@/utils/dateHelpers"
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons"
import React, { createContext, useContext, useState } from "react"
import { HabitColorNameType } from "@/Theme"

type habitManagerContextType = {
  loading: boolean
  error: string | null
  habitData: HabitsType
  colorHabit: string
  updateHabitData: (name: string, value: any) => void
  submitForm: (form: any) => void
  setColorHabit: (color: HabitColorNameType) => void
}

const HabitManagerContext = createContext<habitManagerContextType>({} as habitManagerContextType)

interface frequencyScheduleType {
  daily: number[]
  weekly: number
  monthly: number[]
}

export interface singleDateProps {
  year: number
  month: number
  day: number
  timestamp: number
  dateString: string
}

type GoalDetails = {
  hours?: number
  minutes?: number
  count?: number
  seconds?: number
  type?: "TIME" | "CUP" | "PAGE" | "KILOMETER" | string
}
export interface goalProps {
  hasGoal: boolean
  goalType?: "BY_TIME" | "BY_UNITS"
  goalDetails?: GoalDetails
}
export type TimePeriodType = "MORNING" | "AFTERNOON" | "NIGHT" | "ANYTIME"

export interface HabitsType {
  name: string
  description: string
  completed: boolean
  icon: keyof typeof MaterialIcons.glyphMap
  priority: number
  repeat: boolean
  frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "SINGLE"
  frequencySchedule: frequencyScheduleType
  singleDate?: singleDateProps
  goal: goalProps
  color: HabitColorNameType
  status: "TO_DO" | "IGNORED" | "COMPLETED"
  reminderTimes?: string[]
  reminder?: boolean
  period?: TimePeriodType[]
  createdBy: string
  createdDate: string
  concludedDate?: string
  endDate?: string
  notes?: string
  tags: string[]
  difficulty: string
}

const initialHabitData: HabitsType = {
  name: "",
  description: "",
  icon: "fastfood",
  priority: 1,
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
  status: "TO_DO",
  createdBy: "",
  endDate: "",
  completed: false,
  notes: "",
  period: ["ANYTIME"],
  reminder: false,
  reminderTimes: ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"],
  color: "red",
  tags: ["health", "fitness", "workout", "study", "school", "family", "friends"],
  difficulty: "",
}

const HabitManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [habitData, setHabitData] = useState(initialHabitData)
  const [colorHabit, setColorHabit] = useState<HabitColorNameType>(initialHabitData.color)

  const updateHabitData = (name: string, value: any) => {
    // const { name, value } = e.target
    setHabitData((prevState) => ({ ...prevState, [name]: value }))
  }

  const submitForm = async (formData: Object) => {
    setLoading(true)
    setError(null)
    try {
      // Substitute with the actual API call
      // await api.post('/endpoint', formData);
      console.log("Form:", formData)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 5000)
    }
  }

  return (
    <HabitManagerContext.Provider
      value={{
        loading,
        error,
        habitData,
        updateHabitData,
        submitForm,
        colorHabit,
        setColorHabit,
      }}
    >
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
