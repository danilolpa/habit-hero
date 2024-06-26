import { Picker } from "@react-native-picker/picker"
import { useEffect, useState } from "react"
import { View, Text, StyleSheet, Alert } from "react-native"
import { ThemedView } from "../Utils/Themed"
import { capitalizeFirstLetter } from "@/utils/textHelpers"
import { theme } from "@/Theme"
import { useFormikContext } from "formik"
import BottomDrawer from "../BottomDrawer"
import APP_CONSTANTS from "@/constants/AppConstants"

interface dataProps {
  label?: String[] | number[] | string
  value: String[] | number[] | string
  type: string
  prefix?: string
  sufix?: string
  title?: string
  keyValue: string
}
interface SelectWheelGoalProps {
  selectionColor?: string
  type?: string
  title?: string
  visible: boolean
  onClose: () => void
}

interface FormValues {
  goal: {
    goalType: string
    goalDetails: { [key: string]: string | number }
  }
}

const SelectWheelGoal: React.FC<SelectWheelGoalProps> = (props) => {
  const { selectionColor, title = "", visible, onClose, type } = props
  const data =
    type === "BY_UNITS"
      ? APP_CONSTANTS.HABIT.GOAL.GOAL_WHEEL_PICKER.UNITS
      : APP_CONSTANTS.HABIT.GOAL.GOAL_WHEEL_PICKER.TIME

  const { values, setFieldValue } = useFormikContext<FormValues>()
  const initialValues =
    values.goal.goalDetails || APP_CONSTANTS.HABIT.GOAL.GOAL_DETAILS_INITIAL_VALUES

  const [selectedValues, setSelectedValues] = useState(initialValues)

  const generateRange = (start: number, end: number) => {
    const result = []
    for (let i = start; i <= end; i++) {
      result.push(i)
    }
    return result
  }

  const renderPickerItem = (item: any) => {
    const { type, prefix, value, label, sufix } = item

    if (type !== "RANGE" && type !== "TEXT") {
      throw new Error("renderPickerItem has an invalid value 'type' must be 'RANGE' or 'TEXT'")
    }

    const formatLabel = (value: number) => {
      if (prefix) {
        return `${prefix} ${value}`
      }
      if (sufix) {
        return `${value}${sufix}`
      }
      return value
    }

    const renderRangeItems = (start: number, end: number) => {
      const values = generateRange(start, end)
      return values.map((value) => (
        <Picker.Item label={String(formatLabel(value))} value={Number(value)} key={value} />
      ))
    }

    const renderTextItems = (labels: any[]) => {
      return labels.map((label, key) => (
        <Picker.Item label={capitalizeFirstLetter(label)} value={value[key]} key={value} />
      ))
    }

    switch (type) {
      case "RANGE":
        return renderRangeItems(value[0], value[1])
      case "TEXT":
        return renderTextItems(label)
      default:
        return "Invalid type"
    }
  }

  const handleSelectedValue = (itemValue: string | number, item: any) => {
    if (item.keyValue) {
      const parsedValue = isNaN(Number(itemValue)) ? itemValue : Number(itemValue)
      setSelectedValues({
        ...selectedValues,
        [item.keyValue]: parsedValue,
      })
      return
    }
  }
  useEffect(() => {}, [initialValues])

  const handleSave = () => {
    if (Object.keys(selectedValues).length === 0) {
      Alert.alert(
        "Error",
        "You must select at least one value",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false },
      )
      return
    } else {
      setFieldValue("goal.goalDetails", selectedValues)
      onClose
    }
  }

  return (
    <BottomDrawer
      rightButton
      color={selectionColor}
      rightButtonOnPress={() => handleSave()}
      visible={visible}
      onClose={onClose}
    >
      <ThemedView style={styles.container}>
        {data &&
          data.map((item, index) => {
            if (!item) {
              return null
            }

            return (
              <Picker
                selectedValue={selectedValues[item.keyValue]}
                onValueChange={(itemValue) => handleSelectedValue(itemValue, item)}
                key={index}
                style={styles.pickerContainer}
                selectionColor={selectionColor}
                dropdownIconRippleColor={selectionColor}
                dropdownIconColor={theme.colors.white.base}
                itemStyle={{ color: theme.colors.white.base }}
                prompt={title}
              >
                {renderPickerItem(item)}
              </Picker>
            )
          })}
      </ThemedView>
    </BottomDrawer>
  )
}

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  pickerContainer: {
    width: 100,
    flexGrow: 1,
  },
})

export default SelectWheelGoal
