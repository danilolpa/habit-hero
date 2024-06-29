import { View, Text, StyleSheet } from "react-native"
import { useFormikContext } from "formik"

import { getColorHexByName, theme } from "@/Theme"
import ContentFlexRow from "@/components/ContentFlexRow"
import Chip from "@/components/Buttons/Chip"
import { HabitsType } from "@/app/habitsManager/habitManagerContext"
import Button from "@/components/Buttons/Buttons"
import AccordionContainer from "@/components/AccordionContainer"
import ContentContainer from "@/components/ContentContainer"

interface FormValues {
  reminderTimes: HabitsType["reminderTimes"]
  color: HabitsType["color"]
  reminder: HabitsType["reminder"]
}
interface HabitReminderSelectorProps {
  selectedColor?: string
}
export default function HabitReminderSelector(props: HabitReminderSelectorProps) {
  const { values, setFieldValue } = useFormikContext<FormValues>()
  const { reminderTimes, color, reminder } = values
  const { selectedColor } = props

  const handleRemoveTime = (time: string) => {
    if (reminderTimes) {
      setFieldValue(
        "reminderTimes",
        reminderTimes.filter((t) => t !== time),
      )
    }
  }

  const renderTime = (time: string) => {
    return (
      <Chip
        key={time}
        icon="alarm-on"
        iconSize={26}
        style={{ width: "100%", height: 55 }}
        fontSize={20}
        textColor={getColorHexByName(values.color) || theme.colors.white.base}
        onPress={() => console.log("Clicked")}
        onClose={() => handleRemoveTime(time)}
        iconColor={selectedColor}
        confirmClose
      >
        {time}
      </Chip>
    )
  }
  return (
    <AccordionContainer
      isVisible={reminder || false}
      header={
        <ContentFlexRow
          text="Lembrar-me no horário"
          switchOptions={{
            selectedColor: selectedColor || theme.colors.black.base,
            value: reminder || false,
            onValueChange: () => {
              setFieldValue("reminder", reminder ? false : true)
            },
          }}
          iconRotated={reminder}
        />
      }
    >
      <ContentContainer schemeColor="light">
        <View style={styles.container}>
          <View style={styles.timesContainer}>
            {reminderTimes && reminderTimes.map((time) => renderTime(time))}
          </View>
          {/* <Button title="Adicionar novo horário" /> */}
        </View>
      </ContentContainer>
    </AccordionContainer>
  )
}

export const styles = StyleSheet.create({
  container: {
    minHeight: 50,
  },
  timesContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
    paddingVertical: theme.spaces.defaultSpace,
    paddingHorizontal: theme.spaces.defaultSpace,
  },
})
