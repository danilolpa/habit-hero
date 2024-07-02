import React, { useState, useRef, forwardRef, useImperativeHandle } from "react"
import { View, StyleSheet, Switch, ScrollView, Text, Pressable, Alert } from "react-native"
import { Formik, FormikProps } from "formik"
import * as Yup from "yup"
import * as Haptics from "expo-haptics"
import { MaterialIcons } from "@expo/vector-icons"
import { ThemedText, ThemedView, ThemedSegmentedControl } from "@/components/Utils/Themed"
import { Input } from "@/components/Input"
import { getColorContrastColorByHex, getColorHexByName, theme } from "@/Theme"
import ColorPicker from "@/components/ColorPicker"
import { useHabitManagerContext, HabitsType } from "./habitManagerContext"
import ContentContainer from "@/components/ContentContainer"
import { HabitFrequencyChip } from "@/components/HabitManager/HabitFrequencyChip"
import {
  HABIT_DAYS,
  HABIT_WEEK_FREQUENCY_NUMBERS,
  DAYS_LIST_OF_MONTH,
} from "@/utils/testData/habitsData"
import { getFrequenciesByIndex, getFrequenciesByLabel } from "@/utils/useFrequency"
import JsonViewer from "@/components/Utils/JsonView"
import APP_CONSTANTS from "@/constants/AppConstants"
import { dateTextFormatter, getFormattedDate } from "@/utils/dateHelpers"
import { Calendar } from "@/components/Calendar"
import { BubblePressable } from "@/components/Buttons/BubblePressable"
import IconsHabitModal from "@/components/IconsHabitModal"
import {
  getGoalIndexByValue,
  getGoalTypeByIndex,
  formatFrequencyText,
  formatGoalText,
} from "@/utils/habitManagerHelpers"
import AccordionContainer from "@/components/AccordionContainer"
import useVisibilityControl from "@/utils/useVisibilityControl"
import HabitGoalPicker from "@/components/HabitManager/HabitGoalPicker"
import ContentFlexRow from "@/components/ContentFlexRow"
import HabitPeriodSelector from "@/components/HabitManager/HabitPeriodSelector"
import HabitReminderSelector from "@/components/HabitManager/HabitReminderSelector"

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
})

interface HabitManagerFormProps {
  submitForm: () => void
}

