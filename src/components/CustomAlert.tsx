import React from "react"
import { View, Text, StyleSheet, TouchableOpacity, Modal, SafeAreaView } from "react-native"

import CloseButton from "@/components/Buttons/CloseButton"
import { theme } from "@/Theme"
import { BubblePressable } from "./Buttons/BubblePressable"

export type ColorConfig = {
  background: string
  title: string
  text: string
  cancelText: string
  confirmText: string
}

export type ActionsProps = {
  title?: string
  onPress: () => void
}

export type CustomAlertProps = {
  visible: boolean
  title: string
  text: string
  confirm: ActionsProps
  cancel: ActionsProps
  onClose?: () => void
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  text,
  confirm,
  cancel,
  onClose,
}) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.alertDialogContainer]}>
          <SafeAreaView style={styles.AlertDialogContent}>
            <View>
              <CloseButton onPress={onClose} transparent />
            </View>
            <Text style={[styles.title]}>{title}</Text>
            <Text style={[styles.text]}>{text}</Text>
            <View style={styles.buttonContainer}>
              {confirm && (
                <BubblePressable.Button
                  title={confirm.title || "Confirmar"}
                  icon="check"
                  rtl
                  onPress={confirm.onPress || onClose}
                />
              )}
              {cancel && (
                <BubblePressable.Button
                  title={cancel.title || "Fechar"}
                  transparent
                  color={theme.colors.red.base}
                  onPress={cancel.onPress || onClose}
                />
              )}
            </View>
          </SafeAreaView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  alertDialogContainer: {
    width: "100%",
    marginTop: 0,
    padding: theme.spaces.defaultSpace,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.black.base,
    borderWidth: 1,
    borderColor: "green",
  },
  AlertDialogContent: {
    borderWidth: 1,
    borderColor: "pink",
    width: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "red",
    textAlign: "center",
    color: theme.colors.white.base,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "yellow",
    color: theme.colors.white.base,
  },
  buttonContainer: {
    // justifyContent: "space-between",
    width: "100%",
    borderWidth: 1,
    borderColor: "pink",
    gap: 10,
  },
})

export default CustomAlert
