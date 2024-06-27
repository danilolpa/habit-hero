import { StyleSheet, Pressable, Platform } from "react-native"
import { ThemedView } from "./Utils/Themed"
import { MaterialIcons } from "@expo/vector-icons"
import APP_CONSTANTS from "@/constants/AppConstants"
import React, { useMemo, useState } from "react"
import { useFormikContext } from "formik"
import BottomDrawer from "./BottomDrawer"
import { theme } from "@/Theme"

type iconNames = typeof MaterialIcons.glyphMap
interface iconModalProps {
  isVisible: boolean
  onClose: () => void
  selectedColor: string
  habitIconActual: string
}

export default function IconsHabitModal(props: iconModalProps) {
  const { isVisible, onClose, selectedColor, habitIconActual } = props
  const { setFieldValue } = useFormikContext<iconNames>()
  const [selectedIcon, setSelectedIcon] = useState(habitIconActual)

  const selectIcon = (icon: iconNames) => {
    setSelectedIcon(icon as any)
  }
  function handleSave() {
    setFieldValue("icon", selectedIcon)
    onClose
  }

  function getRandomColor() {
    const habitColors = theme.habitColors
    const randomIndex = Math.floor(Math.random() * habitColors.length)
    return habitColors[randomIndex].hex
  }

  const iconColors = useMemo(() => {
    return APP_CONSTANTS.HABIT.HABIT_ICONS.reduce((acc, { name }) => {
      acc[name] = getRandomColor()
      return acc
    }, {} as Record<string, string>)
  }, [])

  return (
    <ThemedView>
      <BottomDrawer
        rightButton
        color={selectedColor}
        rightButtonOnPress={() => handleSave()}
        visible={isVisible}
        onClose={onClose}
      >
        <ThemedView style={styles.iconsContainer}>
          {APP_CONSTANTS.HABIT.HABIT_ICONS.map(({ name, key }) => {
            const initialSelected = name === habitIconActual
            const iconSelected = name === selectedIcon
            const iconColor = iconSelected ? theme.colors.white.base : iconColors[name as any]
            return (
              <Pressable
                key={key}
                style={[
                  styles.iconBox,
                  initialSelected && styles.iconBoxInitial,
                  iconSelected && { backgroundColor: selectedColor },
                ]}
                onPress={() => selectIcon(name as any)}
              >
                <MaterialIcons name={name as any} size={40} color={iconColor} />
              </Pressable>
            )
          })}
        </ThemedView>
      </BottomDrawer>
    </ThemedView>
  )
}

export const styles = StyleSheet.create({
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    gap: 4,
    paddingVertical: theme.spaces.defaultSpace,
  },
  iconBox: {
    width: 55,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    height: 55,
  },
  iconBoxInitial: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  blurContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    top: "5%",
    borderTopLeftRadius: theme.radius.radius20,
    borderTopRightRadius: theme.radius.radius20,
  },
})
