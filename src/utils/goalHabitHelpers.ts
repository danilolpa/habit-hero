import APP_CONSTANTS from "@/constants/AppConstants"

const getGoalTypeByIndex = (index: number) => {
  try {
    if (index < 0 || index >= APP_CONSTANTS.HABIT.GOAL_LABELS.length) {
      throw new Error("Index out of range")
    }
    return APP_CONSTANTS.HABIT.GOAL_LABELS[index]
  } catch (error) {
    console.error(error)
    return APP_CONSTANTS.HABIT.GOAL_LABELS[0].VALUE // or any appropriate default value
  }
}

const getGoalIndexByValue = (value: string) => {
  try {
    const index = APP_CONSTANTS.HABIT.GOAL_LABELS.findIndex((item) => item.VALUE === value)

    if (index >= 0) {
      return index
    } else {
      throw new Error("Value not found")
    }
  } catch (error) {
    console.error(error)
    return 0 // or any appropriate default value
  }
}

export { getGoalTypeByIndex, getGoalIndexByValue }
