import { View } from "@/components/utils/Themed"
import { Slot } from "expo-router"

import HeaderDefault from "@/components/HeaderDefault"
import images from "@/constants/Images"

export default function HabitsLayout() {
  return (
    <View className="flex-1">
      <HeaderDefault image={images.headerDefault} />
      <Slot />
    </View>
  )
}
