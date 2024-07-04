import React, { useEffect } from "react"
import { View, Text, StyleSheet, Modal, Image, ImageBackground, Platform } from "react-native"

import { theme } from "@/Theme"
import { BubblePressable } from "./Buttons/BubblePressable"
import { IconsProps, ThemedText, ThemedView, useThemeColor } from "@/components/Utils/Themed"
import { SlideInDown, SlideInUp, SlideOutDown, SlideOutUp } from "react-native-reanimated"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { ScrollView } from "react-native-gesture-handler"

export type ColorConfig = {
  background: string
  title: string
  text: string
  cancelText: string
  confirmText: string
}

export type ActionsProps = {
  title?: string
  onPress?: () => void
  icon?: IconsProps["name"]
  iconPosition?: "right" | "left"
}

export type CustomAlertProps = {
  visible: boolean
  title: string
  text: string
  confirm?: ActionsProps
  cancel?: ActionsProps
  onClose?: () => void
  position?: "top" | "bottom" | "center"
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  text,
  confirm,
  cancel,
  onClose,
  position = "bottom",
}) => {
  const insets = useSafeAreaInsets()

  return (
    <Modal transparent={true} animationType="fade" visible={visible} onRequestClose={onClose}>
      <View
        style={[
          styles.alertDialog,
          position === "top" && styles.alertDialogTop,
          position === "center" && styles.alertDialogCenter,
        ]}
      >
        {visible && (
          <ThemedView
            style={[styles.alertDialogContainer]}
            lightColor={theme.colors.white.base}
            darkColor={theme.colors.black.base}
            entering={(position === "top" && SlideInUp) || SlideInDown}
            exiting={(position === "top" && SlideOutUp) || SlideOutDown}
            animated={true}
          >
            <ImageBackground
              source={require("@/assets/images/scenes/scene_02.png")}
              resizeMode="cover"
              style={styles.alertDialogImage}
            />
            <ThemedView
              style={[
                styles.alertDialogContent,
                position === "bottom" && { paddingBottom: insets.bottom },
              ]}
            >
              <ScrollView
                style={{
                  width: "100%",
                  maxHeight: 500,
                  paddingHorizontal: theme.spaces.defaultSpace,
                }}
              >
                <ThemedText
                  style={[styles.title]}
                  lightColor={theme.colors.black.base}
                  darkColor={theme.colors.white.base}
                  fontWeight="bold"
                >
                  {title}
                </ThemedText>
                <ThemedText
                  style={[styles.text]}
                  lightColor={theme.colors.black.base}
                  darkColor={theme.colors.white.base}
                >
                  {text}
                </ThemedText>
              </ScrollView>
              <ThemedView
                style={[styles.buttonContainer]}
                lightColor={theme.colors.white.base}
                darkColor={theme.colors.black.base}
              >
                {confirm && (
                  <BubblePressable.Button
                    title={confirm.title || "Ok, entendido"}
                    onPress={confirm.onPress || onClose}
                    {...(confirm.icon && { icon: confirm.icon })}
                    {...(confirm.iconPosition && confirm.iconPosition === "left" && { rtl: true })}
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
                {!cancel && !confirm && (
                  <BubblePressable.Button
                    title="Ok, entendido"
                    onPress={onClose}
                    color={theme.colors.primary.base}
                  />
                )}
              </ThemedView>
            </ThemedView>
          </ThemedView>
        )}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  alertDialog: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 1111,
  },
  alertDialogTop: {
    justifyContent: "flex-start",
  },
  alertDialogCenter: {
    justifyContent: "center",
    paddingHorizontal: theme.spaces.defaultSpace,
  },
  alertDialogContainer: {
    width: "100%",
    marginTop: 0,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    overflow: "hidden",
    maxHeight: "90%",
  },
  alertDialogImage: {
    height: 100,
    width: "100%",
    // marginTop: -theme.spaces.defaultSpace,
  },
  alertDialogContent: {
    width: "100%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: theme.spaces.defaultSpace,
    lineHeight: 30,
    paddingTop: theme.spaces.defaultSpace,
    paddingBottom: theme.spaces.defaultSpace,
    marginTop: theme.spaces.defaultSpace,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    width: "100%",
    gap: 10,
    paddingHorizontal: theme.spaces.defaultSpace,
  },
})

export default CustomAlert
