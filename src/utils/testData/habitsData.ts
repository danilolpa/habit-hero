// data.ts

import { HabitsType } from "@/types/habits"

export const categories = [
  {
    name: "Fitness",
    color: "#FF6666", // Cor mais forte
  },
  {
    name: "Education",
    color: "#4FC3F7", // Cor mais forte
  },
  {
    name: "Wellness",
    color: "#9575CD", // Cor mais forte
  },
  {
    name: "Health",
    color: "#FFB74D", // Cor mais forte
  },
  {
    name: "Personal Development",
    color: "#FFD54F", // Cor mais forte
  },
  {
    name: "Productivity",
    color: "#81C784", // Cor mais forte
  },
  {
    name: "Hobbies",
    color: "#F06292", // Cor mais forte
  },
  {
    name: "Social",
    color: "#64B5F6", // Cor mais forte
  },
  {
    name: "Mindfulness",
    color: "#BA68C8", // Cor mais forte
  },
  {
    name: "Creativity",
    color: "#FF8A65", // Cor mais forte
  },
  {
    name: "Finance",
    color: "#FFB74D", // Cor mais forte
  },
  {
    name: "Relationships",
    color: "#81C784", // Cor mais forte
  },
  {
    name: "Career",
    color: "#64B5F6", // Cor mais forte
  },
  {
    name: "Spirituality",
    color: "#4DB6AC", // Cor mais forte
  },
]

const CATEGORIES = [
  "Fitness",
  "Education",
  "Wellness",
  "Health",
  "Personal Development",
  "Productivity",
  "Hobbies",
  "Social",
  "Mindfulness",
  "Creativity",
  "Finance",
  "Relationships",
  "Career",
  "Spirituality",
]

export const priorities = [1, 2, 3, 4, 5]
export const difficulties = ["Easy", "Medium", "Hard"]
export const durations = ["15 mins", "30 mins", "45 mins", "1 hour", "2 hours"]

export const FREQUENCY_LABELS = ["daily", "weekly", "monthly"]
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
export const HABIT_DAYS = [
  { cod: 1, title: "Seg" },
  { cod: 2, title: "Ter" },
  { cod: 3, title: "Qua" },
  { cod: 4, title: "Qui" },
  { cod: 5, title: "Sex" },
  { cod: 6, title: "Sáb" },
  { cod: 7, title: "Dom" },
]

export const HABIT_WEEK_FREQUENCY_NUMBERS = [
  { cod: 1, title: "1" },
  { cod: 2, title: "2" },
  { cod: 3, title: "3" },
  { cod: 4, title: "4" },
  { cod: 5, title: "5" },
  { cod: 6, title: "6" },
  { cod: 7, title: "7" },
]
export const DAYS_LIST_OF_MONTH = [
  { cod: 1, title: "1" },
  { cod: 2, title: "2" },
  { cod: 3, title: "3" },
  { cod: 4, title: "4" },
  { cod: 5, title: "5" },
  { cod: 6, title: "6" },
  { cod: 7, title: "7" },
  { cod: 8, title: "8" },
  { cod: 9, title: "9" },
  { cod: 10, title: "10" },
  { cod: 11, title: "11" },
  { cod: 12, title: "12" },
  { cod: 13, title: "13" },
  { cod: 14, title: "14" },
  { cod: 15, title: "15" },
  { cod: 16, title: "16" },
  { cod: 17, title: "17" },
  { cod: 18, title: "18" },
  { cod: 19, title: "19" },
  { cod: 20, title: "20" },
  { cod: 21, title: "21" },
  { cod: 22, title: "22" },
  { cod: 23, title: "23" },
  { cod: 24, title: "24" },
  { cod: 25, title: "25" },
  { cod: 26, title: "26" },
  { cod: 27, title: "27" },
  { cod: 28, title: "28" },
  { cod: 29, title: "29" },
  { cod: 30, title: "30" },
  { cod: 31, title: "31" },
]

