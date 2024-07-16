import { useColorScheme as reactNativeColorScheme } from "react-native"

function useColorScheme() {
  const colorScheme = reactNativeColorScheme()
  return "dark" || colorScheme
}

export { useColorScheme }
