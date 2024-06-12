import { getFormattedDate } from "@/utils/useCalendar"
import React, { createContext, useContext, useEffect, useState } from "react"

type habitManagerContextType = {
  loading: boolean
  error: string | null
  habitData: typeof initialHabitData
  updateHabitData: (name: string, value: any) => void
  submitForm: (form: any) => void
}

const HabitManagerContext = createContext<habitManagerContextType>({} as habitManagerContextType)

const initialHabitData = {
  name: "daw",
  description: " da",
  completed: false,
  date: "",
  icon: "",
  category: "",
  priority: 1,
  duration: "",
  durationMinutes: 0,
  frequency: "weekly",
  frequencySchedule: { daily: [], weekly: [1], monthly: [Number(getFormattedDate("dd"))] },
  goal: 0,
  progress: 0,
  createdBy: "",
  notes: "",
  reminder: true,
  color: "#BA68C8",
  difficulty: "",
}

const HabitManagerProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [habitData, setHabitData] = useState(initialHabitData)

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
      value={{ loading, error, habitData, updateHabitData, submitForm }}
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
