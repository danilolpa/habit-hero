import { View, Text, StyleSheet, ViewProps, Pressable } from "react-native"
import { ThemedFontAwesome, ThemedText, ThemedView } from "@/components/Utils/Themed"
import { theme } from "@/Theme"

interface closeButtonProps {
  onPress: () => void
  color?: string
  size?: number
  style?: ViewProps["style"]
}

export default function CloseButton(props: closeButtonProps) {
  const { onPress, color = theme.colors.primary.base, size = 24, style } = props
  return (
    <ThemedView>
      <Pressable onPress={onPress} style={[style, styles.container]}>
        <ThemedFontAwesome
          name="xmark"
          size={size}
          darkColor={theme.colors.white.base}
          lightColor={theme.colors.black.base}
        />
      </Pressable>
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
