import { IconsProps } from "@/components/Utils/Themed"
import { HabitColorNameType } from "@/Theme"

export interface frequencyScheduleType {
  daily: number[]
  weekly: number
  monthly: number[]
}

export interface singleDateProps {
  year: number
  month: number
  day: number
  timestamp: number
  dateString: string
}

export type GoalDetailsType = {
  hours?: number
  minutes?: number
  count?: number
  seconds?: number
  type?: "TIME" | "CUP" | "PAGE" | "KILOMETER" | string
}
export interface goalProps {
  hasGoal: boolean
  goalType?: "BY_TIME" | "BY_UNITS"
  goalDetails?: GoalDetailsType
}
export type TimePeriodType = "MORNING" | "AFTERNOON" | "NIGHT" | "ANYTIME"

export interface HabitsType {
  id: string
  name: string
  description?: string
  icon: IconsProps["name"]
  repeat?: boolean
  frequency?: "DAILY" | "WEEKLY" | "MONTHLY" | "SINGLE"
  frequencySchedule?: frequencyScheduleType
  singleDate?: singleDateProps
  goal: goalProps
  color: HabitColorNameType
  reminderTimes?: string[]
  reminder?: boolean
  period?: TimePeriodType[]
  createdDate?: string
  endDate?: string
}

export interface HabitStatusProps {
  id: string
  status: "TO_DO" | "IGNORED" | "COMPLETED"
  statusDate?: string
}
