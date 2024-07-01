import { View, Text, StyleSheet, Alert } from "react-native"
import BottomDrawer from "../BottomDrawer"
import { useEffect, useState } from "react"
import Button from "@/components/Buttons/Buttons"
import { Picker } from "@react-native-picker/picker"
import { generateTimeRange, getFormattedDate, getNextHour } from "@/utils/dateHelpers"
import { ThemedText, ThemedView } from "../Utils/Themed"
import DateTimePicker from "@react-native-community/datetimepicker"
import { theme } from "@/Theme"
import { useFormikContext } from "formik"
import { HabitsType } from "@/app/habitsManager/habitManagerContext"
import Warning from "../Warning"

interface FormValues {
  reminderTimes: HabitsType["reminderTimes"]
}

export default function HabitReminderPicker() {
  const [visible, setVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState({ hour: getNextHour(1, "HH"), minute: "00" })
  const [warning, setWarning] = useState(false)
  const [selectedDateString, setSelectedDateString] = useState("")
  const { values, setFieldValue } = useFormikContext<FormValues>()

  const hours = generateTimeRange("hours")
  const minutes = generateTimeRange("minutes")
  const { reminderTimes } = values

  const validateTime = (time: string) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/
    return regex.test(time)
  }

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
  useEffect(() => {
    setSelectedDateString(`${selectedDate.hour}:${selectedDate.minute}`)
    handleWarning()
  }, [selectedDate, selectedDateString])

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
      <Button title="Adicionar novo horário" onPress={() => setVisible(true)} />
      <BottomDrawer
        visible={visible}
        onClose={() => setVisible(false)}
        rightButtonOnPress={() => handleSaveTime()}
        rightButtonText="Salvar"
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
})
