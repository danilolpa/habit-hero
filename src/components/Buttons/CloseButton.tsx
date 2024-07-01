import { View, Text, StyleSheet, ViewProps, Pressable, TouchableOpacity } from "react-native"
import { ThemedFontAwesome, ThemedIcon, ThemedText, ThemedView } from "@/components/Utils/Themed"
import { theme } from "@/Theme"
import Animated, { LightSpeedInRight, LightSpeedOutRight } from "react-native-reanimated"
import { useState } from "react"
import * as Haptics from "expo-haptics"

interface closeButtonProps {
  onPress: () => void
  color?: string
  size?: "small" | "medium" | "large"
  style?: ViewProps["style"]
  styleContainer?: ViewProps["style"]
  transparent?: boolean
  confirmClose?: boolean
}

export default function CloseButton(props: closeButtonProps) {
  const {
    onPress,
    color = theme.colors.primary.base,
    size = "medium",
    style,
    styleContainer,
    transparent = false,
    confirmClose = false,
  } = props
  const [askConfirm, setAskConfirm] = useState(false)

  const iconSize = size === "small" ? 15 : size === "large" ? 30 : 24
  const handleConfirmed = () => {
    return () => {
      onPress()
    }
  }
  const HandleAskConfirm = (status: boolean = true) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setAskConfirm(status)
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => (confirmClose ? HandleAskConfirm() : onPress())}
        style={[styles.container, size === "small" && styles.small, styleContainer]}
      >
        {!askConfirm && (
          <Animated.View
            entering={LightSpeedInRight}
            exiting={LightSpeedOutRight}
            style={[styles.closeButton, transparent && { backgroundColor: "transparent" }, style]}
          >
            <ThemedFontAwesome
              name="xmark"
              size={iconSize}
              darkColor={theme.colors.white.base}
              lightColor={theme.colors.black.base}
            />
          </Animated.View>
        )}
        {askConfirm && (
          <Animated.View
            entering={LightSpeedInRight}
            exiting={LightSpeedOutRight}
            style={styles.ActionButtonsContainer}
          >
            <Pressable onPress={handleConfirmed()} style={styles.ActionButton}>
              <ThemedIcon name="check" size={23} color={theme.colors.white.base} />
              <ThemedText fontSize={20}>Confirmar</ThemedText>
            </Pressable>
            <Pressable
              onPress={() => HandleAskConfirm(false)}
              style={[styles.ActionButton, styles.ActionButtonCancel]}
            >
              <ThemedIcon
                name="arrow-forward-ios"
                size={23}
                color={theme.colors.white.base}
                style={{ left: -3 }}
              />
            </Pressable>
          </Animated.View>
        )}
      </TouchableOpacity>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  small: {
    width: 25,
    height: 25,
  },
  closeButton: {
    borderRadius: 100,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  ActionButtonsContainer: {
    position: "absolute",
    width: 210,
    height: 55,
    right: 0,
    top: 0,
    color: theme.colors.white.base,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  ActionButton: {
    borderTopLeftRadius: 100,
    borderBottomStartRadius: 100,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    backgroundColor: theme.colors.green.base,
    paddingHorizontal: 20,
    width: 150,
  },
  ActionButtonCancel: {
    backgroundColor: theme.colors.red.base,
    borderTopLeftRadius: 0,
    borderBottomStartRadius: 0,
    width: 60,
  },
})
