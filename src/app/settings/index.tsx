import { View, Text } from "react-native"
import { ThemedView } from "@/components/utils/Themed"
import { theme } from "@/Theme"

export default function Settings() {
  return (
    <View className="flex-1 items-center justify-center text-white">
      <Text className="text-3xl text-white">Settings</Text>

      <ThemedView darkColor={theme.colors.black.base} lightColor={theme.colors.white.base}>
        <Text className="text-gray">Teste View</Text>
      </ThemedView>
    </View>
  )
}
