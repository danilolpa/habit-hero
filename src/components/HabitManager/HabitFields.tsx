import { View, StyleSheet } from "react-native"
import { useFormikContext } from "formik"

import { Input } from "@/components/Input"
import { BubblePressable } from "@/components/Buttons/BubblePressable"
import IconsHabitModal from "@/components/IconsHabitModal"
import { getColorContrastColorByHex, theme } from "@/Theme"
import { HabitsType } from "@/components/HabitManager/habitManagerContext"
import { MaterialIcons } from "@expo/vector-icons"
import useVisibilityControl from "@/utils/useVisibilityControl"

interface HabitsFieldProps {
  color: string
}

const HabitFields = (props: HabitsFieldProps) => {
  const { color } = props
  const { values, setFieldValue, handleChange, handleBlur, errors, touched } =
    useFormikContext<HabitsType>()
  const { toggleVisibility, setVisibility, getVisibility } = useVisibilityControl({
    emoteModal: false,
  })

  return (
    <View style={styles.container}>
      <View style={styles.containerFlexRow}>
        <Input>
          <Input.Field
            placeholder="Nome"
            darkColor={theme.colors.black.light}
            lightColor={theme.colors.white.light}
            size="large"
            onChangeText={handleChange("name")}
            onBlur={handleBlur("name")}
            value={values.name}
            styleField={{ margin: 0 }}
            style={{ paddingRight: 4 }}
            cursorColor={color}
            maxLength={50}
          />
        </Input>

        <BubblePressable.Button
          color={color}
          buttonStyle={{
            width: 65,
            height: 60,
          }}
          onPress={() => toggleVisibility("emoteModal")}
          radius={8}
        >
          <MaterialIcons
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
      <Input.Field
        placeholder="Descrição"
        darkColor={theme.colors.black.light}
        lightColor={theme.colors.white.light}
        multiline
        size="large"
        numberOfLines={4}
        style={{ height: 125 }}
        onChangeText={handleChange("description")}
        onBlur={handleBlur("description")}
        value={values.description}
        cursorColor={color}
      />
    </View>
  )
}

export default HabitFields

export const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  containerFlexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
  },
})
