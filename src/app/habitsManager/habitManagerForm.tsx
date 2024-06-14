import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react"
import { View, StyleSheet, Pressable, Switch, ScrollView, Text } from "react-native"
import { Formik, FormikProps } from "formik"
import * as Yup from "yup"

import {
  ThemedFontAwesome,
  ThemedText,
  ThemedView,
  ThemedSegmentedControl,
} from "@/components/Utils/Themed"
import { Input } from "@/components/Input"
import { getColorContrastColorByHex, getColorHexByName, theme } from "@/Theme"
import ColorPicker from "@/components/ColorPicker"
import { useHabitManagerContext, HabitsType } from "./habitManagerContext"
import ContentContainer from "@/components/ContentContainer"
import { RoundedButtons } from "@/components/RoundedButtons"
import {
  HABIT_DAYS,
  HABIT_WEEK_FREQUENCY_NUMBERS,
  DAYS_LIST_OF_MONTH,
  FREQUENCY_LABELS,
} from "@/utils/testData/habitsData"
import { getFrequenciesByIndex, getFrequenciesByLabel } from "@/utils/useFrequency"
import FontAwesome6 from "@expo/vector-icons/build/FontAwesome6"
import JsonViewer from "@/components/Utils/JsonView"
import Tag from "@/components/Tags"
import { MaterialIcons } from "@expo/vector-icons"
import APP_CONSTANTS from "@/constants/AppConstants"
import { getDaysOfWeek, isTodayDate, getFormattedDate } from "@/utils/useCalendar"
import { Calendar } from "@/components/Calendar"

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

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      if (formikRef.current) {
        formikRef.current.submitForm()
      }
    },
  }))

  const constructFrequencyText = (props: any) => {
    const {
      frequency,
      frequencySchedule: { daily, weekly, monthly },
    } = props

    if (frequency === APP_CONSTANTS.HABIT.FREQUENCY.DAILY) {
      return daily.length === 7 ? "Todos os dias" : getDaysOfWeek(daily)
    } else if (frequency === APP_CONSTANTS.HABIT.FREQUENCY.WEEKLY) {
      return weekly + (weekly > 1 ? " vezes por semana" : " vez por semana")
    } else if (frequency === APP_CONSTANTS.HABIT.FREQUENCY.MONTHLY) {
      if (monthly.length === 0) {
        return "Escolha um ou vários dias no mes"
      } else if (monthly.length === 1) {
        return "No mês todo dia: " + monthly[0]
      } else if (monthly.length === 2) {
        return "No mês todos os dias: " + monthly.join(" e ")
      } else {
        return (
          "No mês todos os dias: " +
          monthly.slice(0, -1).join(", ") +
          " e " +
          monthly[monthly.length - 1]
        )
      }
    }
  }

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
          return (
            <ThemedView style={styles.container}>
              {loading && <Text>Carregando...</Text>}
              {error && <Text>Erro: {error}</Text>}
              <View style={styles.containerFlexRow}>
                <Input.Field
                  placeholder="Name"
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
                <ThemedView
                  style={styles.selectIconContainer}
                  darkColor={theme.colors.black.light}
                  lightColor={theme.colors.white.light}
                >
                  <Pressable>
                    <MaterialIcons name={formikProps.values.icon} size={24} color={selectedColor} />
                  </Pressable>
                </ThemedView>
              </View>
              <Input.Field
                placeholder="Description"
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
                <ThemedText
                  style={[{ marginHorizontal: theme.spaces.defaultSpace }, styles.headingTitle]}
                >
                  Escolha uma cor
                </ThemedText>
                <ColorPicker initialColor={formikProps.values.color} />
              </ContentContainer>
              <ContentContainer noPadding>
                <ThemedView style={styles.contentWithDivider}>
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
                  <ThemedView style={styles.contentWithDivider}>
                    <ThemedText style={styles.headingTitle}>Fazer uma vez</ThemedText>
                    <Tag
                      name={
                        isTodayDate(formikProps.values.singleDate?.dateString)
                          ? "Hoje"
                          : getFormattedDate(
                              "dd 'de' MMM",
                              formikProps.values.singleDate.dateString,
                            )
                      }
                      color={selectedColor}
                      textColor={selectedColor && getColorContrastColorByHex(selectedColor)}
                    />
                  </ThemedView>
                )}
                {!formikProps.values.repeat && (
                  <Calendar
                    onDayPress={(day) => {
                      formikProps.setFieldValue("singleDate", day)
                      console.log(day)
                    }}
                    current={formikProps.values.singleDate?.dateString}
                    currentColor={selectedColor}
                    enableSwipeMonths
                  />
                )}
                {formikProps.values.repeat && (
                  <View>
                    <ThemedView style={styles.contentWithDivider}>
                      <ThemedText
                        ellipsizeMode="tail"
                        style={[styles.headingTitle]}
                        numberOfLines={1}
                      >
                        {constructFrequencyText(formikProps.values)}
                      </ThemedText>
                      {/* <ThemedFontAwesome
                        name="chevron-down"
                        darkColor={theme.colors.white.base}
                        lightColor={theme.colors.black.base}
                        size={18}
                        style={{ height: 30, width: 30 }}
                      /> */}
                    </ThemedView>

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
                          fontSize: 16,
                          fontFamily: theme.font.familyDefault.regular,
                        }}
                        activeFontStyle={{
                          color: selectedColor && getColorContrastColorByHex(selectedColor),
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
                  </View>
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
    // maxWidth: "100%",
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
  contentWithDivider: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    paddingVertical: theme.spaces.defaultSpace / 2,
    borderBottomColor: theme.colors.black.lighter,
    borderBottomWidth: 1,
    paddingHorizontal: theme.spaces.defaultSpace,
  },
  segmentedControl: {
    height: 50,
  },
  contentContainerlight: {
    marginBottom: 8,
    padding: theme.spaces.defaultSpace,
  },
})
