import { FontAwesome6, MaterialIcons } from "@expo/vector-icons"
import { Text, View, Alert, Pressable, ViewToken, StyleSheet } from "react-native"
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated"
import { Swipeable } from "react-native-gesture-handler"

import { ThemedText, ThemedView } from "@/components/Utils/Themed"
import { getColorHexByName, theme } from "@/Theme"
import { HabitStatusProps, HabitsType } from "@/types/habits"
import { removeHabit } from "@/store/habitStoreService"
import { useHabits } from "@//contexts/habitsContext"
import HabitCardGoal from "./HabitCardGoal"
import HabitCardStrike from "./HabitCardStrike"

type HabitCardProps = HabitsType & {
  index: number
  habitData: HabitsType
}

export default function HabitCard({ index, habitData }: HabitCardProps) {
  const { icon, name, color, id, goal } = habitData
  const { updateHabitsList } = useHabits()

  const isConcluded = index === 1
  const isIgnored = index > 1

  const habitStatus: HabitStatusProps["status"] = "IGNORED"
  console.log(habitStatus)

  const colorHex = isConcluded
    ? theme.colors.green.base
    : isIgnored
    ? theme.colors.blue.base
    : getColorHexByName(color)

  const translateX = useSharedValue(0)
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
          style={[
            styles.card,
            { borderColor: colorHex },
            isConcluded && styles.cardConcluded,
            isIgnored && styles.cardIgnored,
          ]}
          darkColor={theme.colors.black.lighter}
          lightColor={theme.colors.white.dark}
          animated
        >
          <MaterialIcons
            name={icon}
            style={[
              styles.cardContentIcon,
              { color: colorHex },
              isConcluded && styles.cardContentIconConcluded,
              isIgnored && styles.cardContentIconIgnored,
            ]}
          />
          <View style={styles.cardContentCenter}>
            <ThemedText
              darkColor={theme.colors.white.dark}
              lightColor={theme.colors.black.dark}
              fontWeight="medium"
              fontSize={19}
              style={[
                styles.cardHabitNameText,
                isConcluded && styles.cardHabitNameTextConcluded,
                isIgnored && styles.cardHabitNameTextIgnored,
              ]}
            >
              {name}
            </ThemedText>
            <HabitCardStrike color={colorHex} strike={index} ignored={isIgnored} />
          </View>
          <HabitCardGoal
            color={colorHex}
            goal={goal}
            style={isConcluded || isIgnored ? { opacity: 0.6 } : undefined}
          />
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
    minHeight: 75,
  },
  cardConcluded: {
    borderColor: theme.colors.green.base,
  },
  cardIgnored: {
    borderColor: theme.colors.black.lightest,
  },
  cardContentIcon: {
    display: "flex",
    fontSize: 30,
  },
  cardContentIconConcluded: {
    color: theme.colors.white.dark,
    opacity: 0.5,
  },
  cardContentIconIgnored: {
    color: theme.colors.white.dark,
    opacity: 0.5,
  },

  cardContentCenter: {
    display: "flex",
    flexGrow: 1,
    marginLeft: 8,
    paddingVertical: 5,
    flexShrink: 1,
  },
  cardHabitNameText: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    lineHeight: 18,
    paddingTop: 8,
    top: 5,
  },
  cardHabitNameTextConcluded: {
    textDecorationLine: "line-through",
    opacity: 1,
    color: theme.colors.white.darkest,
  },
  cardHabitNameTextIgnored: {
    opacity: 1,
    color: theme.colors.white.darkest,
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
