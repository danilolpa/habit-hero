import { View, StyleSheet } from "react-native"
import { useState } from "react"
import { useFormikContext } from "formik"

import ContentContainer from "@/components/ContentContainer"
import ContentFlexRow from "@/components/ContentFlexRow"
import AccordionContainer from "@/components/AccordionContainer"
import { ThemedSegmentedControl } from "@/components/Utils/Themed"
import APP_CONSTANTS from "@/constants/AppConstants"
import {
  formatGoalText,
  getGoalIndexByValue,
  getGoalTypeByIndex,
} from "@/utils/habitManagerHelpers"
import { getColorContrastColorByHex, theme } from "@/Theme"
import HabitGoalPicker from "@/components/HabitManager/HabitGoalPicker"
import { HabitsType } from "@/components/HabitManager/habitManagerContext"

interface HabitGoalSelectorProps {
  color?: string
}

const HabitGoalSelector = (props: HabitGoalSelectorProps) => {
  const { values, setFieldValue } = useFormikContext<HabitsType>()
  const { color = theme.colors.primary.base } = props
  const [visiblePicker, setVisibilityPicker] = useState(false)

  const handleGoalType = ({ nativeEvent }: any) => {
    const goalType = getGoalTypeByIndex(nativeEvent.selectedSegmentIndex) || "units"
    const hasGoalDetails = Object.keys(values.goal.goalDetails || {}).length > 0
    if (goalType && typeof goalType === "object" && "VALUE" in goalType) {
      setFieldValue("goal.goalType", String(goalType.VALUE))
      if (!hasGoalDetails) {
        setFieldValue("goal.goalDetails", APP_CONSTANTS.HABIT.GOAL.GOAL_DETAILS_INITIAL_VALUES)
      }
    } else {
      // dispatch error
    }
  }
  const toggleGoal = (value: boolean) => {
    setFieldValue("goal.hasGoal", value)
  }

  return (
    <View>
      <ContentFlexRow
        text="Meta"
        switchOptions={{
          selectedColor: String(color),
          value: values.goal.hasGoal,
          onValueChange: (value) => toggleGoal(value),
        }}
      />

      {values.goal.hasGoal && (
        <AccordionContainer isVisible={values.goal.hasGoal}>
          <ContentContainer schemeColor="light" onlyRadiusBottom>
            <View>
              <ThemedSegmentedControl
                values={APP_CONSTANTS.HABIT.GOAL.GOAL_LABELS.map((item) => item.LABEL)}
                selectedIndex={getGoalIndexByValue(String(values.goal.goalType))}
                onChange={(item) => handleGoalType(item)}
                style={styles.segmentedControl}
                tintColor={color}
                fontStyle={{
                  fontSize: 14,
                }}
                activeFontStyle={{
                  color: color && getColorContrastColorByHex(color),
                  fontSize: 16,
                }}
              />
            </View>
            <ContentFlexRow
              text={formatGoalText(values.goal) || "Escolha uma meta"}
              iconIndicator="arrow-forward-ios"
              iconSize={16}
              onPress={() => setVisibilityPicker(true)}
            />

            <HabitGoalPicker
              visible={visiblePicker || false}
              onClose={() => setVisibilityPicker(false)}
              type={String(values.goal.goalType)}
              selectionColor={color}
            />
          </ContentContainer>
        </AccordionContainer>
      )}
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {},

  segmentedControl: {
    height: 50,
    marginTop: 10,
    marginBottom: 0,
    marginHorizontal: theme.spaces.defaultSpace,
  },
})

export default HabitGoalSelector
