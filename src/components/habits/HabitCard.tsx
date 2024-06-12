import { FontAwesome6, MaterialIcons } from "@expo/vector-icons"
import { Text, View, TouchableOpacity, Alert, Pressable } from "react-native"
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated"
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler"
import { ThemedText, ThemedView } from "../Utils/Themed"
import { getColorHexByName, theme } from "@/Theme"
import styles from "./habitsStyle"
import { useEffect } from "react"

type HabitCardProps = {
  id: number
  name: string
  description?: string
  completed?: boolean
  date?: string
  icon: keyof typeof MaterialIcons.glyphMap
  category: string
  priority?: number
  duration?: string
  frequency?: string
  goal: number
  progress?: number
  createdBy?: string
  notes?: string
  tags?: string[]
  reminder?: boolean
  color: string
  difficulty?: string
  otherValues?: object
  index: number
}

export default function HabitCard({
  icon,
  name,
  category,
  duration,
  goal,
  color,
  index,
}: HabitCardProps) {
  const translateX = useSharedValue(0)
  const colorHex = getColorHexByName(color)
  const editButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(translateX.value * 2) }],
    }
  })

  const renderRightActions = (progress, dragX) => {
    return (
      <Animated.View style={[styles.concluded, editButtonStyle]}>
        <Pressable>
          <ThemedText>Concluido!</ThemedText>
        </Pressable>
      </Animated.View>
    )
  }

  const renderLeftActions = (progress, dragX) => {
    return (
      <View style={styles.actionsContainer}>
        <Animated.View style={[styles.actionButton, editButtonStyle]}>
          <Text>Edit</Text>
        </Animated.View>
      </View>
    )
  }

  const opacity = useSharedValue(0)
  const translateY = useSharedValue(60)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      opacity.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.exp),
      })

      translateY.value = withTiming(0, {
        duration: 600,
        easing: Easing.out(Easing.exp),
      })
    }, index * 100)

    return () => clearTimeout(timeoutId)
  }, [index, opacity, translateY])

  const animatedCardEnter = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    }
  })

  const onSwipeableOpen = (direction: any) => {
    if (direction === "right") {
      console.log("right")
    }
  }

  return (
    <Animated.View style={animatedCardEnter}>
      <Swipeable renderRightActions={renderRightActions} onSwipeableOpen={onSwipeableOpen}>
        <ThemedView
          style={[styles.card, { borderColor: colorHex }]}
          darkColor={theme.colors.black.lighter}
          lightColor={theme.colors.white.dark}
        >
          <MaterialIcons name={icon} style={[styles.cardContentIcon, { color: colorHex }]} />
          <View style={styles.cardContentCenter}>
            <ThemedText
              darkColor={theme.colors.white.dark}
              lightColor={theme.colors.black.dark}
              fontWeight="bold"
              style={styles.cardContentHabit}
            >
              {name}
            </ThemedText>
            <ThemedText
              darkColor={theme.colors.white.light}
              lightColor={theme.colors.black.dark}
              fontSize={14}
              style={[styles.cardContentMisc, { color: colorHex }]}
            >
              {category} - {duration}
            </ThemedText>
          </View>
          <View style={styles.cardContentExp}>
            <FontAwesome6 name="bolt-lightning" size={18} style={{ color: colorHex }} />
            <ThemedText darkColor={theme.colors.white.light} lightColor={theme.colors.black.dark}>
              {goal}xp
            </ThemedText>
          </View>
        </ThemedView>
      </Swipeable>
    </Animated.View>
  )
}
