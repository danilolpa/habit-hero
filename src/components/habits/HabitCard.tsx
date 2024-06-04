import { MaterialIcons } from "@expo/vector-icons"
import { Text, StyleSheet, View, TouchableOpacity, Alert } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from "react-native-reanimated"
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler"
import { ThemedView } from "../utils/Themed"
import { theme } from "@/Theme"

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
  color?: string
  difficulty?: string
  otherValues?: object
}

export default function HabitCard({ icon, name, category, duration, goal }: HabitCardProps) {
  const translateX = useSharedValue(0)

  const editButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(translateX.value * 2) }],
    }
  })

  const renderRightActions = (progress, dragX) => {
    return (
      <View style={styles.actionsContainer}>
        <Animated.View style={[styles.actionButton, styles.editButton, editButtonStyle]}>
          <TouchableOpacity onPress={() => Alert.alert("Edit")}>
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    )
  }

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <ThemedView
          style={styles.card}
          darkColor={theme.colors.black.light}
          lightColor={theme.colors.white.dark}
        >
          <MaterialIcons name={icon} size={12} />
          <Text>{name}</Text>
          <Text>{category}</Text>
          <Text>{duration}</Text>
          <Text>{goal}xp</Text>
        </ThemedView>
      </Swipeable>
    </GestureHandlerRootView>
  )
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  card: {
    marginTop: 10,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    display: "flex",
    flexDirection: "row",
    gap: 4,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: theme.spaces.defaultSpace,
  },
  itemContainer: {
    marginHorizontal: theme.spaces.defaultSpace,
    backgroundColor: "#fff", // Necessário para o Swipeable funcionar corretamente
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  editButton: {
    backgroundColor: "blue",
    height: 100,
  },
  deleteButton: {
    backgroundColor: "red",
  },
  shareButton: {
    backgroundColor: "green",
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
  },
})
