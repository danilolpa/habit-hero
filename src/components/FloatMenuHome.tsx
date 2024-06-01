import { Link } from "expo-router"
import { View, Text, StyleSheet, Pressable } from "react-native"

export default function FloatMenuHome() {
  return (
    <View className="flex-row w-full justify-center align-center border border-red bottom-10 gap-4 h-20 absolute bg-gray-800">
      <Link href="/modal" asChild className="text-gray-400 border align-center flex-1">
        <Pressable>
          {({ pressed }) => <Text className="text-gray-400">+ Novo Hábito</Text>}
        </Pressable>
      </Link>
      <Link push href="/" className="text-gray-400 border align-center flex-1">
        Hoje
      </Link>
      <Link push href="/settings" className="text-gray-400 border align-center flex-1">
        Perfil
      </Link>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {},
})
