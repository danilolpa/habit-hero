import APP_CONSTANTS from "@/constants/AppConstants"
import { getFormattedDate, getTimestamp } from "@/utils/dateHelpers"
import React, { createContext, useContext, useState } from "react"
import { HabitColorNameType } from "@/Theme"
import { IconsProps } from "../Utils/Themed"

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
  icon: IconsProps["name"]
  repeat: boolean
  frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "SINGLE"
  frequencySchedule: frequencyScheduleType
  singleDate: singleDateProps
  goal: goalProps
  color: HabitColorNameType
  status: "TO_DO" | "IGNORED" | "COMPLETED"
  reminderTimes: string[]
  reminder: boolean
  period: TimePeriodType[]
  createdBy: string
  createdDate: string
  concludedDate?: string
  endDate?: string

  priority?: number
  difficulty?: string
  notes?: string
}

const initialHabitData: HabitsType = {
  name: "teste",
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
  status: "TO_DO",
  createdBy: "",
  endDate: "",
  period: ["ANYTIME"],
  reminder: false,
  reminderTimes: [],
  color: "primary",

  priority: 1,
  difficulty: "",
  notes: "",
}

const HabitManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [habitData, setHabitData] = useState(initialHabitData)
  const [colorHabit, setColorHabit] = useState<HabitColorNameType>(initialHabitData.color)

  const updateHabitData = (name: string, value: any) => {
    setHabitData((prevState) => ({ ...prevState, [name]: value }))
  }

  const saveHabitService = async (formData: Object) => {
    setLoading(true)

    try {
      console.log("submitted", formData)
      // Substitute with the actual API call
      // await api.post('/endpoint', formData);
      // console.log("Form:", formData)
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
        setLoading,
        error,
        habitData,
        updateHabitData,
        saveHabitService,
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
