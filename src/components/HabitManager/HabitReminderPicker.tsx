import { View, Text, StyleSheet } from "react-native"
import BottomDrawer from "../BottomDrawer"
import { useState } from "react"
import Button from "@/components/Buttons/Buttons"
import { Picker } from "@react-native-picker/picker"
import { generateTimeRange, getFormattedDate, getNextHour } from "@/utils/dateHelpers"
import { ThemedText, ThemedView } from "../Utils/Themed"
import DateTimePicker from "@react-native-community/datetimepicker"

export default function HabitReminderPicker() {
  const [visible, setVisible] = useState(false)
  const [selectedHour, setSelectedHour] = useState(getNextHour(2, "HH"))
  const [selectedMinute, setSelectedMinute] = useState("00")

  const hours = generateTimeRange("hours")
  const minutes = generateTimeRange("minutes")
  console.log(selectedHour, selectedMinute)

  return (
    <View style={styles.container}>
      <Button title="Adicionar novo horário" onPress={() => setVisible(true)} />
      <BottomDrawer
        visible={visible}
        onClose={() => setVisible(false)}
        rightButtonOnPress={() => console.log("Saved")}
        rightButtonText="Definir hora"
      >
        <DateTimePicker
          mode="time"
          value={new Date()}
          display="clock"
          style={{ width: 300, opacity: 1, height: 30, marginTop: 50 }}
        />
        <View style={styles.pickerContainer}>
          <View style={styles.picker}>
            <Picker
              onValueChange={(value) => setSelectedHour(value)}
              selectedValue={selectedHour}
              is24Hour={true}
            >
              {hours.map((hour) => (
                <Picker.Item label={String(hour)} value={hour} key={hour} />
              ))}
            </Picker>
          </View>
          <View style={styles.divider}>
            <ThemedText>:</ThemedText>
          </View>
          <View style={styles.picker}>
            <Picker
              onValueChange={(value) => setSelectedMinute(value)}
              selectedValue={selectedMinute}
            >
              {minutes.map((minute) => (
                <Picker.Item label={String(minute)} value={minute} key={minute} />
              ))}
            </Picker>
          </View>
        </View>
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
})
