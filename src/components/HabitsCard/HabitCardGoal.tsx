import { View, Text, StyleSheet } from "react-native"
import { ThemedIcon, ThemedText } from "@/components/Utils/Themed"
import { theme } from "@/Theme"
import { translateGoalText } from "@/utils/habitManagerHelpers"
import { pluralizeIfNeeded } from "@/utils/textHelpers"
import { HabitsType } from "@/types/habits"

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
    let text = ""
    if (goal.goalDetails) {
      const { hours, minutes, seconds } = goal.goalDetails

      if (hours && hours > 0) {
        text = hours + "h "
      }

      text = text + minutes + "min"
      if (seconds) {
        text += " " + seconds + "s"
      }
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
        <View style={styles.timeContainer}>
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
        <View style={styles.unitsContainer}>
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
        </View>
      )}
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {},

  cardGoalContainer: {
    display: "flex",
    width: 80,
  },
  timeContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: theme.colors.black.lightest,
    borderRadius: 18,
    marginTop: 1,
  },
  unitsContainer: {
    paddingHorizontal: theme.spaces.defaultSpace,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  byTimeIcon: {},
})
