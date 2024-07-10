import React from "react"
import { View, ActivityIndicator, StyleSheet, Modal } from "react-native"

interface LoadingIndicatorProps {
  color?: string
  visible: boolean
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ color = "blue", visible }) => {
  return (
    <Modal transparent={true} animationType="none" visible={visible} onRequestClose={() => {}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" color={color} animating={visible} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
})

export default LoadingIndicator
