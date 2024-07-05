import React from "react"
import { View, StyleSheet, ScrollView, Text } from "react-native"
import { Formik, FormikProps } from "formik"
import * as Yup from "yup"

import { ThemedView } from "@/components/Utils/Themed"
import { getColorHexByName, theme } from "@/Theme"
import ColorPicker from "@/components/HabitManager/HabitColorPicker"
import { useHabitManagerContext, HabitsType } from "@/components/HabitManager/habitManagerContext"
import ContentContainer from "@/components/ContentContainer"
import JsonViewer from "@/components/Utils/JsonView"
import HabitPeriodSelector from "@/components/HabitManager/HabitPeriodSelector"
import HabitReminderSelector from "@/components/HabitManager/HabitReminderSelector"
import { useAlert } from "@/hooks/useAlert"
import HabitGoalSelector from "@/components/HabitManager/HabitGoalSelector"
import HabitFrequencySelectors from "@/components/HabitManager/HabitFrequencySelectors"
import HabitFields from "@/components/HabitManager/HabitFields"
import { BubblePressable } from "@/components/Buttons/BubblePressable"
import HabitIconSelector from "@/components/HabitManager/HabitIconSelector"

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required(
      "Nome do hábito deve ser preenchido e fique atendo a quantidade de caracteres de no máximo 50.",
    )
    .max(50, "Nome do hábito deve ter no máximo 50 caracteres.")
    .min(3, "Nome do hábito muito curto, deve ter pelo menos 3 caracteres."),
})

interface HabitManagerFormProps {
  formikRef: React.Ref<FormikProps<HabitsType>>
}

export const HabitManagerForm = (props: HabitManagerFormProps) => {
  const { Alert } = useAlert()
  const { saveHabitService, habitData, setLoading, loading } = useHabitManagerContext()
  const { formikRef } = props

  const validateData = async (data: HabitsType) => {
    try {
      await validationSchema.validate(data, { abortEarly: false })
      return true
    } catch (error: any) {
      Alert.Show({ text: error.errors[0], title: "Aviso!" })
      return false
    }
  }

  const prepareToSubmit = (values: any) => {
    validateData(values).then((isValid) => {
      if (isValid) {
        saveHabitService(values)
      } else {
        // throw error
        setTimeout(() => {
          setLoading(false)
        }, 5000)
      }
    })
  }

  return (
    <ScrollView style={{ width: "100%" }}>
      <Formik
        initialValues={habitData}
        onSubmit={(values: HabitsType) => {
          setLoading(true)
          prepareToSubmit(values)
        }}
        innerRef={formikRef}
      >
        {(formikProps: FormikProps<HabitsType>) => {
          const { handleSubmit, values } = formikProps
          const selectedColor = formikProps.values.color
            ? getColorHexByName(formikProps.values.color)
            : theme.colors.primary.base

          return (
            <ThemedView style={styles.container}>
              {loading && <Text>Carregando...</Text>}
              <HabitFields color={selectedColor} />
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                  width: "100%",
                }}
              >
                <View
                  style={{
                    width: 70,
                  }}
                >
                  <HabitIconSelector color={selectedColor} />
                </View>
                <View
                  style={{
                    flexShrink: 1,
                  }}
                >
                  <ColorPicker initialColor={formikProps.values.color} />
                </View>
              </View>
              <ContentContainer>
                <HabitFrequencySelectors color={selectedColor} />
              </ContentContainer>

              <ContentContainer>
                <HabitGoalSelector color={selectedColor} />
              </ContentContainer>
              <ContentContainer>
                <HabitPeriodSelector color={selectedColor} />
                <HabitReminderSelector color={selectedColor} />
              </ContentContainer>

              <View style={{ marginVertical: 10, paddingHorizontal: 40 }}>
                <BubblePressable.Button
                  onPress={() => handleSubmit()}
                  title={loading ? "Salvando hábito..." : "Salvar novo hábito"}
                  disabled={loading}
                  color={selectedColor}
                />
              </View>
              <JsonViewer jsonString={values}></JsonViewer>
            </ThemedView>
          )
        }}
      </Formik>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 60,
    borderColor: theme.colors.white.base,
    maxWidth: "100%",
    width: "100%",
    paddingHorizontal: theme.spaces.defaultSpace,
    gap: 4,
    display: "flex",
  },
})
