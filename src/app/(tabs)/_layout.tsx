import { View, Text } from "react-native"
import React from "react"
import { Redirect, Slot, Stack, Tabs, useRouter, usePathname } from "expo-router"
import APP_CONSTANTS from "@/constants/AppConstants"
import TabBar from "@/components/TabBar"

const TabsLayout = () => {
  return (
    <>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen
          name="index"
          options={{ headerShown: false, title: "Hábitos", tabBarBadge: 2 }}
        />
        <Tabs.Screen name="tests" options={{ headerShown: true, title: "Tests" }} />
        <Tabs.Screen name="statistics" options={{ headerShown: true, title: "Estatísticas" }} />
        <Tabs.Screen name="profile" options={{ headerShown: true, title: "Perfil" }} />
      </Tabs>
    </>
  )
}

export default TabsLayout
