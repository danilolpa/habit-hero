import { View, StyleSheet } from "react-native"
import { BubblePressable } from "../Buttons/BubblePressable"
import IconsHabitModal from "../IconsHabitModal"
import { HabitsType } from "@/types/habits"
import { useFormikContext } from "formik"
import useVisibilityControl from "@/utils/useVisibilityControl"
import { ThemedIcon } from "../Utils/Themed"
import { getColorContrastColorByHex } from "@/Theme"

const HabitIconSelector = ({ color }: { color: string }) => {
  const { values } = useFormikContext<HabitsType>()
  const { toggleVisibility, setVisibility, getVisibility } = useVisibilityControl({
    emoteModal: false,
  })
  return (
    <View style={{ flex: 1 }}>
      <BubblePressable.Button
        color={color}
        buttonStyle={{
          height: "100%",
        }}
        onPress={() => toggleVisibility("emoteModal")}
        radius={8}
      >
        <ThemedIcon
          name={values.icon}
          size={30}
          color={getColorContrastColorByHex(String(color))}
          style={{ textAlign: "center" }}
        />
      </BubblePressable.Button>
      <IconsHabitModal
        isVisible={getVisibility("emoteModal") || false}
        onClose={() => setVisibility("emoteModal", false)}
        selectedColor={color}
        habitIconActual={values.icon}
      />
    </View>
  )
}

export default HabitIconSelector

export const styles = StyleSheet.create({
  container: {},
})
