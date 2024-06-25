import { Picker } from "@react-native-picker/picker"
import { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { ThemedView } from "./Utils/Themed"

const SelectWheel = () => {
  const [selectedLanguage, setSelectedLanguage] = useState()

  return (
    <ThemedView>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
        <Picker.Item label="8" value="8" />
        <Picker.Item label="9" value="9" />
        <Picker.Item label="10" value="10" />
        <Picker.Item label="11" value="11" />
        <Picker.Item label="12" value="12" />
        <Picker.Item label="13" value="13" />
        <Picker.Item label="14" value="14" />
        <Picker.Item label="15" value="15" />
      </Picker>
    </ThemedView>
  )
}

export const styles = StyleSheet.create({
  container: {},
})

export default SelectWheel
