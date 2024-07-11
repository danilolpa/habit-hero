import { StyleSheet, Platform, View } from "react-native"

import HabitsList from "@/components/Habits/HabitsList"
import { ThemedText, ThemedView } from "@/components/Utils/Themed"
import { theme } from "@/Theme"
import { useHabits } from "./habitsContext"

export default function HabitsHome() {
  const { selectedDate } = useHabits()
  return (
    <ThemedView
      darkColor={theme.colors.black.base}
      lightColor={theme.colors.white.base}
      style={styles.container}
    >
      <View style={styles.viewContent}>
        <ThemedText>{selectedDate}</ThemedText>
        <HabitsList />
      </View>
    </ThemedView>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -5 }, // Sombra apenas no topo
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 0, // No Android, a sombra é um pouco limitada
      },
    }),
  },
  viewContent: {
    overflow: "hidden",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
})
