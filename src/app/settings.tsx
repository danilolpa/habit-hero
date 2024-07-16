import { Button } from "react-native"
import { ThemedView } from "@/components/Utils/Themed"
import { theme } from "@/Theme"
import { useToast } from "@/components/useToast"
import { useAlert } from "@/hooks/useAlert"
import { useState } from "react"
export default function Settings() {
  const { showToast } = useToast()
  const { Alert } = useAlert()
  const [visible, setVisible] = useState(false)

  return (
    <ThemedView
      className="flex-1 items-center justify-center text-white"
      darkColor={theme.colors.black.base}
      lightColor={theme.colors.white.base}
    >
      <ThemedView>
        <Button
          title="Show Toast Error"
          onPress={() => showToast("Commodo deserunt a est sunt.", { status: "error" })}
        />
        <Button
          title="Show Toast Info"
          onPress={() => showToast("Commodo deserunt a est sunt.", { status: "info" })}
        />
        <Button
          title="Show Toast success"
          onPress={() => showToast("Commodo deserunt a est sunt.", { status: "success" })}
        />
        <Button
          title="Show Toast warning"
          onPress={() => showToast("Commodo deserunt a est sunt.", { status: "warning" })}
        />

        <Button
          title="Show Alert Top"
          onPress={() =>
            Alert.Show({
              title: "Quis consectetur",
              text: "Labore labore minim laborum aliqua anim labore laborum veniam adipisicing tempor ad excepteur nisi. Sunt pariatur deserunt Lorem dolore velit sint fugiat aliqua ipsum est nisi minim. Reprehenderit non incididunt incididunt duis voluptate ut cillum anim esse laboris consectetur cupidatat.",
              position: "top",
              confirm: {
                title: "Ok, entendido.",
                icon: "check",
                iconPosition: "left",
              },
              cancel: {
                title: "Cancelar",
                icon: "youtube-searched-for",
              },
            })
          }
        />

        <Button
          title="Show Alert Center"
          onPress={() =>
            Alert.Show({
              title: "Quis consectetur",
              text: "Labore labore minim laborum aliqua anim labore laborum veniam adipisicing tempor ad excepteur nisi. Sunt pariatur deserunt Lorem dolore velit sint fugiat aliqua ipsum est nisi minim. Reprehenderit non incididunt incididunt duis voluptate ut cillum anim esse laboris consectetur cupidatat.",
              position: "center",
              confirm: {
                title: "Ok, entendido.",
                icon: "check",
                iconPosition: "left",
              },
              cancel: {
                title: "Cancelar",
                icon: "youtube-searched-for",
              },
            })
          }
        />

        <Button
          title="Show Alert Bottom"
          onPress={() =>
            Alert.Show({
              title: "Quis consectetur",
              text: "Labore labore minim laborum aliqua anim labore laborum veniam adipisicing tempor ad excepteur nisi. Sunt pariatur deserunt Lorem dolore velit sint fugiat aliqua ipsum est nisi minim. Reprehenderit non incididunt incididunt duis voluptate ut cillum anim esse laboris consectetur cupidatat.",

              confirm: {
                title: "Ok, entendido.",
                icon: "check",
                iconPosition: "left",
              },
              cancel: {
                title: "Cancelar",
                icon: "youtube-searched-for",
              },
            })
          }
        />

        <Button
          title="Show Alert without buttons"
          onPress={() =>
            Alert.Show({
              title: "Labore labore minim laborum aliqua anim labore laborum",
              cancel: {
                title: "Cancelar",
                icon: "youtube-searched-for",
              },
              confirm: {
                title: "Ok, entendido.",
                icon: "check",
                iconPosition: "left",
              },
              text: "Labore labore minim laborum aliqua anim labore laborum veniam adipisicing tempor ad excepteur nisi. Sunt pariatur deserunt Lorem dolore velit sint fugiat aliqua ipsum est nisi minim. Reprehenderit non incididunt incididunt duis voluptate ut cillum anim esse laboris consectetur cupidatat.Labore labore minim laborum aliqua anim labore laborum veniam adipisicing tempor ad excepteur nisi. Sunt pariatur deserunt Lorem dolore velit sint fugiat aliqua ipsum est nisi minim. Reprehenderit non incididunt incididunt duis voluptate ut cillum anim esse laboris consectetur cupidatat.Labore labore minim laborum aliqua anim labore laborum veniam adipisicing tempor ad excepteur nisi. Sunt pariatur deserunt Lorem dolore velit sint fugiat aliqua ipsum est nisi minim. Reprehenderit non incididunt incididunt duis voluptate ut cillum anim esse laboris consectetur cupidatat.Labore labore minim laborum aliqua anim labore laborum veniam adipisicing tempor ad excepteur nisi. Sunt pariatur deserunt Lorem dolore velit sint fugiat aliqua ipsum est nisi minim. Reprehenderit non incididunt incididunt duis voluptate ut cillum anim esse laboris consectetur cupidatat.Labore labore minim laborum aliqua anim labore laborum veniam adipisicing tempor ad excepteur nisi. Sunt pariatur deserunt Lorem dolore velit sint fugiat aliqua ipsum est nisi minim. Reprehenderit non incididunt incididunt duis voluptate ut cillum anim esse laboris consectetur cupidatat.Labore labore minim laborum aliqua anim labore laborum veniam adipisicing tempor ad excepteur nisi. Sunt pariatur deserunt Lorem dolore velit sint fugiat aliqua ipsum est nisi minim. Reprehenderit non incididunt incididunt duis voluptate ut cillum anim esse laboris consectetur cupidatat.Labore labore minim laborum aliqua anim labore laborum veniam adipisicing tempor ad excepteur nisi. Sunt pariatur deserunt Lorem dolore velit sint fugiat aliqua ipsum est nisi minim. Reprehenderit non incididunt incididunt duis voluptate ut cillum anim esse laboris consectetur cupidatat.Labore labore minim laborum aliqua anim labore laborum veniam adipisicing tempor ad excepteur nisi. Sunt pariatur deserunt Lorem dolore velit sint fugiat aliqua ipsum est nisi minim. Reprehenderit non incididunt incididunt duis voluptate ut cillum anim esse laboris consectetur cupidatat.",
            })
          }
        />
      </ThemedView>
    </ThemedView>
  )
}
