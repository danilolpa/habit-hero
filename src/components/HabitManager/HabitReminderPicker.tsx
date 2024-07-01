import { View, StyleSheet, Alert, Text, Pressable } from "react-native"
import { useEffect, useState } from "react"
import { useFormikContext } from "formik"
import { Picker } from "@react-native-picker/picker"

import BottomDrawer from "@/components/BottomDrawer"
import Warning from "@/components/Warning"
import { generateTimeRange, getNextHour } from "@/utils/dateHelpers"
import { ThemedText } from "@/components/Utils/Themed"
import { theme } from "@/Theme"
import { HabitsType } from "@/app/habitsManager/habitManagerContext"
import { BubblePressable } from "@/components/Buttons/BubblePressable"
import ContentFlexRow from "../ContentFlexRow"

interface FormValues {
  reminderTimes: HabitsType["reminderTimes"]
}

interface HabitReminderPickerProps {
  color?: string
  edit?: string
  onEdit?: () => void
}

export default function HabitReminderPicker(props: HabitReminderPickerProps) {
  const [visible, setVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState({ hour: getNextHour(1, "HH"), minute: "00" })
  const [warning, setWarning] = useState(false)
  const [selectedDateString, setSelectedDateString] = useState("")
  const { values, setFieldValue } = useFormikContext<FormValues>()

  const hours = generateTimeRange("hours")
  const minutes = generateTimeRange("minutes")
  const { reminderTimes } = values
  const { color, edit, onEdit } = props

  const validateTime = (time: string) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/
    return regex.test(time)
  }

  useEffect(() => {
    setSelectedDateString(`${selectedDate.hour}:${selectedDate.minute}`)
    handleWarning()
  }, [selectedDate, selectedDateString])

  useEffect(() => {
    console.log("HandleEdit", edit)
    if (edit) {
      setVisible(true)
      setSelectedDate({ hour: edit.split(":")[0], minute: edit.split(":")[1] })
      onEdit
    }
  }, [edit])

  const handleSaveTime = () => {
    if (validateTime(selectedDateString)) {
      if (reminderTimes?.some((time) => time === selectedDateString)) {
        setWarning(true)
      } else {
        setWarning(false)
        setFieldValue(
          "reminderTimes",
          [...(reminderTimes || []), String(selectedDateString)].sort((a, b) => a.localeCompare(b)),
        )
        setVisible(false)
      }
    } else {
      Alert.alert(
        "Atenção",
        "Horário inválido, por favor escolha outro ou tente novamente, se o problema persistir, entre em contato com o suporte.",
      )
    }
  }

  const handleWarning = () => {
    if (reminderTimes?.some((time) => time === selectedDateString)) {
      setWarning(true)
    } else {
      setWarning(false)
    }
  }

  const renderWarning = () => {
    return (
      <Warning style={styles.warn}>
        O horário de notificação{" "}
        <ThemedText fontWeight="bold">{`${selectedDate.hour}:${selectedDate.minute}`} </ThemedText>
        já foi criado. Por favor escolha outro.
      </Warning>
    )
  }
  const renderPicker = () => {
    return (
      <View style={styles.pickerContainer}>
        <View style={styles.picker}>
          <Picker
            onValueChange={(value) => setSelectedDate({ ...selectedDate, hour: value })}
            selectedValue={selectedDate.hour}
          >
            {hours.map((hour) => (
              <Picker.Item
                label={String(hour + "h")}
                value={hour}
                key={hour}
                color={theme.colors.white.base}
              />
            ))}
          </Picker>
        </View>
        <View style={styles.divider}>
          <ThemedText>:</ThemedText>
        </View>
        <View style={styles.picker}>
          <Picker
            onValueChange={(value) => setSelectedDate({ ...selectedDate, minute: value })}
            selectedValue={selectedDate.minute}
          >
            {minutes.map((minute) => (
              <Picker.Item
                label={String(minute + " min")}
                value={minute}
                key={minute}
                color={theme.colors.white.base}
              />
            ))}
          </Picker>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {/* <View style={styles.buttonContainer}>
        <BubblePressable.Button
          title="Novo Horário"
          onPress={() => setVisible(true)}
          color={color}
          rightIcon="arrow-forward-ios"
        />
      </View> */}

      <ContentFlexRow
        text="Adicionar Novo Horário"
        iconIndicator="arrow-forward-ios"
        iconSize={16}
        onPress={() => setVisible(true)}
        separatorPosition="bottom"
        separatorColor={theme.colors.black.lightest}
      />
      <BottomDrawer
        visible={visible}
        onClose={() => setVisible(false)}
        rightButtonOnPress={() => handleSaveTime()}
        rightButtonText="Salvar"
        color={color}
      >
        {warning && renderWarning()}
        {visible && renderPicker()}
      </BottomDrawer>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {},
  pickerContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  picker: {
    flexGrow: 1,
  },
  divider: {
    width: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  warn: {
    marginTop: 20,
  },
  buttonContainer: {
    margin: theme.spaces.defaultSpace,
    marginBottom: 0,
  },
})
