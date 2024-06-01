// data.ts

import { MaterialIcons } from "@expo/vector-icons"

export interface HabitsType {
  id: number
  name: string
  description: string
  completed: boolean
  date: string
  icon: keyof typeof MaterialIcons.glyphMap
  category: string
  priority: number
  duration: string
  frequency: string
  goal: number
  progress: number
  createdBy: string
  notes: string
  tags: string[]
  reminder: boolean
  color: string
  difficulty: string
}

export type HabitsProps = (typeof HABITS_DATA)[0]

export const categories = [
  "Wellness",
  "Saúde",
  "Fitness",
  "Health",
  "Education",
  "Personal Development",
]
export const priorities = [1, 2, 3, 4, 5]
export const difficulties = ["Easy", "Medium", "Hard"]
export const durations = ["15 mins", "30 mins", "45 mins", "1 hour", "2 hours"]
export const frequencies = ["Daily", "Weekly", "Monthly"]

export const HABITS_DATA: HabitsType[] = [
  {
    id: 1,
    name: "Morning Jog",
    description: "Jogging every morning to stay fit.",
    completed: false,
    date: "2024-07-21T06:39:14-03:00",
    icon: "directions-run", // Ícone do Material Design: https://fonts.google.com/icons?selected=Material+Icons:directions_run
    category: "Fitness",
    priority: 1,
    duration: "30 mins",
    frequency: "Daily",
    goal: 30,
    progress: 10,
    createdBy: "User1",
    notes: "Morning jog around the park.",
    tags: ["fitness", "health"],
    reminder: true,
    color: "#FF5733",
    difficulty: "Medium",
  },
  {
    id: 2,
    name: "Read a Book",
    description: "Read a new book every week.",
    completed: true,
    date: "2024-06-10T08:00:00-03:00",
    icon: "menu-book", // Ícone do Material Design: https://fonts.google.com/icons?selected=Material+Icons:menu_book
    category: "Education",
    priority: 2,
    duration: "1 hour",
    frequency: "Weekly",
    goal: 10,
    progress: 7,
    createdBy: "User2",
    notes: "Focus on personal development books.",
    tags: ["reading", "education"],
    reminder: false,
    color: "#33FF57",
    difficulty: "Easy",
  },
  {
    id: 3,
    name: "Meditation",
    description: "Daily meditation for mental clarity.",
    completed: false,
    date: "2024-05-15T14:30:00-03:00",
    icon: "self-improvement", // Ícone do Material Design: https://fonts.google.com/icons?selected=Material+Icons:self_improvement
    category: "Wellness",
    priority: 3,
    duration: "15 mins",
    frequency: "Daily",
    goal: 20,
    progress: 5,
    createdBy: "User3",
    notes: "Use guided meditation apps.",
    tags: ["mindfulness", "relaxation"],
    reminder: true,
    color: "#3357FF",
    difficulty: "Easy",
  },
  {
    id: 4,
    name: "Yoga Practice",
    description: "Weekly yoga sessions to improve flexibility.",
    completed: true,
    date: "2024-04-01T09:00:00-03:00",
    icon: "fitness-center", // Ícone do Material Design: https://fonts.google.com/icons?selected=Material+Icons:fitness_center
    category: "Fitness",
    priority: 1,
    duration: "45 mins",
    frequency: "Weekly",
    goal: 5,
    progress: 3,
    createdBy: "User4",
    notes: "Join a local yoga class.",
    tags: ["yoga", "flexibility"],
    reminder: false,
    color: "#FF33A1",
    difficulty: "Medium",
  },
  {
    id: 5,
    name: "Strength Training",
    description: "Strength training sessions at the gym.",
    completed: false,
    date: "2024-07-19T17:00:00-03:00",
    icon: "fitness-center", // Ícone do Material Design: https://fonts.google.com/icons?selected=Material+Icons:fitness_center
    category: "Health",
    priority: 2,
    duration: "1 hour",
    frequency: "Daily",
    goal: 40,
    progress: 25,
    createdBy: "User5",
    notes: "Follow a structured workout plan.",
    tags: ["strength", "gym"],
    reminder: true,
    color: "#FFA133",
    difficulty: "Hard",
  },
  {
    id: 6,
    name: "Healthy Eating",
    description: "Prepare and eat healthy meals.",
    completed: true,
    date: "2024-03-12T11:00:00-03:00",
    icon: "restaurant", // Ícone do Material Design: https://fonts.google.com/icons?selected=Material+Icons:restaurant
    category: "Health",
    priority: 3,
    duration: "1 hour",
    frequency: "Daily",
    goal: 30,
    progress: 20,
    createdBy: "User6",
    notes: "Focus on balanced diet and nutrition.",
    tags: ["nutrition", "health"],
    reminder: false,
    color: "#57FF33",
    difficulty: "Medium",
  },
  {
    id: 7,
    name: "Language Learning",
    description: "Practice a new language daily.",
    completed: false,
    date: "2024-09-10T13:00:00-03:00",
    icon: "translate", // Ícone do Material Design: https://fonts.google.com/icons?selected=Material+Icons:translate
    category: "Education",
    priority: 1,
    duration: "30 mins",
    frequency: "Daily",
    goal: 25,
    progress: 10,
    createdBy: "User7",
    notes: "Use language learning apps.",
    tags: ["learning", "language"],
    reminder: true,
    color: "#33FFA1",
    difficulty: "Medium",
  },
  {
    id: 8,
    name: "Running",
    description: "Go for a run in the evening.",
    completed: true,
    date: "2024-11-20T15:00:00-03:00",
    icon: "directions-run", // Ícone do Material Design: https://fonts.google.com/icons?selected=Material+Icons:directions_run
    category: "Fitness",
    priority: 2,
    duration: "30 mins",
    frequency: "Daily",
    goal: 50,
    progress: 40,
    createdBy: "User8",
    notes: "Track distance and speed.",
    tags: ["running", "cardio"],
    reminder: false,
    color: "#A133FF",
    difficulty: "Hard",
  },
  {
    id: 9,
    name: "Journal Writing",
    description: "Write a journal entry every day.",
    completed: false,
    date: "2024-08-05T16:00:00-03:00",
    icon: "create", // Ícone do Material Design: https://fonts.google.com/icons?selected=Material+Icons:create
    category: "Personal Development",
    priority: 3,
    duration: "15 mins",
    frequency: "Daily",
    goal: 35,
    progress: 20,
    createdBy: "User9",
    notes: "Reflect on daily experiences and thoughts.",
    tags: ["writing", "reflection"],
    reminder: true,
    color: "#FF5733",
    difficulty: "Easy",
  },
  {
    id: 10,
    name: "Swimming",
    description: "Swim to stay active and healthy.",
    completed: true,
    date: "2024-12-01T18:00:00-03:00",
    icon: "pool", // Ícone do Material Design: https://fonts.google.com/icons?selected=Material+Icons:pool
    category: "Health",
    priority: 1,
    duration: "1 hour",
    frequency: "Weekly",
    goal: 60,
    progress: 50,
    createdBy: "User10",
    notes: "Join a local swimming club.",
    tags: ["swimming", "fitness"],
    reminder: false,
    color: "#33A1FF",
    difficulty: "Medium",
  },
]
