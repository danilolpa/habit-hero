import APP_CONSTANTS from "@/constants/AppConstants"
import { getFormattedDate, getTimestamp } from "@/utils/dateHelpers"
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons"
import React, { createContext, useContext, useEffect, useState } from "react"

type habitManagerContextType = {
  loading: boolean
  error: string | null
  habitData: HabitsType
  colorHabit: string
  updateHabitData: (name: string, value: any) => void
  submitForm: (form: any) => void
  setColorHabit: (color: colorsType) => void
}

const HabitManagerContext = createContext<habitManagerContextType>({} as habitManagerContextType)

type colorsType =
  | "primary"
  | "red"
  | "pink"
  | "lightPurple"
  | "purple"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "blue"

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
  time?: {
    hours: number
    minutes: number
  }
  units?: {
    count: number
    type: "time" | "cup" | "page" | "kilometers"
  }
}

export interface HabitsType {
  name: string
  description: string
  completed: boolean
  icon: keyof typeof MaterialIcons.glyphMap
  category: string
  priority: number
  duration: boolean
  durationMinutes: number
  repeat: boolean
  frequency: "daily" | "weekly" | "monthly" | "single"
  frequencySchedule: frequencyScheduleType
  singleDate?: singleDateProps
  goal: {
    hasGoal: boolean
    goalType?: "time" | "units"
    goalDetails?: GoalDetails
  }
  color: colorsType
  status: "TO_DO" | "IGNORED" | "COMPLETED"
  createdBy: string
  createdDate: string
  concludedDate?: string
  endDate?: string | boolean
  notes?: string
  tags: string[]
  reminder?: boolean
  difficulty: string
}

const initialHabitData: HabitsType = {
  name: "",
  description: "",
  completed: false,
  icon: "water-drop",
  category: "",
  priority: 1,
  duration: false,
  durationMinutes: 0,
  repeat: true,
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
    goalType: "units", // Can be "time" or "units"
    goalDetails: {
      time: {
        hours: 1,
        minutes: 30,
      },
      units: {
        count: 5,
        type: "time", // Can be "time", "cup", "page" or "kilometers"
      },
    },
  },
  createdDate: "",
  status: "TO_DO",
  createdBy: "",
  endDate: false,
  notes: "",
  reminder: true,
  color: "purple",
  tags: ["health", "fitness", "workout", "study", "school", "family", "friends"],
  difficulty: "",
}

const HabitManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [habitData, setHabitData] = useState(initialHabitData)
  const [colorHabit, setColorHabit] = useState<colorsType>(initialHabitData.color)

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