export const HABITS_TEST_DATA: HabitsType[] = [
  {
    id: "dcb7f001-9b0d-4c4f-9220-281127d3ed3e",
    name: "Todos os dias",
    description: "",
    icon: "fastfood",
    repeat: true,
    frequency: "DAILY",
    frequencySchedule: {
      daily: [1, 2, 3, 4, 5, 6, 7],
      weekly: 1,
      monthly: [16],
    },
    singleDate: {
      year: 2024,
      month: 7,
      day: 16,
      timestamp: 1721164680000,
      dateString: "2024-07-16",
    },
    goal: {
      hasGoal: false,
      goalType: "BY_UNITS",
      goalDetails: {
        hours: 0,
        minutes: 30,
        seconds: 0,
        count: 1,
        type: "TIME",
      },
    },
    createdDate: "2024-07-12T21:18:22.461Z",
    endDate: "",
    period: ["ANYTIME"],
    reminder: false,
    reminderTimes: [],
    color: "primary",
  },
  {
    id: "b346c975-bf93-4052-ab72-813c007f4fdf",
    name: "Ter, Qui, Dom",
    description: "",
    icon: "fastfood",
    repeat: true,
    frequency: "DAILY",
    frequencySchedule: {
      daily: [2, 4, 7],
      weekly: 1,
      monthly: [16],
    },
    singleDate: {
      year: 2024,
      month: 7,
      day: 16,
      timestamp: 1721164680000,
      dateString: "2024-07-16",
    },
    goal: {
      hasGoal: false,
      goalType: "BY_UNITS",
      goalDetails: {
        hours: 0,
        minutes: 30,
        seconds: 0,
        count: 1,
        type: "TIME",
      },
    },
    createdDate: "2024-07-16T21:18:22.461Z",
    endDate: "",
    period: ["ANYTIME"],
    reminder: false,
    reminderTimes: [],
    color: "primary",
  },
  {
    id: "4f0887fe-eb38-4916-aa69-4403920b49fe",
    name: "3x na semana",
    description: "",
    icon: "emoji-objects",
    repeat: true,
    frequency: "WEEKLY",
    frequencySchedule: {
      daily: [1, 2, 3, 4, 5, 6, 7],
      weekly: 3,
      monthly: [16],
    },
    singleDate: {
      year: 2024,
      month: 7,
      day: 16,
      timestamp: 1721164680000,
      dateString: "2024-07-16",
    },
    goal: {
      hasGoal: false,
      goalType: "BY_UNITS",
      goalDetails: {
        hours: 0,
        minutes: 30,
        seconds: 0,
        count: 1,
        type: "TIME",
      },
    },
    createdDate: "2024-07-16T21:18:22.461Z",
    endDate: "",
    period: ["ANYTIME"],
    reminder: false,
    reminderTimes: [],
    color: "red",
  },
  {
    id: "b5cdbefd-f917-4bf6-9df2-930460e3340f",
    name: "1x na semana",
    description: "",
    icon: "favorite",
    repeat: true,
    frequency: "WEEKLY",
    frequencySchedule: {
      daily: [1, 2, 3, 4, 5, 6, 7],
      weekly: 1,
      monthly: [16],
    },
    singleDate: {
      year: 2024,
      month: 7,
      day: 16,
      timestamp: 1721164680000,
      dateString: "2024-07-16",
    },
    goal: {
      hasGoal: false,
      goalType: "BY_UNITS",
      goalDetails: {
        hours: 0,
        minutes: 30,
        seconds: 0,
        count: 1,
        type: "TIME",
      },
    },
    createdDate: "2024-07-16T21:18:22.461Z",
    endDate: "",
    period: ["ANYTIME"],
    reminder: false,
    reminderTimes: [],
    color: "pink",
  },
  {
    id: "cb2adbe2-394d-4d30-990c-8e0175616cce",
    name: "todo dia 10 e 30",
    description: "",
    icon: "emoji-people",
    repeat: true,
    frequency: "MONTHLY",
    frequencySchedule: {
      daily: [1, 2, 3, 4, 5, 6, 7],
      weekly: 1,
      monthly: [10, 30],
    },
    singleDate: {
      year: 2024,
      month: 7,
      day: 16,
      timestamp: 1721164680000,
      dateString: "2024-07-16",
    },
    goal: {
      hasGoal: false,
      goalType: "BY_UNITS",
      goalDetails: {
        hours: 0,
        minutes: 30,
        seconds: 0,
        count: 1,
        type: "TIME",
      },
    },
    createdDate: "2024-07-16T21:18:22.461Z",
    endDate: "",
    period: ["ANYTIME"],
    reminder: false,
    reminderTimes: [],
    color: "lightPurple",
  },
  {
    id: "1b9de2eb-f67d-4fef-b1c3-578cbe5a9571",
    name: "todo dia 15",
    description: "",
    icon: "fastfood",
    repeat: true,
    frequency: "MONTHLY",
    frequencySchedule: {
      daily: [1, 2, 3, 4, 5, 6, 7],
      weekly: 1,
      monthly: [15],
    },
    singleDate: {
      year: 2024,
      month: 7,
      day: 16,
      timestamp: 1721164680000,
      dateString: "2024-07-16",
    },
    goal: {
      hasGoal: false,
      goalType: "BY_UNITS",
      goalDetails: {
        hours: 0,
        minutes: 30,
        seconds: 0,
        count: 1,
        type: "TIME",
      },
    },
    createdDate: "2024-07-16T21:18:22.461Z",
    endDate: "",
    period: ["ANYTIME"],
    reminder: false,
    reminderTimes: [],
    color: "purple",
  },
  {
    id: "d932cc01-c331-46d4-9536-f5e1dd5e1093",
    name: "só uma vez 20/07",
    description: "",
    icon: "directions-bike",
    repeat: false,
    frequency: "DAILY",
    frequencySchedule: {
      daily: [1, 2, 3, 4, 5, 6, 7],
      weekly: 1,
      monthly: [16],
    },
    singleDate: {
      year: 2024,
      month: 7,
      day: 20,
      timestamp: 1721433600000,
      dateString: "2024-07-20",
    },
    goal: {
      hasGoal: false,
      goalType: "BY_UNITS",
      goalDetails: {
        hours: 0,
        minutes: 30,
        seconds: 0,
        count: 1,
        type: "TIME",
      },
    },
    createdDate: "2024-07-16T21:18:22.461Z",
    endDate: "",
    period: ["ANYTIME"],
    reminder: false,
    reminderTimes: [],
    color: "orange",
  },
  {
    id: "2ce9636c-4d79-452c-9cc6-c0a31f1c14eb",
    name: "todos os dias com data de término ",
    description: "",
    icon: "smoke-free",
    repeat: true,
    frequency: "DAILY",
    frequencySchedule: {
      daily: [1, 2, 3, 4, 5, 6, 7],
      weekly: 1,
      monthly: [16],
    },
    singleDate: {
      year: 2024,
      month: 7,
      day: 16,
      timestamp: 1721164680000,
      dateString: "2024-07-16",
    },
    goal: {
      hasGoal: false,
      goalType: "BY_UNITS",
      goalDetails: {
        hours: 0,
        minutes: 30,
        seconds: 0,
        count: 1,
        type: "TIME",
      },
    },
    createdDate: "2024-07-16T21:18:22.461Z",
    endDate: "2024-07-31",
    period: ["ANYTIME"],
    reminder: false,
    reminderTimes: [],
    color: "yellow",
  },
  {
    id: "7c7d1755-91af-427e-ab53-13e6da675bf2",
    name: "2x na semana com data de termino",
    description: "",
    icon: "mood",
    repeat: true,
    frequency: "WEEKLY",
    frequencySchedule: {
      daily: [1, 2, 3, 4, 5, 6, 7],
      weekly: 2,
      monthly: [16],
    },
    singleDate: {
      year: 2024,
      month: 7,
      day: 16,
      timestamp: 1721164680000,
      dateString: "2024-07-16",
    },
    goal: {
      hasGoal: false,
      goalType: "BY_UNITS",
      goalDetails: {
        hours: 0,
        minutes: 30,
        seconds: 0,
        count: 1,
        type: "TIME",
      },
    },
    createdDate: "2024-07-16T21:18:22.461Z",
    endDate: "2024-08-20",
    period: ["ANYTIME"],
    reminder: false,
    reminderTimes: [],
    color: "green",
  },
  {
    id: "357ea00c-f06d-4261-8114-2eb24003b8f3",
    name: "Meta: 1x por dia",
    description: "",
    icon: "handyman",
    repeat: true,
    frequency: "DAILY",
    frequencySchedule: {
      daily: [1, 3, 4, 5, 7],
      weekly: 1,
      monthly: [16],
    },
    singleDate: {
      year: 2024,
      month: 7,
      day: 16,
      timestamp: 1721164680000,
      dateString: "2024-07-16",
    },
    goal: {
      hasGoal: true,
      goalType: "BY_UNITS",
      goalDetails: {
        hours: 0,
        minutes: 30,
        seconds: 0,
        count: 1,
        type: "TIME",
      },
    },
    createdDate: "2024-07-16T21:18:22.461Z",
    endDate: "",
    period: ["ANYTIME"],
    reminder: false,
    reminderTimes: [],
    color: "teal",
  },
  {
    id: "567c4298-4bcb-46a5-99e5-89a0f284dc33",
    name: "Meta: 8 copos m/t/n",
    description: "",
    icon: "water-drop",
    repeat: true,
    frequency: "DAILY",
    frequencySchedule: {
      daily: [1, 2, 3, 4, 5, 6, 7],
      weekly: 1,
      monthly: [16],
    },
    singleDate: {
      year: 2024,
      month: 7,
      day: 16,
      timestamp: 1721164680000,
      dateString: "2024-07-16",
    },
    goal: {
      hasGoal: true,
      goalType: "BY_UNITS",
      goalDetails: {
        hours: 0,
        minutes: 30,
        seconds: 0,
        count: 4,
        type: "CUP",
      },
    },
    createdDate: "2024-07-16T21:18:22.461Z",
    endDate: "",
    period: ["MORNING", "AFTERNOON", "NIGHT"],
    reminder: false,
    reminderTimes: [],
    color: "blue",
  },
  {
    id: "b3919743-0e69-4e95-8301-0bc65250aa16",
    name: "Meta: 20 paginas / Noite",
    description: "",
    icon: "book",
    repeat: true,
    frequency: "DAILY",
    frequencySchedule: {
      daily: [1, 2, 3, 4, 5, 6],
      weekly: 1,
      monthly: [16],
    },
    singleDate: {
      year: 2024,
      month: 7,
      day: 16,
      timestamp: 1721164680000,
      dateString: "2024-07-16",
    },
    goal: {
      hasGoal: true,
      goalType: "BY_UNITS",
      goalDetails: {
        hours: 0,
        minutes: 30,
        seconds: 0,
        count: 20,
        type: "PAGE",
      },
    },
    createdDate: "2024-07-16T21:18:22.461Z",
    endDate: "",
    period: ["NIGHT"],
    reminder: false,
    reminderTimes: [],
    color: "red",
  },
  {
    id: "aa3df3ae-2b9a-496b-990f-e64d59fda39f",
    name: "Meta: 10 Quilometros - tarde",
    description: "",
    icon: "directions-bike",
    repeat: true,
    frequency: "WEEKLY",
    frequencySchedule: {
      daily: [1, 2, 3, 4, 5, 6, 7],
      weekly: 4,
      monthly: [16],
    },
    singleDate: {
      year: 2024,
      month: 7,
      day: 16,
      timestamp: 1721164680000,
      dateString: "2024-07-16",
    },
    goal: {
      hasGoal: true,
      goalType: "BY_UNITS",
      goalDetails: {
        hours: 0,
        minutes: 30,
        seconds: 0,
        count: 10,
        type: "KILOMETER",
      },
    },
    createdDate: "2024-07-16T21:18:22.461Z",
    endDate: "",
    period: ["AFTERNOON"],
    reminder: false,
    reminderTimes: [],
    color: "purple",
  },
  {
    id: "a5eff4f4-7c87-4ac6-9238-0f971c705f25",
    name: "Meta: Tempo 1,30,10 - manha - dias aleatorios",
    description: "",
    icon: "sports-basketball",
    repeat: true,
    frequency: "MONTHLY",
    frequencySchedule: {
      daily: [1, 2, 3, 4, 5, 6, 7],
      weekly: 1,
      monthly: [1, 2, 3, 10, 12, 13, 14, 16, 19, 21, 25, 29],
    },
    singleDate: {
      year: 2024,
      month: 7,
      day: 16,
      timestamp: 1721164680000,
      dateString: "2024-07-16",
    },
    goal: {
      hasGoal: true,
      goalType: "BY_TIME",
      goalDetails: {
        hours: 1,
        minutes: 30,
        seconds: 10,
        count: 1,
        type: "TIME",
      },
    },
    createdDate: "2024-07-16T21:18:22.461Z",
    endDate: "",
    period: ["MORNING"],
    reminder: false,
    reminderTimes: [],
    color: "yellow",
  },
  {
    id: "1bafaa9e-8369-467b-bc27-15d1c672a39b",
    name: "Com descricao e lembrete de horario",
    description: "lorem impsum hah akdwkadha kjwdhauwdhiawnbdkjawdaw wa",
    icon: "self-improvement",
    repeat: true,
    frequency: "DAILY",
    frequencySchedule: {
      daily: [1, 2, 3, 4, 5, 6, 7],
      weekly: 1,
      monthly: [16],
    },
    singleDate: {
      year: 2024,
      month: 7,
      day: 16,
      timestamp: 1721164680000,
      dateString: "2024-07-16",
    },
    goal: {
      hasGoal: true,
      goalType: "BY_TIME",
      goalDetails: {
        hours: 0,
        minutes: 30,
        seconds: 0,
        count: 1,
        type: "TIME",
      },
    },
    createdDate: "2024-07-16T21:18:22.461Z",
    endDate: "",
    period: ["ANYTIME"],
    reminder: true,
    reminderTimes: ["22:00"],
    color: "orange",
  },
]
