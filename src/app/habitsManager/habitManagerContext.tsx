import { getFormattedDate } from "@/utils/useCalendar"
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons"
import React, { createContext, useContext, useEffect, useState } from "react"

type habitManagerContextType = {
  loading: boolean
  error: string | null
  habitData: HabitsType
  colorHabit: string
  updateHabitData: (name: string, value: any) => void
  submitForm: (form: any) => void
  setColorHabit: (color: string) => void
}

const HabitManagerContext = createContext<habitManagerContextType>({} as habitManagerContextType)

interface frequencyScheduleType {
  daily: number[]
  weekly: number[]
  monthly: number[]
  unique: boolean
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
  frequency: "weekly" | "monthly" | "daily" | "single"
  frequencySchedule: frequencyScheduleType
  specificDate?: string
  goal: number
  progress: number
  createdBy: string
  createdDate: string
  notes?: string
  tags: string[]
  reminder?: boolean
  color: string
  difficulty: string
}

const initialHabitData: HabitsType = {
  name: "",
  description: "",
  completed: false,
  icon: "email",
  category: "",
  priority: 1,
  duration: false,
  durationMinutes: 0,
  repeat: false,
  frequency: "daily",
  frequencySchedule: {
    daily: [],
    weekly: [1],
    monthly: [Number(getFormattedDate("dd"))],
    unique: false,
  },
  specificDate: "",
  createdDate: "",
  goal: 0,
  progress: 0,
  createdBy: "",
  notes: "",
  reminder: true,
  color: "primary",
  tags: ["health", "fitness", "workout", "study", "school", "family", "friends"],
  difficulty: "",
}

const HabitManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [habitData, setHabitData] = useState(initialHabitData)
  const [colorHabit, setColorHabit] = useState(initialHabitData.color)

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
