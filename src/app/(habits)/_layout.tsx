import { ThemedView } from "@/components/Utils/Themed"
import { Slot } from "expo-router"

import HeaderDefault from "@/components/HeaderDefault"
import images from "@/constants/Images"
import { theme } from "@/Theme"
import { HabitsProvider } from "./habitsContext"

export default function HabitsLayout() {
  return (
    <HabitsProvider>
      <ThemedView
        className="flex-1 bg-transparent"
        darkColor={theme.colors.black.base}
        lightColor={theme.colors.primary.base}
      >
        <HeaderDefault image={images.headerDefault} />
        <Slot />
      </ThemedView>
    </HabitsProvider>
  )
}
