import { getAllHabits } from "@/store/habitStoreService"
import { HabitsType } from "@/types/habits"
import { getFormattedDate } from "@/utils/dateHelpers"
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react"

interface HabitsContextType {
  selectedDate: string
  setSelectedDate: (date: string) => void
  habitsList: HabitsType[]
  setHabitsList: (habits: HabitsType[]) => void
  updateHabitsList: () => void
  habitsLoading: boolean
  setHabitsLoading: (loading: boolean) => void
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined)

interface HabitsProviderProps {
  children: ReactNode
}

export const HabitsProvider: React.FC<HabitsProviderProps> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<string>(getFormattedDate("yyyy-MM-dd"))
  const [habitsList, setHabitsList] = useState<HabitsType[]>([])
  const [habitsLoading, setHabitsLoading] = useState(false)

  const updateHabitsList = async () => {
    setHabitsLoading(true)
    const fetchHabits = async () => {
      const storedHabits = await getAllHabits()

      setHabitsLoading(false)
      setHabitsList(storedHabits)
    }
    await fetchHabits()
  }

  useEffect(() => {
    updateHabitsList()
  }, [])

  return (
    <HabitsContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        habitsList,
        setHabitsList,
        updateHabitsList,
        habitsLoading,
        setHabitsLoading,
      }}
    >
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
