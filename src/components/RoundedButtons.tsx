import { View, Text, StyleSheet, Pressable } from "react-native"
import { ThemedText, ThemedView } from "@/components/Utils/Themed"
import React, { useEffect, useState } from "react"
import { getColorContrastColorByHex, getColorHexByName, theme } from "@/Theme"
import * as Haptics from "expo-haptics"

type contentData = {
  cod: number
  title: string
}

type RoundedButtonsProps = {
  data: contentData[]
  initialSelected?: number[]
  selectedColor?: string
  multiSelection?: boolean
  multiline?: boolean
  textColor?: string
}

const RoundedButtons = ({
  data,
  initialSelected = [],
  selectedColor = theme.colors.primary.base,
  textColor = theme.colors.white.base,
  multiSelection = false,
  multiline = false,
}: RoundedButtonsProps) => {
  const [selected, setSelected] = useState<number[]>([])
  const [contrastColor, setContrastColor] = useState(getColorContrastColorByHex(selectedColor))

  useEffect(() => {
    if (initialSelected) {
      setSelected(initialSelected)
    }
  }, [initialSelected])

  if (!data) {
    throw new Error("The 'data' prop is required and must be a non-empty array.")
  }

  const handleSelected = (cod: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    if (multiSelection) {
      if (selected.includes(cod)) {
        setSelected(selected.filter((i) => i !== cod))
      } else {
        setSelected([...selected, cod])
      }
    } else {
      setSelected([cod])
    }
  }

  useEffect(() => {
    setContrastColor(getColorContrastColorByHex(selectedColor))
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
              selected.includes(item.cod) && { backgroundColor: selectedColor },
            ]}
            onPress={() => handleSelected(item.cod)}
          >
            <ThemedText
              fontWeight="light"
              style={[
                styles.roundedOptionsActionText,
                selected.includes(item.cod) && { color: contrastColor },
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
    justifyContent: "flex-start",
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
  roundedOptionsActionSelected: {
    // backgroundColor: "rgba(0,0,0, 0.8)",
  },
})

export { RoundedButtons }
