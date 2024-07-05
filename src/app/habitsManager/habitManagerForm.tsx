import React, { useRef, forwardRef, useImperativeHandle, useEffect } from "react"
import { View, StyleSheet, ScrollView, Text } from "react-native"
import { Formik, FormikHelpers, FormikProps } from "formik"
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
      Alert.Show({ text: error.errors[0], title: "Atenção" })
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
    <ScrollView>
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
              <ContentContainer verticalMargin>
                <ColorPicker initialColor={formikProps.values.color} />
              </ContentContainer>
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
    marginTop: 20,
    marginBottom: 60,
    borderColor: theme.colors.white.base,
    maxWidth: "100%",
    width: "100%",
    paddingHorizontal: theme.spaces.defaultSpace,
    gap: 4,
    display: "flex",
  },
})
