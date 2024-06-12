import React from "react"
import { Text, StyleSheet, ScrollView } from "react-native"

const JsonViewer = ({ jsonString }: { jsonString: any }) => {
  let formattedJson
  try {
    formattedJson = JSON.stringify(jsonString, null, 2)
  } catch (e) {
    formattedJson = "Invalid JSON string"
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.text}>{formattedJson}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: "monospace",
    fontSize: 14,
  },
})

export default JsonViewer
