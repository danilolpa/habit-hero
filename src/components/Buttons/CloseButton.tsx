import { View, Text, StyleSheet, ViewProps, Pressable, TouchableOpacity } from "react-native"
import { ThemedFontAwesome, ThemedText, ThemedView } from "@/components/Utils/Themed"
import { theme } from "@/Theme"

interface closeButtonProps {
  onPress: () => void
  color?: string
  size?: number
  style?: ViewProps["style"]
  transparent?: boolean
}

export default function CloseButton(props: closeButtonProps) {
  const {
    onPress,
    color = theme.colors.primary.base,
    size = 24,
    style,
    transparent = false,
  } = props
  return (
    <ThemedView>
      <TouchableOpacity
        onPress={onPress}
        style={[style, styles.container, transparent && { backgroundColor: "transparent" }]}
      >
        <ThemedFontAwesome
          name="xmark"
          size={size}
          darkColor={theme.colors.white.base}
          lightColor={theme.colors.black.base}
        />
      </TouchableOpacity>
    </ThemedView>
  )
}

export const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
})
