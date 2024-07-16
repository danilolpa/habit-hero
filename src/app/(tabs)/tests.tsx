import { ThemedText, ThemedView } from "@/components/Utils/Themed"
import { theme } from "@/Theme"
import JsonViewer from "@/components/Utils/JsonView"

import { addHabit, getAllHabits, clearHabits, loadHabitTests } from "@/store/habitStoreService"
import Button from "@/components/Buttons/Buttons"
import { v4 as uuidv4 } from "uuid"

import { View, Clipboard } from "react-native"
import { useEffect, useState } from "react"
import { initialHabitData } from "@/contexts/habitManagerContext"
import { HabitsType } from "@/types/habits"
import {
  generateHabitTitle,
  generateRandomColor,
  generateRandomIcons,
} from "@/utils/habitManagerHelpers"

export default function Tests() {
  const [habits, setHabits] = useState<HabitsType[]>([])

  const handleSave = async () => {
    const newHabit: HabitsType = {
      ...initialHabitData,
      id: uuidv4(),
      name: generateHabitTitle(),
      color: generateRandomColor(),
      icon: generateRandomIcons(),
    }
    await addHabit(newHabit)
    setHabits(await getAllHabits())
  }

  const handleClearHabits = async () => {
    await clearHabits()
    setHabits([])
  }

  const handleLoadHabits = async () => {
    const storedHabits = await getAllHabits()
    setHabits(storedHabits)
  }

  const handleCopy = async () => {
    Clipboard.setString(JSON.stringify(habits))
    console.log("Habits copied to clipboard! 1 habit copied.")
  }

  const loadTestHabits = async () => {
    await loadHabitTests()
    handleLoadHabits()
  }
  useEffect(() => {
    const fetchHabits = async () => {
      const storedHabits = await getAllHabits()
      setHabits(storedHabits)
    }
    fetchHabits()
  }, [])

  return (
    <ThemedView
      className="items-center justify-center"
      darkColor={theme.colors.black.base}
      lightColor={theme.colors.white.base}
      style={{ paddingHorizontal: 20 }}
    >
      <View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Button title="Add habit" onPress={handleSave} />
          <Button title="Clear habit" onPress={handleClearHabits} />
          <Button title="Load habits" onPress={handleLoadHabits} />
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <Button title="Load tests habits" onPress={loadTestHabits} />
          <Button title="Copy" onPress={handleCopy} />
        </View>
        <JsonViewer jsonString={habits} />
      </View>
    </ThemedView>
  )
}
