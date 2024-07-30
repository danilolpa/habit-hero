import { View, Text, StyleSheet } from "react-native"
import { ThemedIcon, ThemedText } from "@/components/Utils/Themed"
import { theme } from "@/Theme"
import { translateGoalText } from "@/utils/habitManagerHelpers"
import { pluralizeIfNeeded } from "@/utils/textHelpers"
import { HabitsType } from "@/types/habits"
import { getTotalMinutes } from "@/utils/dateHelpers"

type HabitCardGoalType = {
  color: string
  goal: HabitsType["goal"]
}

export default function HabitCardGoal(props: HabitCardGoalType) {
  const { goal, color } = props

  if (!goal) return null

  const goalType = goal.goalType || "BY_UNITS"
  const goalDetailsType = goal.goalDetails?.type || "TIME"
  const completedHabitsCount = 0

  const formatTimeText = () => {
    let text = goal.goalDetails?.hours + "h " + goal.goalDetails?.minutes + "min"
    if (goal.goalDetails?.seconds) {
      text += " " + goal.goalDetails?.seconds + "s"
    }
    return text
  }
  const textLabel =
    goalType === "BY_UNITS"
      ? pluralizeIfNeeded(translateGoalText(goalDetailsType), Number(goal.goalDetails?.count))
      : formatTimeText()

  return (
    <View style={styles.cardGoalContainer}>
      {goalType === "BY_TIME" && (
        <View style={styles.byTimeContainer}>
          <ThemedIcon name="timer" size={30} style={[{ color: color }, styles.byTimeIcon]} />

          <ThemedText
            darkColor={theme.colors.white.light}
            lightColor={theme.colors.black.dark}
            fontSize={14}
            style={{ top: 0 }}
          >
            {textLabel}
          </ThemedText>
        </View>
      )}
      {goalType === "BY_UNITS" && (
        <>
          <ThemedText colorText={color} fontSize={22} style={{ top: 5 }}>
            {completedHabitsCount}
            <ThemedText style={{ opacity: 0.6 }} fontSize={16} colorText={color}>
              /{goal?.goalDetails?.count}
            </ThemedText>
          </ThemedText>

          <ThemedText
            darkColor={theme.colors.white.light}
            lightColor={theme.colors.black.dark}
            fontSize={14}
            style={{ top: -5 }}
          >
            {textLabel}
          </ThemedText>
        </>
      )}
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {},

  cardGoalContainer: {
    display: "flex",
    width: 75,
    alignItems: "flex-end",
  },
  byTimeContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  byTimeIcon: {},
})
