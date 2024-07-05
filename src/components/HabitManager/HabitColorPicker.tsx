import { StyleSheet, FlatList, ViewStyle, Pressable, Text } from "react-native"
import { ThemedView } from "@/components/Utils/Themed"
import { HabitColorNameType, getColorHexByName, theme, HabitColorType } from "@/Theme"
import { useEffect, useState } from "react"
import { FontAwesome6 } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import { useHabitManagerContext } from "@/components/HabitManager/habitManagerContext"
import { useFormikContext } from "formik"
import ContentContainer from "../ContentContainer"
import { BounceIn, BounceOut, FlipInEasyX, FlipOutEasyX } from "react-native-reanimated"

type ColorPickerProps = {
  initialColor?: string
}

type ColorPickerItemsProps = {
  item: { hex: string; name: string }
  style?: ViewStyle
  index: number
}

interface FormValues {
  color: HabitColorNameType
}

export default function ColorPicker({
  initialColor = theme.colors.primary.base,
}: ColorPickerProps) {
  const { values, setFieldValue } = useFormikContext<FormValues>()
  const { colorHabit, setColorHabit } = useHabitManagerContext()

  useEffect(() => {
    if (colorHabit !== values.color) {
      setFieldValue("color", colorHabit)
    }
  }, [colorHabit])

  const handleSelectColor = (colorName: HabitColorNameType) => {
    setColorHabit(colorName)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  const renderItem = ({ item, index }: { item: HabitColorType; index: number }) => {
    const showSelected = getColorHexByName(colorHabit) === item.hex
    return (
      <ThemedView
        style={[
          { backgroundColor: item.hex },
          index === 0 && styles.firstItem,
          index === theme.habitColors.length - 1 && styles.lastItem,
          styles.colorItem,
        ]}
      >
        <Pressable onPress={() => handleSelectColor(item.name)}>
          <ThemedView style={[styles.colorItem]}>
            {showSelected && (
              <ThemedView
                entering={FlipInEasyX.duration(300)}
                exiting={FlipOutEasyX.duration(200)}
                animated
                style={styles.colorSelected}
              >
                <FontAwesome6 name="check" size={20} color={theme.colors.black.light} />
              </ThemedView>
            )}
          </ThemedView>
        </Pressable>
      </ThemedView>
    )
  }

  const initialIndex = function () {
    let actualIndex = theme.habitColors.findIndex(
      (color) => color.hex === getColorHexByName(initialColor),
    )

    return actualIndex >= 5 ? actualIndex : 0
  }
  return (
    <ContentContainer style={styles.container}>
      <FlatList
        data={theme.habitColors}
        renderItem={renderItem}
        horizontal={true}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex()}
        getItemLayout={(data, index) => ({ length: 45, offset: 60 * index, index })}
      />
    </ContentContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    width: "100%",
    flexShrink: 1,
  },
  colorItem: {
    height: 42,
    width: 42,
    borderRadius: 100,
    justifyContent: "center",
    display: "flex",
    marginHorizontal: 4,
    position: "relative",
  },
  firstItem: {
    marginLeft: theme.spaces.defaultSpace,
  },
  lastItem: {
    marginRight: theme.spaces.defaultSpace,
  },
  colorSelected: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    left: -4,
  },
})
