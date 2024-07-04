import React, { createContext, useContext, useState } from "react"
import CustomAlert, { CustomAlertProps } from "@/components/CustomAlert"

type ShowAlertProps = Omit<CustomAlertProps, "visible">

interface AlertContextProps {
  Alert: { Show: (props: ShowAlertProps) => void; Close: () => void }
  AlertView?: React.FC
  alertVisible: boolean
  alertProps: ShowAlertProps | null
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined)

const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alertProps, setAlertProps] = useState<ShowAlertProps | null>(null)
  const [visible, setVisible] = useState(false)

  const showAlert = (props: ShowAlertProps) => {
    setAlertProps(props)
    setVisible(true)
  }

  const closeAlert = () => {
    setVisible(false)
  }

  return (
    <AlertContext.Provider
      value={{
        Alert: { Show: showAlert, Close: closeAlert },
        alertVisible: visible,
        alertProps,
      }}
    >
      {alertProps && (
        <CustomAlert
          {...alertProps}
          visible={visible}
          onClose={() => {
            setVisible(false)
            alertProps?.onClose?.()
          }}
        />
      )}
      {children}
    </AlertContext.Provider>
  )
}

export const useAlert = (): AlertContextProps => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider")
  }
  return context
}

export const AlertComponent: React.FC = () => {
  const { alertProps, alertVisible, Alert } = useAlert()

  if (alertProps) {
    return (
      <CustomAlert
        {...(alertProps || {})}
        visible={alertVisible}
        onClose={() => {
          Alert.Close()
          alertProps?.onClose?.()
        }}
      />
    )
  }
}

export { AlertProvider }
