import { theme } from "@/Theme"
import { ThemedText, ThemedView } from "@/components/utils/Themed"
import { Slot } from "expo-router"

export default function HabitManagerLayout() {
  return (
    <ThemedView
      className="flex-1"
      darkColor={theme.colors.black.dark}
      lightColor={theme.colors.white.base}
    >
      <Slot />
    </ThemedView>
  )
}
