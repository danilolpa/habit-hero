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
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </ThemedView>
  )
}

export const styles = StyleSheet.create({
  container: {},
})

export default SelectWheel
