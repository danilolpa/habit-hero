import React, { useState, useRef, forwardRef, useImperativeHandle } from "react"
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
} from "@/utils/testData/habitsData"
import { getFrequenciesByIndex } from "@/utils/useFrequency"
import FontAwesome6 from "@expo/vector-icons/build/FontAwesome6"
import JsonViewer from "@/components/Utils/JsonView"
import Tag from "@/components/Tags"
import { MaterialIcons } from "@expo/vector-icons"

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
})

interface HabitManagerFormProps {
  submitForm: () => void
}

export const HabitManagerForm = forwardRef<HabitManagerFormProps>((props, ref) => {
  const { submitForm, loading, error, habitData } = useHabitManagerContext()
  const [frequency, setFrequency] = React.useState({ index: 0, label: "weekly" })
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
      console.log(frequency)
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
        {(formikProps: FormikProps<HabitsType>) => {
          const selectedColor = formikProps.values.color
            ? getColorHexByName(formikProps.values.color)
            : theme.colors.primary.base

          const toggleRepeat = (value: boolean) => {
            formikProps.setFieldValue("repeat", value)
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
                  fontSize={10}
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
                      name="Hoje"
                      color={selectedColor}
                      textColor={selectedColor && getColorContrastColorByHex(selectedColor)}
                    />
                  </ThemedView>
                )}
                {formikProps.values.repeat && (
                  <View>
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
                        tintColor={selectedColor}
                        fontStyle={{
                          fontSize: 16,
                          fontFamily: theme.font.familyDefault.regular,
                        }}
                        activeFontStyle={{
                          color: selectedColor && getColorContrastColorByHex(selectedColor),
                        }}
                      />
                      {frequency.label === "daily" && (
                        <RoundedButtons
                          data={HABIT_DAYS}
                          initialSelected={habitData.frequencySchedule.weekly}
                          selectedColor={selectedColor}
                          multiSelection
                          textColor={selectedColor}
                        />
                      )}
                      {frequency.label === "weekly" && (
                        <RoundedButtons
                          data={HABIT_WEEK_FREQUENCY_NUMBERS}
                          initialSelected={[1]}
                          selectedColor={selectedColor}
                        />
                      )}
                      {frequency.label === "monthly" && (
                        <RoundedButtons
                          data={DAYS_LIST_OF_MONTH}
                          initialSelected={habitData.frequencySchedule.monthly}
                          selectedColor={selectedColor}
                          multiline
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
