import { View, Text } from "react-native"
import React from "react"
import { Redirect, Slot, Stack, Tabs, useRouter, usePathname } from "expo-router"
import APP_CONSTANTS from "@/constants/AppConstants"

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen name="index" options={{ headerShown: false }} />
        <Tabs.Screen name="tests" options={{ headerShown: false }} />
      </Tabs>
    </>
  )
}

export default TabsLayout
