import { Modal, View, StyleSheet, TouchableOpacity, Animated, PanResponder } from "react-native"
import { useEffect, useRef, useState } from "react"

import { ThemedView } from "@/components/Utils/Themed"
import { theme } from "@/Theme"
import Button from "@/components/Buttons/Buttons"
import CloseButton from "@/components/Buttons/CloseButton"
import { useAlert, AlertComponent } from "../hooks/useAlert"

interface DialogDrawerProps {
  visible: boolean
  onClose: () => void
  children: React.ReactNode
  rightButtonOnPress?: () => void
  rightButtonText?: string
  color?: string
}

const DialogDrawer: React.FC<DialogDrawerProps> = ({
  visible,
  onClose,
  rightButtonOnPress,
  children,
  rightButtonText = "Salvar",
  color = theme.colors.primary.base,
}) => {
  const translateY = useRef(new Animated.Value(0)).current
  const [isVisible, setIsVisible] = useState(visible)
  const { Alert } = useAlert()

  useEffect(() => {
    if (visible) {
      setIsVisible(true)
      translateY.setValue(500)
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(translateY, {
        toValue: 500,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        onClose
      })
      setIsVisible(false)
    }
  }, [visible, translateY])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy)
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 100) {
          Animated.timing(translateY, {
            toValue: 500,
            duration: 300,
            useNativeDriver: true,
          }).start(onClose)
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start()
        }
      },
    }),
  ).current

  const handleRightButtonPress = () => {
    rightButtonOnPress && rightButtonOnPress()
  }
  const handleClose = () => {
    Animated.timing(translateY, {
      toValue: 500,
      duration: 250,
      useNativeDriver: true,
    }).start(onClose)
  }

  return (
    <Modal transparent visible={isVisible} animationType="fade">
      <ThemedView style={styles.overlay}>
        {AlertComponent && <AlertComponent />}
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <ThemedView
            lightColor={theme.colors.white.base}
            darkColor={theme.colors.black.base}
            style={styles.contentContainer}
          >
            <View {...panResponder.panHandlers} style={styles.header}>
              <CloseButton onPress={handleClose} transparent />
              <TouchableOpacity style={[styles.indicator, { marginLeft: 65 }]} />
              <View style={{ width: 100, display: "flex", alignItems: "flex-end", marginRight: 6 }}>
                {rightButtonOnPress && (
                  <Button
                    title={String(rightButtonText)}
                    onPress={handleRightButtonPress}
                    color={color}
                  />
                )}
              </View>
            </View>
            <View style={styles.childrenContent}>
              <Button
                title="Click"
                onPress={() =>
                  Alert.Show({
                    title: "Tem certeza?",
                    text: "Você tem certeza que deseja sair?",
                  })
                }
              />
              {children}
            </View>
          </ThemedView>
        </Animated.View>
      </ThemedView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: -1,
  },
  container: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  contentContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 50,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  childrenContent: {
    padding: 16,
    paddingBottom: 32,
    paddingTop: 0,
  },
  indicator: {
    width: 40,
    height: 5,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 2.5,
    alignSelf: "center",
    marginVertical: 8,
  },
})

export default DialogDrawer
