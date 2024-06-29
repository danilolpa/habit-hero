import { StyleSheet, Pressable, View } from "react-native"
import { colord } from "colord"

import {
  ThemedIcons,
  ThemedText,
  ThemedView,
  IconsProps,
  useThemeColor,
  ViewProps,
} from "@/components/Utils/Themed"
import { getColorContrastColorByHex, theme } from "@/Theme"
import CloseButton from "./CloseButton"
import { useEffect } from "react"
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"

type ChipProps = ViewProps & {
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
  iconSize?: number
  iconColor?: string
  color?: string
  activeColor?: string
  textColor?: string
  confirmClose?: boolean
}
const Chip = (props: ChipProps) => {
  const {
    selected,
    children,
    style,
    onPress,
    onLongPress,
    onClose,
    ellipsizeMode = "tail",
    fontSize = 20,
    icon,
    iconSize = 20,
    iconColor = "rgba(0,0,0,0.2)",
    color = "rgba(0,0,0,0.1)",
    activeColor = "rgba(0,0,0,0.8)",
    confirmClose = false,
    ...otherProps
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

  const selectedTextColor =
    getColorContrastColorByHex(String(activeColor)) ||
    useThemeColor({
      light: theme.colors.black.base,
      dark: theme.colors.white.base,
    })
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
      {...otherProps}
    >
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={styles.pressable}
      >
        {icon && (
          <View
            style={[
              styles.icon,
              Boolean(iconColor) && {
                backgroundColor: colord(iconColor).alpha(0.1).toHex(),
              },
            ]}
          >
            <ThemedIcons
              name={icon}
              size={Number(iconSize)}
              darkColor={selectedTextColor}
              lightColor={selectedTextColor}
            />
          </View>
        )}
        <ThemedText
          fontSize={fontSize}
          style={[styles.textContainer, selected && { color: selectedTextColor }]}
          ellipsizeMode={ellipsizeMode}
          numberOfLines={1}
        >
          {children}
        </ThemedText>
        {onClose && <CloseButton onPress={onClose} style={styles.closeButton} confirmClose />}
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
    overflow: "hidden",
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
  closeButton: {
    height: 60,
    width: 60,
    marginRight: -15,
    bottom: 0,
  },
  icon: {
    width: 60,
    height: 60,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -15,
    borderRadius: 100,
  },
})

export default Chip
