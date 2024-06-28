import { useColorScheme as reactNativeColorScheme } from "react-native"

function useColorScheme() {
  const colorScheme = reactNativeColorScheme()
  return colorScheme
}

export { useColorScheme }
