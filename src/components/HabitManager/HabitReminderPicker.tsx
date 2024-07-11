import { View, StyleSheet, Text, Pressable } from "react-native"
import { useEffect, useState } from "react"
import { useFormikContext } from "formik"
import { Picker } from "@react-native-picker/picker"

import DialogDrawer from "@/components/DialogDrawer"
import Warning from "@/components/Warning"
import { generateTimeRange, getNextHour } from "@/utils/dateHelpers"
import { ThemedText } from "@/components/Utils/Themed"
import { theme } from "@/Theme"
import { HabitsType } from "@/types/habits"
import ContentFlexRow from "../ContentFlexRow"
import { useAlert } from "../../hooks/useAlert"

interface FormValues {
  reminderTimes: HabitsType["reminderTimes"]
}

interface HabitReminderPickerProps {
  color?: string
  editItem?: string
  setEditItem?: (time: string) => void
}

export default function HabitReminderPicker(props: HabitReminderPickerProps) {
  const [visible, setVisible] = useState(false)
  const [selectedDate, setSelectedDate] = useState({ hour: getNextHour(1, "HH"), minute: "00" })
  const [warning, setWarning] = useState(false)
  const [selectedDateString, setSelectedDateString] = useState("")
  const { values, setFieldValue } = useFormikContext<FormValues>()

  const { Alert } = useAlert()

  const hours = generateTimeRange("hours")
  const minutes = generateTimeRange("minutes")
  const { reminderTimes } = values
  const { color, editItem, setEditItem } = props

  const validateTime = (time: string) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/
    return regex.test(time)
  }

  useEffect(() => {
    setSelectedDateString(`${selectedDate.hour}:${selectedDate.minute}`)
    handleWarning()
  }, [selectedDate, selectedDateString])

  useEffect(() => {
    if (editItem) {
      setVisible(true)
      setSelectedDate({ hour: editItem.split(":")[0], minute: editItem.split(":")[1] })
    }
  }, [editItem])

  const handleSaveTime = () => {
    if (validateTime(selectedDateString)) {
      if (reminderTimes?.some((time) => time === selectedDateString)) {
        Alert.Show({
          title: "Horário repetido",
          text: "O horário de notificação já foi criado. Por favor escolha outro.",
        })
      } else {
        setWarning(false)
        const updatedReminderTimes = reminderTimes?.filter((time) => time !== editItem) || []
        const newReminderTimes = [...updatedReminderTimes, String(selectedDateString)].sort(
          (a, b) => a.localeCompare(b),
        )

        setFieldValue("reminderTimes", newReminderTimes)
        setVisible(false)
        if (editItem && setEditItem) {
          setEditItem && setEditItem("")
        }
      }
    }
  }

  const handleWarning = () => {
    if (
      reminderTimes?.some((time) => time === selectedDateString) &&
      editItem !== selectedDateString
    ) {
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
  const renderTitleEdit = () => {
    return (
      <ThemedText style={styles.titleEdit}>
        Você está editando a notificação para o horário das{" "}
        <ThemedText fontWeight="bold">{" " + editItem}</ThemedText>
      </ThemedText>
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
      <DialogDrawer
        visible={visible}
        onClose={() => {
          setVisible(false)
          setEditItem && setEditItem("")
        }}
        rightButtonOnPress={() => handleSaveTime()}
        rightButtonText="Salvar"
        color={color}
      >
        {editItem && renderTitleEdit()}
        {warning && renderWarning()}
        {visible && renderPicker()}
      </DialogDrawer>
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
  titleEdit: {
    paddingHorizontal: "10%",
    textAlign: "center",
    marginTop: 10,
  },
})
