import { FontAwesome6, MaterialIcons } from "@expo/vector-icons"
import { Text, View, TouchableOpacity, Alert } from "react-native"
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated"
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler"
import { ThemedText, ThemedView } from "../utils/Themed"
import { theme } from "@/Theme"
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

  const editButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(translateX.value * 2) }],
    }
  })

  const renderRightActions = (progress, dragX) => {
    return (
      <View style={styles.actionsContainer}>
        <Animated.View style={[styles.actionButton, editButtonStyle]}>
          <TouchableOpacity onPress={() => Alert.alert("Edit")}>
            <Text>Edit</Text>
          </TouchableOpacity>
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
    }, index * 100) // Delay incremental baseado no índice do item

    return () => clearTimeout(timeoutId)
  }, [index, opacity, translateY])

  const animatedCardEnter = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    }
  })

  return (
    <Animated.View style={animatedCardEnter}>
      <Swipeable renderRightActions={renderRightActions}>
        <ThemedView
          style={[styles.card, { borderColor: color }]}
          darkColor={theme.colors.black.lighter}
          lightColor={theme.colors.white.dark}
        >
          <MaterialIcons name={icon} style={[styles.cardContentIcon, { color: color }]} />
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
              style={[styles.cardContentMisc, { color: color }]}
            >
              {category} - {duration}
            </ThemedText>
          </View>
          <View style={styles.cardContentExp}>
            <FontAwesome6 name="bolt-lightning" size={18} style={{ color: color }} />
            <ThemedText darkColor={theme.colors.white.light} lightColor={theme.colors.black.dark}>
              {goal}xp
            </ThemedText>
          </View>
        </ThemedView>
      </Swipeable>
    </Animated.View>
  )
}
