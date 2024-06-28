import { StyleSheet, ViewProps, Pressable } from "react-native"
import { ThemedIcons, ThemedText, ThemedView, IconsProps } from "@/components/Utils/Themed"
import { getColorContrastColorByHex, theme } from "@/Theme"
import CloseButton from "./CloseButton"
import { useEffect } from "react"
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

interface ChipProps {
  children: React.ReactNode
  fontSize?: number
  selected?: boolean
  style?: ViewProps["style"]
  onPress?: () => void
  onLongPress?: () => void
  onClose?: () => void
  type?: "flat" | "outline"
  selectedColor?: string
  ellipsizeMode?: "tail" | "middle" | "head" | "clip"
  icon?: IconsProps["name"]
  color?: string
  activeColor?: string
}
const Chip = (props: ChipProps) => {
  const {
    selected,
    children,
    style,
    onPress,
    onLongPress,
    ellipsizeMode = "tail",
    fontSize = 20,
    icon,
    onClose,
    color = "rgba(0,0,0,0.1)",
    activeColor = "rgba(0,0,0,0.1)",
  } = props

  const scale = useSharedValue(1)
  const animatedValue = useSharedValue(0)
  const animationDuration = 200

  useEffect(() => {
    animatedValue.value = withTiming(selected ? 1 : 0, { duration: animationDuration })
  }, [selected])

  const animatedBackground = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(animatedValue.value, [0, 1], [color, activeColor])
    return {
      backgroundColor,
    }
  })

  const scaleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    }
  })

  const onPressIn = () => {
    scale.value = withTiming(1.05, { duration: animationDuration / 2 })
  }

  const onPressOut = () => {
    scale.value = withTiming(1, { duration: animationDuration / 2 })
  }

  const selectedTextColor = {
    color: getColorContrastColorByHex(String(activeColor)) || theme.colors.white.base,
  }

  return (
    <ThemedView
      style={[
        styles.container,
        style,
        onPress && scaleStyle,
        selected && { backgroundColor: activeColor },
        animatedBackground,
      ]}
      animated
    >
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={styles.pressable}
      >
        {icon && <ThemedIcons name={icon} size={18} darkColor="red" />}
        <ThemedText
          fontSize={fontSize}
          style={[styles.textContainer, selected && selectedTextColor]}
          ellipsizeMode={ellipsizeMode}
          numberOfLines={1}
        >
          {children}
        </ThemedText>
        {onClose && <CloseButton onPress={onClose} size="small" />}
      </Pressable>
    </ThemedView>
  )
}

export const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 40,
    display: "flex",
    minWidth: 80,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  pressable: {
    height: "100%",
    flexGrow: 1,
    display: "flex",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 40,
  },
  textContainer: {
    display: "flex",
    textAlign: "center",
    flexGrow: 1,
    marginHorizontal: 10,
  },
})

export default Chip
