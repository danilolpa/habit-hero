import { Pressable, StyleSheet, View } from "react-native"
import { colord } from "colord"
import Animated, { LightSpeedInLeft, LightSpeedOutLeft } from "react-native-reanimated"
import * as Haptics from "expo-haptics"

import {
  ThemedIcon,
  ThemedText,
  ThemedView,
  IconsProps,
  useThemeColor,
  ViewProps,
} from "@/components/Utils/Themed"
import { getColorContrastColorByHex, theme } from "@/Theme"
import CloseButton from "./CloseButton"
import { BubblePressable } from "./BubblePressable"

type ChipProps = ViewProps & {
  fontSize?: number
  selected?: boolean
  style?: ViewProps["style"]
  onPress?: () => void
  onLongPress?: () => void
  onClose?: () => void
  type?: "flat" | "outline"
  ellipsizeMode?: "tail" | "middle" | "head" | "clip"
  icon?: IconsProps["name"]
  iconSize?: number
  iconColor?: string
  color?: string
  activeColor?: string
  textColor?: string
  confirmClose?: boolean
  exiting?: any
  animated?: boolean
  text: string
  haptics?: boolean
}
const Chip = (props: ChipProps) => {
  const {
    selected,
    style,
    onPress,
    onLongPress,
    onClose,
    fontSize = 20,
    icon,
    iconSize = 20,
    iconColor = "rgba(0,0,0,0.2)",
    color = "rgba(0,0,0,0.1)",
    activeColor = "rgba(0,0,0,0.8)",
    confirmClose = false,
    text,
    animated,
    haptics = true,
    ...otherProps
  } = props

  if (!text) {
    throw new Error("Chip must have a text property")
  }

  const selectedTextColor =
    getColorContrastColorByHex(String(activeColor)) ||
    useThemeColor({
      light: theme.colors.black.base,
      dark: theme.colors.white.base,
    })

  const handlePress = () => {
    onPress && onPress()
  }
  return (
    <BubblePressable onPress={handlePress} onLongPress={onLongPress} style={styles.pressable}>
      <ThemedView
        style={[styles.container, style, selected && { backgroundColor: activeColor }]}
        {...otherProps}
      >
        {icon && (
          <Animated.View
            entering={LightSpeedInLeft}
            exiting={LightSpeedOutLeft}
            style={[
              styles.icon,
              Boolean(iconColor) && {
                backgroundColor: colord(iconColor).toHex(),
              },
            ]}
          >
            <ThemedIcon
              name={icon}
              size={Number(iconSize)}
              darkColor={selectedTextColor}
              lightColor={selectedTextColor}
            />
          </Animated.View>
        )}
        <View style={styles.textContainer}>
          <ThemedText
            fontSize={fontSize}
            style={[styles.text, selected && { color: selectedTextColor }]}
          >
            {text}
          </ThemedText>
        </View>
        {onClose && <CloseButton onPress={onClose} style={[styles.closeButton]} confirmClose />}
      </ThemedView>
    </BubblePressable>
  )
}

export const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 40,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flexDirection: "row",
    minWidth: 80,
    backgroundColor: "rgba(0,0,0,0.1)",
    overflow: "hidden",
  },
  pressable: {
    flexGrow: 1,
    borderRadius: 40,
    minHeight: 50,
  },
  textContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  text: {},
  closeButton: {
    width: 60,
    height: 55,
    top: 6,
    right: 8,
    borderRadius: 0,
    borderBottomStartRadius: 100,
    borderTopStartRadius: 100,
  },
  icon: {
    width: 60,
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderBottomEndRadius: 100,
    borderTopEndRadius: 100,
  },
})

export default Chip
