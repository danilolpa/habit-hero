import { StyleSheet, FlatList, ViewStyle, Pressable, Text } from "react-native"
import { categories as COLORS } from "@/utils/testData/habitsData"
import { ThemedView } from "./Utils/Themed"
import { theme } from "@/Theme"
import { useState } from "react"
import { FontAwesome6 } from "@expo/vector-icons"
import * as Haptics from "expo-haptics"

type ColorPickerProps = {
  item: { color: string }
  style?: ViewStyle
  index: number
}

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState("")

  const handleSelectColor = (color: string) => {
    setSelectedColor(color)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  const renderItem = ({ item, index }: ColorPickerProps) => {
    const showSelected = selectedColor === item.color

    return (
      <ThemedView
        style={[
          { backgroundColor: item.color },
          index === 0 && styles.firstItem,
          index === COLORS.length - 1 && styles.lastItem,
          styles.colorItem,
        ]}
      >
        <Pressable onPress={() => handleSelectColor(item.color)}>
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
