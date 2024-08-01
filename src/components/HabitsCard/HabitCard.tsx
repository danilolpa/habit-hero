import { FontAwesome6, MaterialIcons } from "@expo/vector-icons"
import { Text, View, Alert, Pressable, ViewToken, StyleSheet } from "react-native"
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  SharedValue,
} from "react-native-reanimated"
import { Swipeable } from "react-native-gesture-handler"

import { ThemedIcon, ThemedText, ThemedView } from "@/components/Utils/Themed"
import { getColorHexByName, theme } from "@/Theme"
import { HabitsType } from "@/types/habits"
import { removeHabit } from "@/store/habitStoreService"
import { useHabits } from "@//contexts/habitsContext"
import HabitCardGoal from "./HabitCardGoal"
import HabitCardStrike from "./HabitCardStrike"

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
            <HabitCardStrike color={colorHex} strike={index} />
          </View>
          <HabitCardGoal color={colorHex} goal={goal} />
        </ThemedView>
      </Pressable>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  card: {
    marginVertical: 5,
    borderRadius: 20,
    borderCurve: "circular",
    display: "flex",
    flexDirection: "row",
    gap: 4,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: theme.spaces.defaultSpace,
    paddingLeft: theme.spaces.defaultSpace,
    borderBottomWidth: 3,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: theme.colors.black.darkest,
    minHeight: 70,
  },
  cardContentIcon: {
    display: "flex",
    fontSize: 30,
  },

  cardContentCenter: {
    display: "flex",
    flexGrow: 1,
    marginLeft: 8,
    paddingVertical: 5,
    flexShrink: 1,
  },
  cardContentHabit: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    fontSize: 18,
    lineHeight: 18,
    paddingTop: 8,
    top: 5,
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
  concluded: {
    backgroundColor: theme.colors.green.base,
    fontSize: 12,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    color: theme.colors.white.base,
    width: 100,
    marginRight: theme.spaces.defaultSpace,
    // top: 12,
    marginTop: 10,
    borderRadius: 10,
  },
})
