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

interface FormValues {
  period: HabitsType["period"]
}

export default function HabitPeriodSelector() {
  const { colorHabit } = useHabitManagerContext()
  const selectedColor = getColorHexByName(colorHabit)
  const { values, setFieldValue } = useFormikContext<FormValues>()
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

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Chip
          style={styles.chip}
          color={selectedColor}
          selected={selectedPeriod.includes(MORNING)}
          onPress={() => handleSelect(MORNING)}
        >
          Manhã
        </Chip>
        <Chip
          style={styles.chip}
          color={selectedColor}
          onPress={() => handleSelect(AFTERNOON)}
          selected={selectedPeriod.includes(AFTERNOON)}
        >
          Tarde
        </Chip>
        <Chip
          style={styles.chip}
          color={selectedColor}
          onPress={() => handleSelect(NIGHT)}
          selected={selectedPeriod.includes(NIGHT)}
        >
          Noite
        </Chip>
      </View>

      <View style={styles.row}>
        <Chip
          style={styles.chipFull}
          color={selectedColor}
          onPress={() => handleSelect(ANYTIME)}
          selected={selectedPeriod.includes(ANYTIME)}
        >
          A qualquer hora do dia
        </Chip>
      </View>
      <View style={styles.warn}>
        <ThemedIcons
          name="info"
          size={25}
          darkColor={theme.colors.yellow.base}
          style={{ marginRight: 10 }}
        />
        <Text style={{ color: theme.colors.yellow.base }}>
          Observação: Total da sua meta diária, 30min manhã, 30min tarde e 30min a noite{" "}
        </Text>
      </View>
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
