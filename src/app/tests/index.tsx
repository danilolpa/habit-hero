import { ThemedText, ThemedView } from "@/components/Utils/Themed"
import { theme } from "@/Theme"
import JsonViewer from "@/components/Utils/JsonView"

import { addHabit, getAllHabits, clearHabits } from "@/store/habitStoreService"
import { ScrollView } from "react-native-gesture-handler"
import Button from "@/components/Buttons/Buttons"
import { v4 as uuidv4 } from "uuid"

import { View } from "react-native"
import { useEffect, useState } from "react"
import { initialHabitData } from "@/app/habitsManager/habitManagerContext"
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

  useEffect(() => {
    const fetchHabits = async () => {
      const storedHabits = await getAllHabits()
      setHabits(storedHabits)
    }
    fetchHabits()
  }, [])

  return (
    <ThemedView
      className="flex-1 items-center justify-center text-white"
      darkColor={theme.colors.black.base}
      lightColor={theme.colors.white.base}
      style={{ paddingHorizontal: 20 }}
    >
      <View style={{ width: "100%", height: "90%", marginTop: "10%" }}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Button title="Add habit" onPress={handleSave} />
          <Button title="Clear habit" onPress={handleClearHabits} />
          <Button title="Load habits" onPress={handleLoadHabits} />
        </View>
        <ScrollView style={{ height: "80%", width: "100%" }}>
          <JsonViewer jsonString={habits} />
        </ScrollView>
      </View>
    </ThemedView>
  )
}
