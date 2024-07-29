import { FontAwesome6, MaterialIcons } from "@expo/vector-icons"
import { Text, View, Alert, Pressable, ViewToken } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  SharedValue,
} from "react-native-reanimated"
import { Swipeable } from "react-native-gesture-handler"
import { ThemedIcon, ThemedText, ThemedView } from "../Utils/Themed"
import { getColorHexByName, theme } from "@/Theme"
import styles from "./habitsStyle"
import { HabitsType } from "@/types/habits"
import { removeHabit } from "@/store/habitStoreService"
import { useHabits } from "@//contexts/habitsContext"
import APP_CONSTANTS from "@/constants/AppConstants"

type HabitCardProps = HabitsType & {
  index: number
  habitData: HabitsType
  viewableItems?: SharedValue<ViewToken[]>
}

export default function HabitCard({ index, habitData, viewableItems }: HabitCardProps) {
  const { icon, name, color, id, period, goal } = habitData

  const translateX = useSharedValue(0)
  const colorHex = getColorHexByName(color)
  const { updateHabitsList } = useHabits()

  const editButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(translateX.value * 2) }],
    }
  })

  const renderRightActions = () => {
    return (
      <Animated.View style={[styles.concluded, editButtonStyle]}>
        <Pressable>
          <ThemedText>Concluido!</ThemedText>
        </Pressable>
      </Animated.View>
    )
  }

  const renderLeftActions = () => {
    return (
      <View style={styles.actionsContainer}>
        <Animated.View style={[styles.actionButton, editButtonStyle]}>
          <Text>Edit</Text>
        </Animated.View>
      </View>
    )
  }

  const onSwipeableOpen = (direction: any) => {
    if (direction === "right") {
      console.log("right")
    }
  }

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirmação",
      "Você tem certeza que deseja continuar?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await removeHabit(id)
            updateHabitsList()
          },
        },
      ],
      { cancelable: false },
    )
  }

  const renderGoalView = () => {
    const goalType = goal?.goalType || "BY_UNITS"
    const goalDetailsType = goal?.goalDetails?.type || "TIME"
    console.log(goalType, goalDetailsType)

    return (
      <View style={styles.cardContentExp}>
        {goalType === "BY_TIME" && (
          <View>
            <ThemedIcon name="timer" size={30} style={{ color: colorHex }} />
          </View>
        )}
        {goalType === "BY_UNITS" && (
          <ThemedText darkColor={theme.colors.white.light} lightColor={theme.colors.black.dark}>
            0/{goal?.goalDetails?.count}
          </ThemedText>
        )}
        <ThemedText darkColor={theme.colors.white.light} lightColor={theme.colors.black.dark}>
          {goalDetailsType}
        </ThemedText>
      </View>
    )
  }

  return (
    <Swipeable renderRightActions={renderRightActions} onSwipeableOpen={onSwipeableOpen}>
      <Pressable onLongPress={() => handleDelete(id)}>
        <ThemedView
          style={[styles.card, { borderColor: colorHex }]}
          darkColor={theme.colors.black.lighter}
          lightColor={theme.colors.white.dark}
          animated
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
              Novo - sequencia de x dias
            </ThemedText>
          </View>
          {renderGoalView()}
        </ThemedView>
      </Pressable>
    </Swipeable>
  )
}
