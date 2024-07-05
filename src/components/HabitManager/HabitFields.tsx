import { View, StyleSheet } from "react-native"
import { useFormikContext } from "formik"

import { Input } from "@/components/Input"
import { HabitsType } from "@/components/HabitManager/habitManagerContext"
import { theme } from "@/Theme"

const HabitFields = ({ color }: { color: string }) => {
  const { values, handleChange, handleBlur } = useFormikContext<HabitsType>()

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
