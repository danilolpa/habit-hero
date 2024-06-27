import APP_CONSTANTS from "@/constants/AppConstants"

export const FREQUENCY_LABELS = Object.values(APP_CONSTANTS.HABIT.FREQUENCY)

export const FREQUENCY = [
  {
    index: 0,
    label: FREQUENCY_LABELS[0],
  },
  {
    index: 1,
    label: FREQUENCY_LABELS[1],
  },
  {
    index: 2,
    label: FREQUENCY_LABELS[2],
  },
]

const frequencies = FREQUENCY

const getFrequenciesByIndex = (index: number) => {
  return frequencies.find((frequency) => frequency.index === index)?.label
}
const getFrequenciesByLabel = (label: string) => {
  return frequencies.find((frequency) => frequency.label === label)?.index
}

const isFrequency = (label: string) => {
  console.log(frequencies.find((frequency) => frequency.label === label))
  return true
}

export { getFrequenciesByIndex, getFrequenciesByLabel, isFrequency }
