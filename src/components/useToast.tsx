import React, { createContext, useContext, useState, ReactNode, useCallback } from "react"
import { View, StyleSheet, Platform, ToastAndroid, Pressable } from "react-native"

import { ThemedText } from "@/components/Utils/Themed"
import { theme } from "@/Theme"
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated"

interface ToastProps {
  message: string
  duration?: number
  status?: "success" | "warning" | "error" | "info"
  styles?: {
    backgroundColor: string
    textColor: string
    status?: string
  }
}
const statusStyles = [
  {
    status: "success",
    backgroundColor: theme.colors.green.base || "green",
    textColor: "white",
  },
  {
    status: "warning",
    backgroundColor: theme.colors.orange.base || "orange",
    textColor: "black",
  },
  {
    status: "error",
    backgroundColor: theme.colors.red.base || "red",
    textColor: "white",
  },
  {
    status: "info",
    backgroundColor: theme.colors.blue.base || "blue",
    textColor: "white",
  },
]

interface ToastContextProps {
  showToast: (message: string, options?: Omit<ToastProps, "message">) => void
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

const getStylesByStatus = (status: string) => {
  const style = statusStyles.find((s) => s.status === status)
  return style ? style : statusStyles[3]
}

const ToastProvider: React.FC<{ children: ReactNode; isModal: Boolean }> = ({
  children,
  isModal = false,
}) => {
  const [toast, setToast] = useState<ToastProps | null>(null)
  const [toastOnModal] = useState(isModal)

  const showToast = useCallback((message: string, options: Omit<ToastProps, "message"> = {}) => {
    const { duration = 3000, status = "error", styles } = options

    if (Platform.OS === "android") {
      ToastAndroid.showWithGravity(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    } else {
      setToast({ message, duration, styles: styles || getStylesByStatus(status) })
      setTimeout(() => {
        setToast(null)
      }, duration)
    }
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && Platform.OS === "ios" && (
        <View style={[styles.container, toastOnModal && { paddingTop: 20 }]}>
          <Animated.View
            entering={FadeInUp}
            exiting={FadeOutUp}
            style={[
              styles.toast,
              {
                backgroundColor: toast.styles && toast.styles.backgroundColor,
              },
            ]}
          >
            <Pressable
              onPress={() => setToast(null)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ThemedText
                style={[styles.message, { color: toast.styles && toast.styles.textColor }]}
              >
                {toast.message}
              </ThemedText>
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ToastContext.Provider>
  )
}

const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    paddingTop: 60,
    zIndex: 99999,
  },
  toast: {
    padding: 10,
    borderRadius: 30,
    width: "70%",
    display: "flex",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.5)",
        shadowOffset: { width: 0, height: 5 }, // Sombra apenas no topo
        shadowOpacity: 1,
        shadowRadius: 5.84,
      },
      android: {
        elevation: 0, // No Android, a sombra é um pouco limitada
      },
    }),
  },
  message: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    paddingHorizontal: 20,
    paddingTop: 2,
  },
})

export { ToastProvider, useToast }
