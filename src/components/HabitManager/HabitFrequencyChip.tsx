import { View, Text, StyleSheet, Pressable } from "react-native"
import { ThemedText, ThemedView } from "@/components/Utils/Themed"
import React, { useEffect, useState } from "react"
import { getColorContrastColorByHex, theme } from "@/Theme"
import { getFormattedDate } from "@/utils/dateHelpers"
import * as Haptics from "expo-haptics"

import { useFormikContext } from "formik"
import APP_CONSTANTS from "@/constants/AppConstants"

type contentData = {
  cod: number
  title: string
}

type HabitFrequencyChipProps = {
  data: contentData[]
  initialSelected?: number[] | number
  selectedColor?: string
  multiSelection?: boolean
  multiline?: boolean
  frequency: string
}

interface FormValues {
  frequencySchedule: []
}

const HabitFrequencyChip = ({
  data,
  initialSelected = 0,
  selectedColor = theme.colors.primary.base,
  multiSelection = false,
  multiline = false,
  frequency,
}: HabitFrequencyChipProps) => {
  const [selected, setSelected] = useState<number | number[]>(initialSelected)
  const [contrastColor, setContrastColor] = useState(getColorContrastColorByHex(selectedColor))
  const { setFieldValue } = useFormikContext<FormValues>()

  if (!data) {
    throw new Error("The 'data' prop is required and must be a non-empty array.")
  }

  if (!initialSelected) {
    throw new Error("The 'initialSelected' prop is required and must be a non-empty.")
  }

  useEffect(() => {
    if (multiSelection) {
      setSelected(initialSelected)
    } else {
      if (initialSelected) {
        setSelected(initialSelected)
      }
    }
  }, [initialSelected])

  const handleSelected = (cod: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    if (multiSelection) {
      if (Array.isArray(selected) && selected.includes(cod)) {
        // Verificar se há mais de um item no array antes de remover
        if (selected.length > 1) {
          setSelected(selected.filter((i) => i !== cod))
        }
      } else {
        Array.isArray(selected) && setSelected([...selected, cod].sort((a, b) => a - b))
      }
    } else {
      setSelected(cod)
    }
  }
  useEffect(() => {
    setContrastColor(getColorContrastColorByHex(selectedColor))
  }, [selectedColor])

  useEffect(() => {
    if (frequency === APP_CONSTANTS.HABIT.FREQUENCY.WEEKLY) {
      setFieldValue("frequencySchedule.weekly", selected)
    } else if (frequency === APP_CONSTANTS.HABIT.FREQUENCY.MONTHLY) {
      setFieldValue("frequencySchedule.monthly", selected)
    } else if (frequency === APP_CONSTANTS.HABIT.FREQUENCY.DAILY) {
      setFieldValue("frequencySchedule.daily", selected)
    }
  }, [selected])

  return (
    <ThemedView
      style={[styles.roundedOptionsContainer, multiline && styles.roundedOptionsContainerMultiline]}
    >
      {data.map((item) => {
        return (
          <Pressable
            key={item.cod}
            style={[
              styles.roundedOptionsAction,
              multiline && styles.roundedOptionsActionMultiline,
              Number(getFormattedDate("dd")) === item.cod && styles.isToday,
              Array.isArray(selected) &&
                selected.includes(item.cod) && { backgroundColor: selectedColor },
              item.cod === selected && { backgroundColor: selectedColor },
            ]}
            onPress={() => handleSelected(item.cod)}
          >
            <ThemedText
              fontWeight="light"
              style={[
                styles.roundedOptionsActionText,
                Array.isArray(selected) && selected.includes(item.cod) && { color: contrastColor },
                item.cod === selected && { color: contrastColor },
              ]}
            >
              {item.title}
            </ThemedText>
          </Pressable>
        )
      })}
    </ThemedView>
  )
}

export const styles = StyleSheet.create({
  roundedOptionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: theme.spaces.defaultSpace,
    flexWrap: "wrap",
    gap: 5,
  },
  roundedOptionsContainerMultiline: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "flex-space",
    width: "100%",
    gap: 5,
  },
  roundedOptionsActionMultiline: {
    backgroundColor: "transparent",
  },
  roundedOptionsAction: {
    height: 40,
    width: 40,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  roundedOptionsActionText: {
    textAlign: "center",
  },
  isToday: {
    backgroundColor: "rgba(0,0,0, 0.2)",
  },
})

export { HabitFrequencyChip }
