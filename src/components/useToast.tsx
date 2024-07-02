import React, { createContext, useContext, useState, ReactNode, useCallback } from "react"
import { View, Text, StyleSheet, Platform, ToastAndroid, Pressable } from "react-native"
import { ThemedText } from "./Utils/Themed"
import { theme } from "@/Theme"
import Animated, { FadeInDown, FadeInUp, FadeOutUp } from "react-native-reanimated"

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

const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastProps | null>(null)

  const showToast = useCallback((message: string, options: Omit<ToastProps, "message"> = {}) => {
    const { duration = 4000, status = "error", styles } = options

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
            <ThemedText style={[styles.message, { color: toast.styles && toast.styles.textColor }]}>
              {toast.message}
            </ThemedText>
          </Pressable>
        </Animated.View>
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
  toast: {
    position: "absolute",
    padding: 10,
    zIndex: 1000,
    paddingTop: 70,
    width: "100%",
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
    fontSize: 18,
    lineHeight: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
})

export { ToastProvider, useToast }
