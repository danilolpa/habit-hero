import { getData, storeData, removeData } from "./storageService"
import { HabitsType } from "@/types/habits"

const HABITS_KEY = "HABITS"

type HabitsTypeService = HabitsType & {}

// Função para obter todos os hábitos
export const getAllHabits = async (): Promise<HabitsTypeService[]> => {
  try {
    const habitsString = await getData(HABITS_KEY)
    return habitsString ? JSON.parse(habitsString) : []
  } catch (error) {
    console.error("Failed to get habits:", error)
    return []
  }
}

// Função para adicionar um novo hábito
export const addHabit = async (habit: HabitsTypeService): Promise<boolean> => {
  try {
    const habits = await getAllHabits()
    habits.push(habit)
    await storeData(HABITS_KEY, JSON.stringify(habits))
    return true
  } catch (error) {
    console.error("Failed to add habit:", error)
    return false
  }
}

// Função para remover um hábito pelo ID
export const removeHabit = async (habitId: string): Promise<void> => {
  try {
    let habits = await getAllHabits()
    const habitToRemove = habits.find((habit) => habit.id === habitId)
    habits = habits.filter((habit) => habit.id !== habitId)
    await storeData(HABITS_KEY, JSON.stringify(habits))
  } catch (error) {
    console.error("Failed to remove habit:", error)
  }
}

// Função para editar um hábito
export const editHabit = async (
  habitId: string,
  updatedHabit: Partial<HabitsTypeService>,
): Promise<void> => {
  try {
    let habits = await getAllHabits()
    habits = habits.map((habit) => (habit.id === habitId ? { ...habit, ...updatedHabit } : habit))
    await storeData(HABITS_KEY, JSON.stringify(habits))
  } catch (error) {
    console.error("Failed to edit habit:", error)
  }
}

// Função para incrementar uma chave específica em um hábito
export const incrementHabitKey = async (
  habitId: string,
  key: string,
  incrementValue: number,
): Promise<void> => {
  try {
    let habits = await getAllHabits()
    habits = habits.map((habit) => {
      if (habit.id === habitId) {
        const newValue = (habit[key] || 0) + incrementValue
        return { ...habit, [key]: newValue }
      }
      return habit
    })
    await storeData(HABITS_KEY, JSON.stringify(habits))
  } catch (error) {
    console.error("Failed to increment habit key:", error)
  }
}

// Função para limpar todos os hábitos
export const clearHabits = async (): Promise<void> => {
  try {
    await removeData(HABITS_KEY)
  } catch (error) {
    console.error("Failed to clear habits:", error)
  }
}
