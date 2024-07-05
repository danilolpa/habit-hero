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
/**
 * A React functional component that provides an Alert context for managing and displaying alerts.
 *
 * @param children - The React children to be rendered within the AlertProvider.
 * @returns A React functional component that provides the Alert context.
 */
const AlertProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  /**
   * State variable to hold the properties of the alert to be displayed.
   */
  const [alertProps, setAlertProps] = useState<ShowAlertProps | null>(null)

  /**
   * State variable to hold the visibility state of the alert.
   */
  const [visible, setVisible] = useState(false)

  /**
   * Function to show an alert with the given properties.
   *
   * @param props - The properties of the alert to be displayed.
   */
  const showAlert = (props: ShowAlertProps) => {
    setAlertProps(props)
    setVisible(true)
  }

  /**
   * Function to close the currently displayed alert.
   */
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

/**
 * Hook to access and manage the Alert context.
 *
 * @throws Will throw an error if the hook is not used within an AlertProvider.
 * @returns An object containing the Alert context properties and methods.
 */

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
