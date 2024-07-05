import { View, StyleSheet } from "react-native"
import { useFormikContext } from "formik"

import { Calendar } from "@/components/Calendar"
import ContentFlexRow from "@/components/ContentFlexRow"
import AccordionContainer from "@/components/AccordionContainer"
import ContentContainer from "@/components/ContentContainer"
import { BubblePressable } from "@/components/Buttons/BubblePressable"
import { HabitColorNameType, getColorContrastColorByHex, theme } from "@/Theme"
import { dateTextFormatter, getFormattedDate } from "@/utils/dateHelpers"
import { ThemedSegmentedControl, ThemedText } from "@/components/Utils/Themed"
import { HabitFrequencyChip } from "@/components/HabitManager/HabitFrequencyChip"
import {
  DAYS_LIST_OF_MONTH,
  HABIT_DAYS,
  HABIT_WEEK_FREQUENCY_NUMBERS,
} from "@/utils/testData/habitsData"
import APP_CONSTANTS from "@/constants/AppConstants"
import { HabitsType } from "@/components/HabitManager/habitManagerContext"

import { formatFrequencyText } from "@/utils/habitManagerHelpers"
import useVisibilityControl from "@/utils/useVisibilityControl"
import { getFrequenciesByIndex, getFrequenciesByLabel } from "@/utils/useFrequency"

interface HabitFrequencySelectorsProps {
  color: string
}

const HabitFrequencySelectors = (props: HabitFrequencySelectorsProps) => {
  const { values, setFieldValue } = useFormikContext<HabitsType>()
  const { color = theme.colors.primary.base } = props

  const { toggleVisibility, setVisibility, getVisibility } = useVisibilityControl({
    frequencyView: false,
    calendarViewFrequency: false,
    calendarViewEndDate: false,
  })

  const toggleRepeat = (value: boolean) => {
    setFieldValue("repeat", value)
    setVisibility("calendarViewFrequency", false)
    !value
      ? setFieldValue("frequency", APP_CONSTANTS.HABIT.FREQUENCY.SINGLE)
      : setFieldValue("frequency", APP_CONSTANTS.HABIT.FREQUENCY.DAILY)
  }

  const handleFrequencyChange = ({ nativeEvent }: any) => {
    const frequencyLabel = getFrequenciesByIndex(nativeEvent.selectedSegmentIndex)
    if (frequencyLabel) {
      setFieldValue("frequency", frequencyLabel)
    } else {
      // dispatch error
    }
  }
  const setEndDate = (value: boolean | string) => {
    if (value) {
      setFieldValue("endDate", getFormattedDate("yyyy-MM-dd", new Date()))
    } else {
      setFieldValue("endDate", "")
    }
  }

  return (
    <View>
      <ContentFlexRow
        text="Repetir"
        switchOptions={{
          selectedColor: String(color),
          value: values.repeat,
          onValueChange: (value) => toggleRepeat(value),
        }}
        separatorPosition="bottom"
      />
      {!values.repeat && (
        <View>
          <AccordionContainer
            isVisible={getVisibility("calendarViewFrequency") || false}
            header={
              <ContentFlexRow
                text="Fazer uma vez"
                customContent={
                  <BubblePressable.Button
                    color={color}
                    onPress={() => {
                      toggleVisibility("calendarViewFrequency")
                    }}
                    textAlignment="center"
                    buttonStyle={{ paddingHorizontal: 20 }}
                    radius={10}
                  >
                    <ThemedText colorText={color && getColorContrastColorByHex(color)}>
                      {dateTextFormatter(values.singleDate?.dateString)}
                    </ThemedText>
                  </BubblePressable.Button>
                }
              />
            }
          >
            <ContentContainer schemeColor="light" onlyRadiusBottom>
              <Calendar
                onDayPress={(day) => {
                  setFieldValue("singleDate", day)
                }}
                currentColor={color}
                selectedDate={String(values.singleDate?.dateString)}
              />
            </ContentContainer>
          </AccordionContainer>
        </View>
      )}
      {values.repeat && (
        <View>
          <AccordionContainer
            isVisible={getVisibility("frequencyView") || false}
            header={
              <ContentFlexRow
                text={formatFrequencyText(values)}
                iconIndicator="keyboard-arrow-down"
                onPress={() => toggleVisibility("frequencyView")}
                iconRotated={getVisibility("frequencyView")}
                separatorPosition="bottom"
              />
            }
          >
            <ContentContainer
              schemeColor="light"
              onlyRadiusBottom
              style={{ paddingBottom: theme.spaces.defaultSpace }}
            >
              <ThemedSegmentedControl
                values={["Diário", "Semanal", "Mensal"]}
                selectedIndex={getFrequenciesByLabel(values.frequency)}
                onChange={(item) => handleFrequencyChange(item)}
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
              {values.frequency === APP_CONSTANTS.HABIT.FREQUENCY.DAILY && (
                <HabitFrequencyChip
                  data={HABIT_DAYS}
                  initialSelected={values.frequencySchedule.daily}
                  selectedColor={color}
                  multiSelection
                  frequency={APP_CONSTANTS.HABIT.FREQUENCY.DAILY}
                />
              )}
              {values.frequency === APP_CONSTANTS.HABIT.FREQUENCY.WEEKLY && (
                <HabitFrequencyChip
                  data={HABIT_WEEK_FREQUENCY_NUMBERS}
                  initialSelected={values.frequencySchedule.weekly}
                  selectedColor={color}
                  frequency={APP_CONSTANTS.HABIT.FREQUENCY.WEEKLY}
                />
              )}
              {values.frequency === APP_CONSTANTS.HABIT.FREQUENCY.MONTHLY && (
                <HabitFrequencyChip
                  data={DAYS_LIST_OF_MONTH}
                  initialSelected={values.frequencySchedule.monthly}
                  selectedColor={color}
                  multiline
                  frequency={APP_CONSTANTS.HABIT.FREQUENCY.MONTHLY}
                  multiSelection
                />
              )}
            </ContentContainer>
          </AccordionContainer>

          <ContentFlexRow
            text="Definir data de término"
            switchOptions={{
              selectedColor: String(color),
              value: values.endDate ? true : false,
              onValueChange: (value) => {
                setEndDate(value)
                setVisibility("calendarViewEndDate", false)
              },
            }}
          />
          {Boolean(values.endDate) && (
            <View>
              <AccordionContainer
                isVisible={getVisibility("calendarViewEndDate") || false}
                header={
                  <ContentFlexRow
                    text="Terminar no dia"
                    separatorPosition="top"
                    customContent={
                      <BubblePressable.Button
                        color={color}
                        onPress={() => toggleVisibility("calendarViewEndDate")}
                        buttonStyle={{ paddingHorizontal: 20 }}
                        radius={8}
                      >
                        <ThemedText colorText={color && getColorContrastColorByHex(color)}>
                          {dateTextFormatter(values.endDate)}
                        </ThemedText>
                      </BubblePressable.Button>
                    }
                  />
                }
              >
                <ContentContainer schemeColor="light" onlyRadiusBottom>
                  <Calendar
                    onDayPress={(day) => {
                      setFieldValue("endDate", day.dateString)
                    }}
                    currentColor={color}
                    selectedDate={String(values.endDate)}
                  />
                </ContentContainer>
              </AccordionContainer>
            </View>
          )}
        </View>
      )}
    </View>
  )
}

export default HabitFrequencySelectors

export const styles = StyleSheet.create({
  container: {},

  segmentedControl: {
    height: 50,
    marginTop: 10,
    marginBottom: 0,
    marginHorizontal: theme.spaces.defaultSpace,
  },
})
