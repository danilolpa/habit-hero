import { StyleSheet, FlatList, ViewStyle } from "react-native"
import { categories as COLORS } from "@/utils/testData/habitsData"
import { ThemedView } from "./Utils/Themed"
import { theme } from "@/Theme"

type ColorPickerProps = {
  item: { color: string }
  style?: ViewStyle
  index: number
}

const renderItem = ({ item, index }: ColorPickerProps) => (
  <ThemedView
    style={[
      { backgroundColor: item.color },
      index === 0 && styles.firstItem,
      index === COLORS.length - 1 && styles.lastItem,
      index === 3 && styles.colorSelected,
      styles.colorItem,
    ]}
  />
)

export default function ColorPicker() {
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
  },
  colorItem: {
    height: 37,
    width: 37,
    borderRadius: 100,
    justifyContent: "center",
    display: "flex",
    marginHorizontal: 4,
  },
  firstItem: {
    marginLeft: theme.spaces.defaultSpace,
  },
  lastItem: {
    marginRight: theme.spaces.defaultSpace,
  },
  colorSelected: {
    borderWidth: 3,
    borderColor: theme.colors.black.base,
  },
})
