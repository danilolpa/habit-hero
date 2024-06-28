import { View, Text, StyleSheet, Alert } from "react-native"
import Chip from "@/components/Buttons/Chip"
import {
  HabitsType,
  useHabitManagerContext,
  TimePeriodType,
} from "@/app/habitsManager/habitManagerContext"
import { getColorHexByName, theme } from "@/Theme"
import { ThemedIcons } from "@/components/Utils/Themed"
import { useFormikContext } from "formik"
import { useEffect, useState } from "react"
import APP_CONSTANTS from "@/constants/AppConstants"
import { formatGoalText } from "@/utils/habitManagerHelpers"

interface FormValues {
  period: HabitsType["period"]
  goal: HabitsType["goal"]
  color: HabitsType["color"]
}

export default function HabitPeriodSelector() {
  const { values, setFieldValue } = useFormikContext<FormValues>()
  const selectedColor = getColorHexByName(values.color)
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriodType[]>(values.period || [])
  const { MORNING, AFTERNOON, NIGHT, ANYTIME } = APP_CONSTANTS.HABIT.PERIOD

  const handleSelect = (period: TimePeriodType): void => {
    setSelectedPeriod((prevPeriods) => {
      if (period === ANYTIME) {
        return [ANYTIME]
      } else {
        if (prevPeriods.includes(period)) {
          const updatedPeriods = prevPeriods.filter((p) => p !== period)
          return updatedPeriods.length > 0 ? updatedPeriods : prevPeriods
        } else {
          const filteredPeriods = prevPeriods.filter((p) => p !== ANYTIME)
          return [...filteredPeriods, period]
        }
      }
    })
  }

  useEffect(() => {
    setFieldValue("period", selectedPeriod)
  }, [selectedPeriod])

  const countSelectedPeriods = selectedPeriod.length
  const constructWarnText = () => {
    let text = [] as string[]

    selectedPeriod.map((period) => {
      if (period === MORNING) {
        text.push(String(formatGoalText(values.goal, "à manhã")))
      }
      if (period === AFTERNOON) {
        text.push(String(formatGoalText(values.goal, "à tarde")))
      }
      if (period === NIGHT) {
        text.push(String(formatGoalText(values.goal, "à noite")))
      }
    })

    return `${text.slice(0, -1).join(", ")} e ${text[text.length - 1]}.`
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Chip
          style={styles.chip}
          activeColor={selectedColor}
          selected={selectedPeriod.includes(MORNING)}
          onPress={() => handleSelect(MORNING)}
        >
          Manhã
        </Chip>
        <Chip
          style={styles.chip}
          activeColor={selectedColor}
          onPress={() => handleSelect(AFTERNOON)}
          selected={selectedPeriod.includes(AFTERNOON)}
        >
          Tarde
        </Chip>
        <Chip
          style={styles.chip}
          activeColor={selectedColor}
          onPress={() => handleSelect(NIGHT)}
          selected={selectedPeriod.includes(NIGHT)}
        >
          Noite
        </Chip>
      </View>

      <View style={styles.row}>
        <Chip
          style={styles.chipFull}
          activeColor={selectedColor}
          onPress={() => handleSelect(ANYTIME)}
          selected={selectedPeriod.includes(ANYTIME)}
        >
          A qualquer hora do dia
        </Chip>
      </View>
      {countSelectedPeriods > 1 && values.goal.hasGoal && (
        <View style={styles.warn}>
          <ThemedIcons
            name="info"
            size={25}
            darkColor={theme.colors.yellow.base}
            style={{ marginRight: 10 }}
          />
          <Text style={{ color: theme.colors.yellow.base }}>
            Observação: Total da sua meta diária, {constructWarnText()}
          </Text>
        </View>
      )}
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    gap: 8,
  },
  chip: {
    flexGrow: 1,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  chipFull: {
    width: "100%",
    flexGrow: 1,
  },
  warn: {
    borderRadius: 10,
    paddingTop: 10,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 30,
  },
})
