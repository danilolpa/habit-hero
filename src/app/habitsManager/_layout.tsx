import { theme } from "@/Theme"
import { ThemedText, ThemedView } from "@/components/Utils/Themed"
import { HabitManagerProvider } from "./habitManagerContext"
import { Slot } from "expo-router"

export default function HabitManagerLayout() {
  return (
    <HabitManagerProvider>
      <ThemedView
        className="flex-1"
        darkColor={theme.colors.black.dark}
        lightColor={theme.colors.white.base}
      >
        <Slot />
      </ThemedView>
    </HabitManagerProvider>
  )
}
