import { getData, storeData, removeData } from "./storageService"

const HABITS_KEY = "HABITS"

// Interface para o hábito
export interface Habit {
  id: string
  title: string
  description?: string
  frequency: string
  startDate: string
  endDate?: string
  [key: string]: any // Permite adicionar propriedades dinâmicas
}

// Função para obter todos os hábitos
export const getAllHabits = async (): Promise<Habit[]> => {
  try {
    const habitsString = await getData(HABITS_KEY)
    return habitsString ? JSON.parse(habitsString) : []
  } catch (error) {
    console.error("Failed to get habits:", error)
    return []
  }
}

// Função para adicionar um novo hábito
export const addHabit = async (habit: Habit): Promise<void> => {
  try {
    console.log("Start Adding Habit")
    console.log(habit)

    const habits = await getAllHabits()
    habits.push(habit)
    await storeData(HABITS_KEY, JSON.stringify(habits))
  } catch (error) {
    console.error("Failed to add habit:", error)
  }
}

// Função para remover um hábito pelo ID
export const removeHabit = async (habitId: string): Promise<void> => {
  try {
    let habits = await getAllHabits()
    const habitToRemove = habits.find((habit) => habit.id === habitId)
    habits = habits.filter((habit) => habit.id !== habitId)
    await storeData(HABITS_KEY, JSON.stringify(habits))
    await deleteHabitFromAPI(habitToRemove) // Sincronizar com a API
  } catch (error) {
    console.error("Failed to remove habit:", error)
  }
}

// Função para editar um hábito
export const editHabit = async (habitId: string, updatedHabit: Partial<Habit>): Promise<void> => {
  try {
    let habits = await getAllHabits()
    habits = habits.map((habit) => (habit.id === habitId ? { ...habit, ...updatedHabit } : habit))
    await storeData(HABITS_KEY, JSON.stringify(habits))
    await syncHabitWithAPI({ ...habits.find((habit) => habit.id === habitId), ...updatedHabit }) // Sincronizar com a API
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
    await syncHabitWithAPI(habits.find((habit) => habit.id === habitId)) // Sincronizar com a API
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

// Função para sincronizar um hábito com a API
const syncHabitWithAPI = async (habit: Habit): Promise<void> => {
  try {
    await fetch("https://yourapi.com/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(habit),
    })
  } catch (error) {
    console.error("Failed to sync habit with API:", error)
  }
}

// Função para deletar um hábito da API
const deleteHabitFromAPI = async (habit: Habit): Promise<void> => {
  try {
    await fetch(`https://yourapi.com/habits/${habit.id}`, {
      method: "DELETE",
    })
  } catch (error) {
    console.error("Failed to delete habit from API:", error)
  }
}
