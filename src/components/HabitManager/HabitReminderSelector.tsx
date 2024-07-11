import { View, StyleSheet } from "react-native"
import { useFormikContext } from "formik"
import { useEffect, useRef, useState } from "react"

import { getColorHexByName, theme } from "@/Theme"
import ContentFlexRow from "@/components/ContentFlexRow"
import Chip from "@/components/Buttons/Chip"
import { HabitsType } from "@/types/habits"
import AccordionContainer from "@/components/AccordionContainer"
import ContentContainer from "@/components/ContentContainer"
import { getNextHour } from "@/utils/dateHelpers"
import HabitReminderPicker from "@/components/HabitManager/HabitReminderPicker"

interface HabitReminderSelectorProps {
  color?: string
}
export default function HabitReminderSelector(props: HabitReminderSelectorProps) {
  const { values, setFieldValue } = useFormikContext<HabitsType>()
  const { color = theme.colors.primary.base } = props
  const { reminderTimes, reminder } = values
  const [editItem, setEditItem] = useState("")

  const prevReminderRef = useRef(reminder)
  const prevReminderTimesRef = useRef(reminderTimes)

  useEffect(() => {
    const prevReminder = prevReminderRef.current
    const prevReminderTimes = prevReminderTimesRef.current

    if (
      reminderTimes &&
      reminderTimes.length === 0 &&
      reminder &&
      prevReminderTimes &&
      prevReminderTimes?.length > 0
    ) {
      setFieldValue("reminder", false)
      return
    }
    if (reminderTimes && reminderTimes.length === 0 && !prevReminder && reminder) {
      setFieldValue("reminderTimes", [getNextHour(1)])
      return
    }
    prevReminderRef.current = reminder
    prevReminderTimesRef.current = reminderTimes
  }, [reminderTimes, reminder])

  const handleRemoveTime = (time: string) => {
    if (reminderTimes) {
      setFieldValue(
        "reminderTimes",
        reminderTimes.filter((t) => t !== time),
      )
    }
  }

  const handleEdit = (time: string) => {
    setEditItem(time)
  }

  const renderTime = (time: string) => {
    return (
      <Chip
        key={time}
        icon="alarm-on"
        iconSize={28}
        style={{ width: "100%", height: 55, borderRadius: 10 }}
        fontSize={20}
        textColor={getColorHexByName(values.color) || theme.colors.white.base}
        onPress={() => handleEdit(time)}
        onClose={() => handleRemoveTime(time)}
        confirmClose
        text={time}
      />
    )
  }
  return (
    <ContentContainer>
      <AccordionContainer
        isVisible={reminder || false}
        header={
          <ContentFlexRow
            text="Lembrar-me no horário"
            switchOptions={{
              selectedColor: color || theme.colors.black.base,
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
            <HabitReminderPicker color={color} editItem={editItem} setEditItem={setEditItem} />
            <View style={styles.timesContainer}>
              {reminderTimes && reminderTimes.map((time) => renderTime(time))}
            </View>
          </View>
        </ContentContainer>
      </AccordionContainer>
    </ContentContainer>
  )
}

export const styles = StyleSheet.create({
  container: {
    minHeight: 50,
  },
  timesContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: 8,
    paddingVertical: theme.spaces.defaultSpace,
    paddingHorizontal: theme.spaces.defaultSpace,
    width: "100%",
  },
})
