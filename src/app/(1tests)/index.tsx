import { ThemedText, ThemedView } from "@/components/Utils/Themed"
import { theme } from "@/Theme"
import JsonViewer from "@/components/Utils/JsonView"

import { getData, storeData, removeData, getAllKeys } from "@/store/storageService"
import { addHabit, getAllHabits, Habit, clearHabits } from "@/store/habitStoreService"
import { ScrollView } from "react-native-gesture-handler"
import Button from "@/components/Buttons/Buttons"

import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import { View } from "react-native"
import { useEffect, useState } from "react"

export default function Tests() {
  const [habits, setHabits] = useState<Habit[]>([])

  const handleSave = async () => {
    const newHabit: Habit = {
      id: uuidv4(),
      title: "New Habit",
      description: "Description of the new habit",
      frequency: "daily",
      startDate: new Date().toISOString(),
    }
    await addHabit(newHabit)
    setHabits(await getAllHabits())
  }

  const handleClearHabits = async () => {
    await clearHabits()
    setHabits([])
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
    >
      <View style={{ width: "100%" }}>
        <Button title="Add habit" onPress={handleSave} />
        <Button title="Clear habit" onPress={handleClearHabits} />
        <ScrollView style={{ height: "80%", width: "100%" }}>
          <ThemedText>Tests</ThemedText>
          <JsonViewer jsonString={habits} />
        </ScrollView>
      </View>
    </ThemedView>
  )
}
