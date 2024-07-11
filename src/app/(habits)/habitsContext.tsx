import { getFormattedDate } from "@/utils/dateHelpers"
import React, { createContext, useState, useContext, ReactNode } from "react"

interface HabitsContextType {
  selectedDate: string
  setSelectedDate: (date: string) => void
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined)

interface HabitsProviderProps {
  children: ReactNode
}

export const HabitsProvider: React.FC<HabitsProviderProps> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<string>(getFormattedDate("yyyy-MM-dd"))

  return (
    <HabitsContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </HabitsContext.Provider>
  )
}

export const useHabits = (): HabitsContextType => {
  const context = useContext(HabitsContext)
  if (!context) {
    throw new Error("useHabit deve ser usado dentro de um HabitProvider")
  }
  return context
}
