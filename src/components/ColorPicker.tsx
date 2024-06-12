import { StyleSheet, FlatList, ViewStyle, Pressable, Text } from "react-native"
import { COLORS } from "@/utils/testData/habitsData"
import { ThemedView } from "./Utils/Themed"
import { theme } from "@/Theme"
import { useEffect, useState } from "react"
import { FontAwesome6 } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"
import { useHabitManagerContext } from "@/app/habitsManager/habitManagerContext"
import { useFormikContext } from "formik"

type ColorPickerProps = {
  initialColor?: string
}

type ColorPickerItemsProps = {
  item: { hex: string }
  style?: ViewStyle
  index: number
}

interface FormValues {
  color: string
}

export default function ColorPicker({
  initialColor = theme.colors.primary.base,
}: ColorPickerProps) {
  const { values, setFieldValue } = useFormikContext<FormValues>()
  const [selectedColor, setSelectedColor] = useState(initialColor)

  useEffect(() => {
    if (selectedColor !== values.color) {
      setFieldValue("color", selectedColor)
    }
  }, [selectedColor])

  const handleSelectColor = (color: string) => {
    setSelectedColor(color)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  const renderItem = ({ item, index }: ColorPickerItemsProps) => {
    const showSelected = selectedColor === item.hex
    return (
      <ThemedView
        style={[
          { backgroundColor: item.hex },
          index === 0 && styles.firstItem,
          index === COLORS.length - 1 && styles.lastItem,
          styles.colorItem,
        ]}
      >
        <Pressable onPress={() => handleSelectColor(item.hex)}>
          <ThemedView style={[styles.colorItem, showSelected && styles.colorSelected]}>
            {showSelected && (
              <FontAwesome6 name="check" size={15} color={theme.colors.black.light} />
            )}
          </ThemedView>
        </Pressable>
      </ThemedView>
    )
  }

  return (
    <FlatList
      data={COLORS}
      renderItem={renderItem}
      horizontal={true}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 4,
    paddingVertical: 4,
  },
  colorItem: {
    height: 37,
    width: 37,
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
    position: "absolute",
    top: -21,
    left: -3,
    borderWidth: 3,
    borderColor: theme.colors.black.dark,
    marginHorizontal: 0,
    height: 42,
    width: 42,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})
