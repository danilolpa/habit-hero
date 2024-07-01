import { View, StyleSheet } from "react-native"
import { useEffect, useState } from "react"
import { useFormikContext } from "formik"

import APP_CONSTANTS from "@/constants/AppConstants"
import { getColorHexByName } from "@/Theme"
import { HabitsType, TimePeriodType } from "@/app/habitsManager/habitManagerContext"
import { formatGoalText } from "@/utils/habitManagerHelpers"
import Chip from "@/components/Buttons/Chip"
import Warning from "@/components/Warning"
import AccordionContainer from "@/components/AccordionContainer"
import ContentContainer from "@/components/ContentContainer"
import ContentFlexRow from "@/components/ContentFlexRow"
import useVisibilityControl from "@/utils/useVisibilityControl"
import { enhanceArrayText } from "@/utils/textHelpers"

interface HabitPeriodSelectorProps {
  // selectedColor?: string
}

interface FormValues {
  period: HabitsType["period"]
  goal: HabitsType["goal"]
  color: HabitsType["color"]
}

export default function HabitPeriodSelector() {
  const { values, setFieldValue } = useFormikContext<FormValues>()
  const [selectedColor, setSelectedColor] = useState<string>(getColorHexByName(values.color))
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriodType[]>(values.period || [])
  const { MORNING, AFTERNOON, NIGHT, ANYTIME } = APP_CONSTANTS.HABIT.PERIOD

  const { toggleVisibility, getVisibility } = useVisibilityControl({
    periodView: false,
  })

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
    if (selectedPeriod.length === 0) {
      setFieldValue("period", [ANYTIME])
      setSelectedPeriod([ANYTIME])
    }
  }, [selectedPeriod])

  useEffect(() => {
    setSelectedColor(getColorHexByName(values.color))
  }, [values.color])

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

    return enhanceArrayText(text)
  }

  const informativeTitle = () => {
    let text = [] as string[]

    if (values.period?.includes(MORNING)) {
      text.push("Manhã")
    }
    if (values.period?.includes(AFTERNOON)) {
      text.push("Tarde")
    }
    if (values.period?.includes(NIGHT)) {
      text.push("Noite")
    }
    if (values.period?.includes(ANYTIME)) {
      text.push("A qualquer hora do dia")
    }

    return enhanceArrayText(text)
  }

  return (
    <AccordionContainer
      isVisible={getVisibility("periodView") || false}
      header={
        <ContentFlexRow
          text={String(informativeTitle())}
          iconIndicator="keyboard-arrow-down"
          onPress={() => toggleVisibility("periodView")}
          iconRotated={getVisibility("periodView")}
          separatorPosition="bottom"
        />
      }
    >
      <ContentContainer schemeColor="light" onlyRadiusBottom withMargin>
        <View style={styles.container}>
          <View style={styles.row}>
            <Chip
              activeColor={selectedColor}
              selected={selectedPeriod.includes(MORNING)}
              onPress={() => handleSelect(MORNING)}
              text="Manhã"
            />
            <Chip
              activeColor={selectedColor}
              onPress={() => handleSelect(AFTERNOON)}
              selected={selectedPeriod.includes(AFTERNOON)}
              text="Tarde"
            />
            <Chip
              activeColor={selectedColor}
              onPress={() => handleSelect(NIGHT)}
              selected={selectedPeriod.includes(NIGHT)}
              text="Noite"
            />
          </View>

          <View style={styles.row}>
            <Chip
              style={styles.chipFull}
              activeColor={selectedColor}
              onPress={() => handleSelect(ANYTIME)}
              selected={selectedPeriod.includes(ANYTIME)}
              text="A qualquer hora do dia"
            />
          </View>
          {countSelectedPeriods > 1 && values.goal.hasGoal && (
            <Warning style={{ marginTop: 10 }}>
              Observação: Total da sua meta diária, {constructWarnText()}
            </Warning>
          )}
        </View>
      </ContentContainer>
    </AccordionContainer>
  )
}

export const styles = StyleSheet.create({
  container: {
    minHeight: 100,
    gap: 8,
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
})
