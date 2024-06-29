import { View, Text, StyleSheet } from "react-native"
import BottomDrawer from "../BottomDrawer"
import { useState } from "react"
import Button from "@/components/Buttons/Buttons"
import { Picker } from "@react-native-picker/picker"

export default function HabitReminderPicker() {
  const [visible, setVisible] = useState(false)
  const hours: string[] = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ]
  return (
    <View>
      <Button title="Adicionar novo horário" onPress={() => setVisible(true)} />
      <BottomDrawer
        visible={true}
        onClose={() => setVisible(false)}
        rightButtonOnPress={() => console.log("Saved")}
      >
        <Picker />
      </BottomDrawer>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {},
})
