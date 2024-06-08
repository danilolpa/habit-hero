import { ThemedView } from "@/components/Utils/Themed"
import { Slot } from "expo-router"

import HeaderDefault from "@/components/HeaderDefault"
import images from "@/constants/Images"
import { theme } from "@/Theme"

export default function HabitsLayout() {
  return (
    <ThemedView
      className="flex-1 bg-transparent"
      darkColor={theme.colors.black.base}
      lightColor={theme.colors.primary.base}
    >
      <HeaderDefault image={images.headerDefault} />
      <Slot />
    </ThemedView>
  )
}
