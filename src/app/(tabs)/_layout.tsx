import { View, Text } from "react-native"
import React from "react"
import { Redirect, Slot, Stack, Tabs, useRouter, usePathname } from "expo-router"
import APP_CONSTANTS from "@/constants/AppConstants"
import TabBar from "@/components/TabBar"
import { theme } from "@/Theme"

const TabsLayout = () => {
  return (
    <>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen name="index" options={{ headerShown: false, title: "Hábitos" }} />
        <Tabs.Screen
          name="tests"
          options={{
            headerShown: true,
            title: "Tests",
            headerStyle: { backgroundColor: theme.colors.primary.base },
          }}
        />
        <Tabs.Screen
          name="statistics"
          options={{
            headerShown: true,
            title: "Estatísticas",
            headerStyle: { backgroundColor: theme.colors.primary.base },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: true,
            title: "Perfil",
            headerStyle: { backgroundColor: theme.colors.primary.base },
          }}
        />
      </Tabs>
    </>
  )
}

export default TabsLayout
