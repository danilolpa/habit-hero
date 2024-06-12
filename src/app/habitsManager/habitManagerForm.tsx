import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react"
import { View, StyleSheet, Pressable, Switch, ScrollView, Button, Text } from "react-native"
import { Formik, FormikProps, useFormikContext } from "formik"
import * as Yup from "yup"

import {
  ThemedFontAwesome,
  ThemedText,
  ThemedView,
  ThemedSegmentedControl,
} from "@/components/Utils/Themed"
import { Input } from "@/components/Input"
import { theme } from "@/Theme"
import ColorPicker from "@/components/ColorPicker"
import { useHabitManagerContext } from "./habitManagerContext"
import ContentContainer from "@/components/ContentContainer"
import { RoundedButtons } from "@/components/RoundedButtons"
import {
  HABIT_DAYS,
  HABIT_WEEK_FREQUENCY_NUMBERS,
  DAYS_LIST_OF_MONTH,
} from "@/utils/testData/habitsData"
import { getFrequenciesByIndex, isFrequency } from "@/utils/useFrequency"
import { getFormattedDate } from "@/utils/useCalendar"

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
})

interface HabitManagerFormProps {
  submitForm: () => void
}

export const HabitManagerForm = forwardRef<HabitManagerFormProps>((props, ref) => {
  const [isGoal, setIsGoalEnabled] = useState(false)
  const toggleSwitch = () => setIsGoalEnabled((previousState) => !previousState)
  const { submitForm, loading, error, habitData, updateHabitData } = useHabitManagerContext()
  const [frequency, setFrequency] = React.useState({ index: 1, label: "weekly" })
  const formikRef = useRef<FormikProps<typeof habitData>>(null)

  useImperativeHandle(ref, () => ({
    submitForm: () => {
      if (formikRef.current) {
        formikRef.current.submitForm()
      }
    },
  }))

  const handleFrequencyChange = ({ nativeEvent }: any) => {
    const frequencyLabel = getFrequenciesByIndex(nativeEvent.selectedSegmentIndex)
    if (frequencyLabel) {
      setFrequency({
        index: nativeEvent.selectedSegmentIndex,
        label: frequencyLabel,
      })
    } else {
      // dispatch error
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
        {(formikProps: FormikProps<typeof habitData>) => {
          let activeColor = theme.colors.primary.base
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
                />
                <ThemedView
                  style={styles.selectIconContainer}
                  darkColor={theme.colors.black.light}
                  lightColor={theme.colors.white.light}
                >
                  <Pressable>
                    <ThemedFontAwesome
                      name="person-biking"
                      size={24}
                      darkColor={theme.colors.primary.base}
                      lightColor={theme.colors.black.base}
                    />
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
              />
              <ContentContainer style={{ paddingHorizontal: 0 }}>
                <ThemedText
                  style={[{ marginHorizontal: theme.spaces.defaultSpace }, styles.headingTitle]}
                  fontSize={10}
                >
                  Escolha uma cor {activeColor}
                </ThemedText>
                <ColorPicker initialColor={formikProps.values.color} />
              </ContentContainer>
              <ContentContainer noPadding>
                <ThemedView style={styles.contentWithDivider}>
                  <ThemedText style={styles.headingTitle}>Repetir</ThemedText>
                  <Switch
                    trackColor={{ false: "#767577", true: formikProps.values.color }}
                    thumbColor={isGoal ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isGoal}
                  />
                </ThemedView>
                <ThemedView style={styles.contentWithDivider}>
                  <ThemedText style={styles.headingTitle}>Diário</ThemedText>
                  <ThemedFontAwesome
                    name="chevron-down"
                    darkColor={theme.colors.white.base}
                    lightColor={theme.colors.black.base}
                    size={18}
                    style={{ height: 30, width: 30 }}
                  />
                </ThemedView>
                <ThemedView
                  darkColor={theme.colors.black.lighter}
                  lightColor={theme.colors.white.lighter}
                  style={styles.contentContainerlight}
                >
                  <ThemedSegmentedControl
                    values={["Diário", "Semanal", "Mensal"]}
                    selectedIndex={frequency.index}
                    onChange={(item) => handleFrequencyChange(item)}
                    style={styles.segmentedControl}
                    tintColor={theme.colors.primary.base}
                    fontStyle={{ fontSize: 16, fontFamily: theme.font.familyDefault.regular }}
                  />
                  {frequency.label === "daily" && (
                    <RoundedButtons
                      data={HABIT_DAYS}
                      initialSelected={habitData.frequencySchedule.weekly}
                      selectedColor={theme.colors.primary.base}
                      multiSelection
                    />
                  )}
                  {frequency.label === "weekly" && (
                    <RoundedButtons
                      data={HABIT_WEEK_FREQUENCY_NUMBERS}
                      initialSelected={[1]}
                      selectedColor={theme.colors.primary.base}
                    />
                  )}
                  {frequency.label === "monthly" && (
                    <RoundedButtons
                      data={DAYS_LIST_OF_MONTH}
                      initialSelected={habitData.frequencySchedule.monthly}
                      selectedColor={theme.colors.primary.base}
                      multiline
                    />
                  )}
                </ThemedView>
              </ContentContainer>
              <ContentContainer noPadding>
                <ThemedView style={styles.contentWithDivider}>
                  <ThemedText style={styles.headingTitle}>Meta</ThemedText>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isGoal ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isGoal}
                  />
                </ThemedView>
                <ThemedView style={styles.contentWithDivider}>
                  <ThemedText style={styles.headingTitle}>Diário</ThemedText>
                  <ThemedFontAwesome
                    name="chevron-down"
                    darkColor={theme.colors.white.base}
                    lightColor={theme.colors.black.base}
                    size={18}
                    style={{ height: 30, width: 30 }}
                  />
                </ThemedView>
              </ContentContainer>
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
  },
  contentWithDivider: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    paddingVertical: theme.spaces.defaultSpace,
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