export const HabitManagerForm = forwardRef<HabitManagerFormProps>((props, ref) => {
  const { submitForm, loading, error, habitData } = useHabitManagerContext()
  const formikRef = useRef<FormikProps<typeof habitData>>(null)
  const { toggleVisibility, setVisibility, getVisibility } = useVisibilityControl({
    frequency: false,
    goal: false,
    emoteModal: false,
    calendarViewFrequency: false,
    calendarViewEndDate: false,
    goalSelectPicker: false,
    periodView: false,
  })

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      if (formikRef.current) {
        formikRef.current.submitForm()
      }
    },
  }))
  return (
    <ScrollView>
      <Formik
        initialValues={habitData}
        validationSchema={validationSchema}
        onSubmit={(values) => submitForm(values)}
        innerRef={formikRef}
      >
        {(formikProps: FormikProps<HabitsType>) => {
          const selectedColor = formikProps.values.color
            ? getColorHexByName(formikProps.values.color)
            : theme.colors.primary.base
          const toggleRepeat = (value: boolean) => {
            formikProps.setFieldValue("repeat", value)
            setVisibility("calendarViewFrequency", false)
            !value
              ? formikProps.setFieldValue("frequency", APP_CONSTANTS.HABIT.FREQUENCY.SINGLE)
              : formikProps.setFieldValue("frequency", APP_CONSTANTS.HABIT.FREQUENCY.DAILY)
          }

          const handleFrequencyChange = ({ nativeEvent }: any) => {
            const frequencyLabel = getFrequenciesByIndex(nativeEvent.selectedSegmentIndex)
            if (frequencyLabel) {
              formikProps.setFieldValue("frequency", frequencyLabel)
            } else {
              // dispatch error
            }
          }

          const toggleGoal = (value: boolean) => {
            formikProps.setFieldValue("goal.hasGoal", value)
          }

          const handleGoalType = ({ nativeEvent }: any) => {
            const goalType = getGoalTypeByIndex(nativeEvent.selectedSegmentIndex) || "units"
            const hasGoalDetails = Object.keys(formikProps.values.goal.goalDetails || {}).length > 0
            if (goalType && typeof goalType === "object" && "VALUE" in goalType) {
              formikProps.setFieldValue("goal.goalType", String(goalType.VALUE))
              if (!hasGoalDetails) {
                formikProps.setFieldValue(
                  "goal.goalDetails",
                  APP_CONSTANTS.HABIT.GOAL.GOAL_DETAILS_INITIAL_VALUES,
                )
              }
            } else {
              // dispatch error
            }
          }
          const setEndDate = (value: boolean | string, formikProps: any) => {
            if (value) {
              formikProps.setFieldValue("endDate", getFormattedDate("yyyy-MM-dd", new Date()))
            } else {
              formikProps.setFieldValue("endDate", "")
            }
          }
          return (
            <ThemedView style={styles.container}>
              {loading && <Text>Carregando...</Text>}
              {error && <Text>Erro: {error}</Text>}

              <View style={styles.containerFlexRow}>
                <Input.Field
                  placeholder="Nome"
                  darkColor={theme.colors.black.light}
                  lightColor={theme.colors.white.light}
                  size="medium"
                  onChangeText={formikProps.handleChange("name")}
                  onBlur={formikProps.handleBlur("name")}
                  value={formikProps.values.name}
                  styleField={{ margin: 0 }}
                  style={{ width: "80%", paddingRight: 4 }}
                  cursorColor={selectedColor}
                />

                <BubblePressable.Button
                  color={selectedColor}
                  buttonStyle={{
                    width: 65,
                    height: 60,
                  }}
                  onPress={() => toggleVisibility("emoteModal")}
                  radius={8}
                >
                  <MaterialIcons
                    name={formikProps.values.icon}
                    size={30}
                    color={getColorContrastColorByHex(String(selectedColor))}
                    style={{ textAlign: "center" }}
                  />
                </BubblePressable.Button>
                <IconsHabitModal
                  isVisible={getVisibility("emoteModal") || false}
                  onClose={() => setVisibility("emoteModal", false)}
                  selectedColor={String(selectedColor)}
                  habitIconActual={formikProps.values.icon}
                />
              </View>
              <Input.Field
                placeholder="Descrição"
                darkColor={theme.colors.black.light}
                lightColor={theme.colors.white.light}
                multiline
                size="medium"
                numberOfLines={4}
                style={{ height: 125 }}
                onChangeText={formikProps.handleChange("description")}
                onBlur={formikProps.handleBlur("description")}
                value={formikProps.values.description}
                cursorColor={selectedColor}
              />
              <ContentContainer verticalMargin>
                <ColorPicker initialColor={formikProps.values.color} />
              </ContentContainer>
              <ContentContainer>
                <ContentFlexRow
                  text="Repetir"
                  switchOptions={{
                    selectedColor: String(selectedColor),
                    value: formikProps.values.repeat,
                    onValueChange: (value) => toggleRepeat(value),
                  }}
                  separatorPosition="bottom"
                />
                {!formikProps.values.repeat && (
                  <View>
                    <AccordionContainer
                      isVisible={getVisibility("calendarViewFrequency") || false}
                      header={
                        <ContentFlexRow
                          text="Fazer uma vez"
                          customContent={
                            <BubblePressable.Button
                              color={selectedColor}
                              onPress={() => {
                                toggleVisibility("calendarViewFrequency")
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                              }}
                              textAlignment="center"
                              buttonStyle={{ paddingHorizontal: 20 }}
                              radius={10}
                            >
                              <ThemedText
                                colorText={
                                  selectedColor && getColorContrastColorByHex(selectedColor)
                                }
                              >
                                {dateTextFormatter(formikProps.values.singleDate?.dateString)}
                              </ThemedText>
                            </BubblePressable.Button>
                          }
                        />
                      }
                    >
                      <ContentContainer schemeColor="light" onlyRadiusBottom>
                        <Calendar
                          onDayPress={(day) => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                            formikProps.setFieldValue("singleDate", day)
                          }}
                          currentColor={selectedColor}
                          selectedDate={String(formikProps.values.singleDate?.dateString)}
                        />
                      </ContentContainer>
                    </AccordionContainer>
                  </View>
                )}
                {formikProps.values.repeat && (
                  <View>
                    <AccordionContainer
                      isVisible={getVisibility("frequency") || false}
                      header={
                        <ContentFlexRow
                          text={formatFrequencyText(formikProps.values)}
                          iconIndicator="keyboard-arrow-down"
                          onPress={() => toggleVisibility("frequency")}
                          iconRotated={getVisibility("frequency")}
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
                          selectedIndex={getFrequenciesByLabel(formikProps.values.frequency)}
                          onChange={(item) => handleFrequencyChange(item)}
                          style={styles.segmentedControl}
                          tintColor={selectedColor}
                          fontStyle={{
                            fontSize: 14,
                          }}
                          activeFontStyle={{
                            color: selectedColor && getColorContrastColorByHex(selectedColor),
                            fontSize: 16,
                          }}
                        />
                        {formikProps.values.frequency === APP_CONSTANTS.HABIT.FREQUENCY.DAILY && (
                          <HabitFrequencyChip
                            data={HABIT_DAYS}
                            initialSelected={formikProps.values.frequencySchedule.daily}
                            selectedColor={selectedColor}
                            multiSelection
                            frequency={APP_CONSTANTS.HABIT.FREQUENCY.DAILY}
                          />
                        )}
                        {formikProps.values.frequency === APP_CONSTANTS.HABIT.FREQUENCY.WEEKLY && (
                          <HabitFrequencyChip
                            data={HABIT_WEEK_FREQUENCY_NUMBERS}
                            initialSelected={formikProps.values.frequencySchedule.weekly}
                            selectedColor={selectedColor}
                            frequency={APP_CONSTANTS.HABIT.FREQUENCY.WEEKLY}
                          />
                        )}
                        {formikProps.values.frequency === APP_CONSTANTS.HABIT.FREQUENCY.MONTHLY && (
                          <HabitFrequencyChip
                            data={DAYS_LIST_OF_MONTH}
                            initialSelected={formikProps.values.frequencySchedule.monthly}
                            selectedColor={selectedColor}
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
                        selectedColor: String(selectedColor),
                        value: formikProps.values.endDate ? true : false,
                        onValueChange: (value) => {
                          setEndDate(value, formikProps)
                          setVisibility("calendarViewEndDate", false)
                        },
                      }}
                    />
                    {Boolean(formikProps.values.endDate) && (
                      <View>
                        <AccordionContainer
                          isVisible={getVisibility("calendarViewEndDate") || false}
                          header={
                            <ContentFlexRow
                              text="Terminar no dia"
                              separatorPosition="top"
                              customContent={
                                <BubblePressable.Button
                                  color={selectedColor}
                                  onPress={() => toggleVisibility("calendarViewEndDate")}
                                  buttonStyle={{ paddingHorizontal: 20 }}
                                  radius={8}
                                >
                                  <ThemedText
                                    colorText={
                                      selectedColor && getColorContrastColorByHex(selectedColor)
                                    }
                                  >
                                    {dateTextFormatter(formikProps.values.endDate)}
                                  </ThemedText>
                                </BubblePressable.Button>
                              }
                            />
                          }
                        >
                          <ContentContainer schemeColor="light" onlyRadiusBottom>
                            <Calendar
                              onDayPress={(day) => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                                formikProps.setFieldValue("endDate", day.dateString)
                              }}
                              currentColor={selectedColor}
                              selectedDate={String(formikProps.values.endDate)}
                            />
                          </ContentContainer>
                        </AccordionContainer>
                      </View>
                    )}
                  </View>
                )}
              </ContentContainer>
              <ContentContainer>
                <ContentFlexRow
                  text="Meta"
                  switchOptions={{
                    selectedColor: String(selectedColor),
                    value: formikProps.values.goal.hasGoal,
                    onValueChange: (value) => toggleGoal(value),
                  }}
                />

                {formikProps.values.goal.hasGoal && (
                  <AccordionContainer isVisible={formikProps.values.goal.hasGoal}>
                    <ContentContainer schemeColor="light" onlyRadiusBottom>
                      <View>
                        <ThemedSegmentedControl
                          values={APP_CONSTANTS.HABIT.GOAL.GOAL_LABELS.map((item) => item.LABEL)}
                          selectedIndex={getGoalIndexByValue(
                            String(formikProps.values.goal.goalType),
                          )}
                          onChange={(item) => handleGoalType(item)}
                          style={styles.segmentedControl}
                          tintColor={selectedColor}
                          fontStyle={{
                            fontSize: 14,
                          }}
                          activeFontStyle={{
                            color: selectedColor && getColorContrastColorByHex(selectedColor),
                            fontSize: 16,
                          }}
                        />
                      </View>
                      <ContentFlexRow
                        text={formatGoalText(formikProps.values.goal) || "Escolha uma meta"}
                        iconIndicator="arrow-forward-ios"
                        iconSize={16}
                        onPress={() => toggleVisibility("goalSelectPicker")}
                      />

                      <HabitGoalPicker
                        visible={getVisibility("goalSelectPicker") || false}
                        onClose={() => setVisibility("goalSelectPicker", false)}
                        type={String(formikProps.values.goal.goalType)}
                        selectionColor={selectedColor}
                      />
                    </ContentContainer>
                  </AccordionContainer>
                )}
              </ContentContainer>
              <ContentContainer>
                <HabitPeriodSelector />
                <ContentContainer>
                  <HabitReminderSelector />
                </ContentContainer>
              </ContentContainer>
              <JsonViewer jsonString={formikProps.values}></JsonViewer>
              {/* <JsonViewer jsonString={visibilityControl}></JsonViewer> */}
              {/* <Button
                onPress={() => formikProps.submitForm()}
                title={loading ? "Saving..." : "Save"}
                disabled={loading}
              /> */}
            </ThemedView>
          )
        }}
      </Formik>
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 60,
    borderColor: theme.colors.white.base,
    maxWidth: "100%",
    width: "100%",
    paddingHorizontal: theme.spaces.defaultSpace,
    gap: 4,
    display: "flex",
  },
  containerFlexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },
  segmentedControl: {
    height: 50,
    marginTop: 10,
    marginBottom: 0,
    marginHorizontal: theme.spaces.defaultSpace,
  },
  fowardActions: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    paddingVertical: theme.spaces.defaultSpace / 2,
    paddingHorizontal: theme.spaces.defaultSpace,
    height: 60,
  },
})
