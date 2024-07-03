import React, { useState } from "react"
import { View } from "react-native"
import CustomAlert, { CustomAlertProps } from "@/components/CustomAlert"

type ShowAlertProps = Omit<CustomAlertProps, "visible">

let alertProps: ShowAlertProps | null = null
let setAlertVisible: React.Dispatch<React.SetStateAction<boolean>> | undefined

const AlertContainer = () => {
  const [visible, setVisible] = useState(false)
  setAlertVisible = setVisible

  if (!alertProps) return null

  return (
    <CustomAlert
      {...alertProps}
      visible={visible}
      onClose={() => {
        setVisible(false)
        alertProps?.onClose?.()
      }}
    />
  )
}

const showAlert = (props: ShowAlertProps) => {
  alertProps = props
  if (setAlertVisible) {
    setAlertVisible(true)
  } else {
    console.warn("Alert system not initialized.")
  }
}

const closeAlert = () => {
  if (setAlertVisible) {
    setAlertVisible(false)
  }
}

const AlertPortal = () => {
  return (
    <View>
      <AlertContainer />
    </View>
  )
}

export const Alert = {
  View: AlertPortal,
  Show: showAlert,
  Close: closeAlert,
}

export { closeAlert }
