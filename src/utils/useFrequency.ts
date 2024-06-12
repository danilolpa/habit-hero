import { useState } from "react"
import { FREQUENCY } from "@/utils/testData/habitsData"

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
