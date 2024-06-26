import React, { useState, useRef, forwardRef, useImperativeHandle } from "react"
import { View, StyleSheet, Switch, ScrollView, Text, Pressable, Alert } from "react-native"
import { Formik, FormikProps } from "formik"
import * as Yup from "yup"
import * as Haptics from "expo-haptics"
import { MaterialIcons } from "@expo/vector-icons"

import { Picker } from "@react-native-picker/picker"

import {
  ThemedText,
  ThemedView,
  ThemedSegmentedControl,
  ThemedMaterialIcons,
} from "@/components/Utils/Themed"
import { Input } from "@/components/Input"
import { getColorContrastColorByHex, getColorHexByName, theme } from "@/Theme"
import ColorPicker from "@/components/ColorPicker"
import { useHabitManagerContext, HabitsType } from "./habitManagerContext"
import ContentContainer from "@/components/ContentContainer"
import { RoundedButtons } from "@/components/Buttons/RoundedButtons"
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
import BubbleButton from "@/components/Buttons/BubbleButton"
import IconsHabitModal from "@/components/IconsHabitModal"
import {
  getGoalIndexByValue,
  getGoalTypeByIndex,
  formatFrequencyText,
  formatGoalText,
} from "@/utils/habitManagerHelpers"
import AccordionContainer from "@/components/AccordionContainer"
import RotatingAnimation from "@/components/RotatingAnimation"
import useVisibilityControl from "@/utils/useVisibilityControl"
import Animated from "react-native-reanimated"
import SelectWheelGoal from "@/components/Habits/SelectWheelGoal"

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
  const { visibilityControl, toggleVisibility, setVisibility, getVisibility } =
    useVisibilityControl({
      frequency: false,
      goal: false,
      emoteModal: false,
      calendarViewFrequency: false,
      calendarViewEndDate: false,
      goalSelectPicker: false,
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

                <BubbleButton
                  backgroundColor={selectedColor}
                  style={{
                    minHeight: 60,
                    width: 60,
                  }}
                  onPress={() => toggleVisibility("emoteModal")}
                >
                  <MaterialIcons
                    name={formikProps.values.icon}
                    size={30}
                    color={getColorContrastColorByHex(String(selectedColor))}
                  />
                </BubbleButton>
                <IconsHabitModal
                  isVisible={getVisibility("emoteModal")}
                  onClose={() => toggleVisibility("emoteModal")}
                  selectedColor={String(selectedColor)}
                  currentIcon={formikProps.values.icon}
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
              <ContentContainer style={{ paddingHorizontal: 0 }}>
                <ColorPicker initialColor={formikProps.values.color} />
              </ContentContainer>
              <ContentContainer noPadding>
                <ThemedView style={[styles.contentRow, styles.contentRowWithDivider]}>
                  <ThemedText style={styles.headingTitle}>Repetir</ThemedText>
                  <Switch
                    trackColor={{ false: "#767577", true: selectedColor }}
                    thumbColor={formikProps.values.repeat ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) => toggleRepeat(value)}
                    value={formikProps.values.repeat}
                  />
                </ThemedView>
                {!formikProps.values.repeat && (
                  <View>
                    <ThemedView style={styles.contentRow}>
                      <ThemedText style={styles.headingTitle}>Fazer uma vez</ThemedText>
                      <BubbleButton
                        backgroundColor={selectedColor}
                        onPress={() => {
                          toggleVisibility("calendarViewFrequency")
                          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                        }}
                      >
                        <ThemedText
                          colorText={selectedColor && getColorContrastColorByHex(selectedColor)}
                        >
                          {dateTextFormatter(formikProps.values.singleDate?.dateString)}
                        </ThemedText>
                      </BubbleButton>
                    </ThemedView>
                    <AccordionContainer isVisible={getVisibility("calendarViewFrequency")}>
                      <ThemedView
                        darkColor={theme.colors.black.lighter}
                        lightColor={theme.colors.white.lighter}
                        style={[styles.contentContainerlight, { padding: 0 }]}
                      >
                        <Calendar
                          onDayPress={(day) => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                            formikProps.setFieldValue("singleDate", day)
                          }}
                          currentColor={selectedColor}
                          selectedDate={String(formikProps.values.singleDate?.dateString)}
                        />
                      </ThemedView>
                    </AccordionContainer>
                  </View>
                )}
                {formikProps.values.repeat && (
                  <View>
                    <Pressable
                      style={[styles.contentRow, styles.contentRowWithDivider]}
                      onPress={() => toggleVisibility("frequency")}
                    >
                      <ThemedText
                        ellipsizeMode="tail"
                        style={[styles.headingTitle, { maxWidth: "93%" }]}
                        numberOfLines={1}
                      >
                        {formatFrequencyText(formikProps.values)}
                      </ThemedText>
                      <RotatingAnimation isRotated={getVisibility("frequency")}>
                        <ThemedMaterialIcons
                          name="keyboard-arrow-down"
                          size={26}
                          lightColor={theme.colors.black.base}
                          darkColor={theme.colors.white.base}
                        />
                      </RotatingAnimation>
                    </Pressable>

                    <AccordionContainer isVisible={getVisibility("frequency")}>
                      <ThemedView
                        darkColor={theme.colors.black.lighter}
                        lightColor={theme.colors.white.lighter}
                        style={styles.contentContainerlight}
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
                          <RoundedButtons
                            data={HABIT_DAYS}
                            initialSelected={formikProps.values.frequencySchedule.daily}
                            selectedColor={selectedColor}
                            multiSelection
                            frequency={APP_CONSTANTS.HABIT.FREQUENCY.DAILY}
                            textColor={selectedColor}
                          />
                        )}
                        {formikProps.values.frequency === APP_CONSTANTS.HABIT.FREQUENCY.WEEKLY && (
                          <RoundedButtons
                            data={HABIT_WEEK_FREQUENCY_NUMBERS}
                            initialSelected={formikProps.values.frequencySchedule.weekly}
                            selectedColor={selectedColor}
                            frequency={APP_CONSTANTS.HABIT.FREQUENCY.WEEKLY}
                          />
                        )}
                        {formikProps.values.frequency === APP_CONSTANTS.HABIT.FREQUENCY.MONTHLY && (
                          <RoundedButtons
                            data={DAYS_LIST_OF_MONTH}
                            initialSelected={formikProps.values.frequencySchedule.monthly}
                            selectedColor={selectedColor}
                            multiline
                            frequency={APP_CONSTANTS.HABIT.FREQUENCY.MONTHLY}
                            isCalendar
                            multiSelection
                          />
                        )}
                      </ThemedView>
                    </AccordionContainer>
                    <ThemedView style={[styles.contentRow]}>
                      <ThemedText style={styles.headingTitle}>Definir data de término</ThemedText>
                      <Switch
                        trackColor={{ false: "#767577", true: selectedColor }}
                        thumbColor={formikProps.values.endDate ? "#f4f3f4" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(value) => {
                          setEndDate(value, formikProps)
                          setVisibility("calendarViewEndDate", false)
                        }}
                        value={Boolean(formikProps.values.endDate) || false}
                      />
                    </ThemedView>
                    {Boolean(formikProps.values.endDate) && (
                      <Animated.View>
                        <ThemedView style={[styles.contentRow, styles.borderTop]}>
                          <ThemedText style={styles.headingTitle}>Terminar em</ThemedText>
                          <BubbleButton
                            backgroundColor={selectedColor}
                            onPress={() => {
                              toggleVisibility("calendarViewEndDate")
                              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                            }}
                          >
                            <ThemedText
                              colorText={selectedColor && getColorContrastColorByHex(selectedColor)}
                            >
                              {dateTextFormatter(formikProps.values.endDate)}
                            </ThemedText>
                          </BubbleButton>
                        </ThemedView>
                        <AccordionContainer isVisible={getVisibility("calendarViewEndDate")}>
                          <ThemedView
                            darkColor={theme.colors.black.lighter}
                            lightColor={theme.colors.white.lighter}
                            style={[styles.contentContainerlight, { padding: 0 }]}
                          >
                            <Calendar
                              onDayPress={(day) => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                                formikProps.setFieldValue("endDate", day.dateString)
                              }}
                              currentColor={selectedColor}
                              selectedDate={String(formikProps.values.endDate)}
                            />
                          </ThemedView>
                        </AccordionContainer>
                      </Animated.View>
                    )}
                  </View>
                )}
              </ContentContainer>
              <ContentContainer noPadding>
                <View style={[styles.contentRow]}>
                  <ThemedText style={styles.headingTitle}>Meta</ThemedText>
                  <Switch
                    trackColor={{ false: "#767577", true: selectedColor }}
                    thumbColor={formikProps.values.goal.hasGoal ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={(value) => toggleGoal(value)}
                    value={formikProps.values.goal.hasGoal}
                  />
                </View>

                {formikProps.values.goal.hasGoal && (
                  <ThemedView
                    darkColor={theme.colors.black.lighter}
                    lightColor={theme.colors.white.lighter}
                    style={{ marginBottom: 10 }}
                  >
                    <View style={[styles.insideContentContainer, { paddingBottom: 0 }]}>
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
                    <Pressable
                      style={[styles.fowardActions]}
                      onPress={() => toggleVisibility("goalSelectPicker")}
                    >
                      <ThemedText style={styles.headingTitle}>
                        {formatGoalText(formikProps.values.goal)}
                      </ThemedText>
                      <ThemedMaterialIcons
                        name="arrow-forward-ios"
                        size={20}
                        lightColor={theme.colors.black.base}
                        darkColor={theme.colors.white.base}
                      />
                    </Pressable>

                    <SelectWheelGoal
                      visible={getVisibility("goalSelectPicker")}
                      onClose={() => setVisibility("goalSelectPicker", false)}
                      type={String(formikProps.values.goal.goalType)}
                      selectionColor={selectedColor}
                    />
                  </ThemedView>
                )}
              </ContentContainer>
              <JsonViewer jsonString={formikProps.values}></JsonViewer>
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
  selectIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 60,
    width: 60,
    borderRadius: theme.radius.radius8,
  },
  headingTitle: {
    fontSize: 20,
    flexGrow: 1,
    height: 45,
    lineHeight: 45,
  },
  contentRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    paddingVertical: theme.spaces.defaultSpace / 2,
    paddingHorizontal: theme.spaces.defaultSpace,
    height: 60,
  },
  contentRowWithDivider: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.black.lighter,
  },
  borderTop: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.black.lighter,
  },
  segmentedControl: {
    height: 50,
  },
  contentContainerlight: {
    marginBottom: 8,
    padding: theme.spaces.defaultSpace,
  },
  insideContentContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: 4,
    paddingVertical: theme.spaces.defaultSpace,
    paddingHorizontal: theme.spaces.defaultSpace,
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
