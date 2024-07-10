import { ThemedText, ThemedView } from "@/components/Utils/Themed"
import { theme } from "@/Theme"
import JsonViewer from "@/components/Utils/JsonView"

import { addHabit, getAllHabits, clearHabits } from "@/store/habitStoreService"
import { ScrollView } from "react-native-gesture-handler"
import Button from "@/components/Buttons/Buttons"

import { View } from "react-native"
import { useEffect, useState } from "react"
import { HabitsType, initialHabitData } from "@/components/HabitManager/habitManagerContext"

export default function Tests() {
  const [habits, setHabits] = useState<HabitsType[]>([])
  const [allKeys, setAllKeys] = useState<HabitsType[]>([])

  const handleSave = async () => {
    const newHabit: HabitsType = initialHabitData
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
    >
      <View style={{ width: "100%", height: "90%", marginTop: "10%" }}>
        <Button title="Add habit" onPress={handleSave} />
        <Button title="Clear habit" onPress={handleClearHabits} />
        <Button title="Load habits" onPress={handleLoadHabits} />
        <ScrollView style={{ height: "80%", width: "100%" }}>
          <ThemedText>Tests</ThemedText>
          <JsonViewer jsonString={habits} />
        </ScrollView>
      </View>
    </ThemedView>
  )
}
