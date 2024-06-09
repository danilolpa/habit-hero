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
  durationMinutes: number
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

export const priorities = [1, 2, 3, 4, 5]
export const difficulties = ["Easy", "Medium", "Hard"]
export const durations = ["15 mins", "30 mins", "45 mins", "1 hour", "2 hours"]
export const frequencies = ["Daily", "Weekly", "Monthly"]

export const HABITS_DATA: HabitsType[] = [
  {
    id: 1,
    name: "Corrida todas as manhãs para manter a forma",
    description: "Corrida todas as manhãs para manter a forma.",
    completed: false,
    date: "2024-07-21T06:39:14-03:00",
    icon: "directions-run",
    category: "Fitness",
    priority: 1,
    duration: "30 mins",
    durationMinutes: 30,
    frequency: "Diário",
    goal: 30,
    progress: 10,
    createdBy: "Usuario1",
    notes: "Corrida matinal ao redor do parque.",
    tags: ["fitness", "saúde"],
    reminder: true,
    color: categories.find((cat) => cat.name === "Fitness")?.color ?? "#000",
    difficulty: "Medium",
  },
  {
    id: 2,
    name: "Ler um Livro",
    description: "Ler um novo livro toda semana.",
    completed: true,
    date: "2024-06-10T08:00:00-03:00",
    icon: "menu-book",
    category: "Education",
    priority: 2,
    duration: "1 hora",
    durationMinutes: 60,
    frequency: "Semanal",
    goal: 10,
    progress: 7,
    createdBy: "Usuario2",
    notes: "Focar em livros de desenvolvimento pessoal.",
    tags: ["leitura", "educação"],
    reminder: false,
    color: categories.find((cat) => cat.name === "Education")?.color ?? "#000",
    difficulty: "Easy",
  },
  {
    id: 3,
    name: "Meditação",
    description: "Meditação diária para clareza mental.",
    completed: false,
    date: "2024-05-15T14:30:00-03:00",
    icon: "self-improvement",
    category: "Wellness",
    priority: 3,
    duration: "15 mins",
    durationMinutes: 15,
    frequency: "Diário",
    goal: 20,
    progress: 5,
    createdBy: "Usuario3",
    notes: "Use aplicativos de meditação guiada.",
    tags: ["mindfulness", "relaxamento"],
    reminder: true,
    color: categories.find((cat) => cat.name === "Wellness")?.color ?? "#000",
    difficulty: "Easy",
  },
  {
    id: 4,
    name: "Prática de Yoga",
    description: "Sessões semanais de yoga para melhorar a flexibilidade.",
    completed: true,
    date: "2024-04-01T09:00:00-03:00",
    icon: "fitness-center",
    category: "Fitness",
    priority: 1,
    duration: "45 mins",
    durationMinutes: 45,
    frequency: "Semanal",
    goal: 5,
    progress: 3,
    createdBy: "Usuario4",
    notes: "Participar de uma aula de yoga local.",
    tags: ["yoga", "flexibilidade"],
    reminder: false,
    color: categories.find((cat) => cat.name === "Fitness")?.color ?? "#000",
    difficulty: "Medium",
  },
  {
    id: 5,
    name: "Treinamento de Força",
    description: "Sessões de treinamento de força na academia.",
    completed: false,
    date: "2024-07-19T17:00:00-03:00",
    icon: "fitness-center",
    category: "Health",
    priority: 2,
    duration: "1 hora",
    durationMinutes: 60,
    frequency: "Diário",
    goal: 40,
    progress: 25,
    createdBy: "Usuario5",
    notes: "Seguir um plano de treino estruturado.",
    tags: ["força", "academia"],
    reminder: true,
    color: categories.find((cat) => cat.name === "Health")?.color ?? "#000",
    difficulty: "Hard",
  },
  {
    id: 6,
    name: "Alimentação Saudável",
    description: "Preparar e comer refeições saudáveis.",
    completed: true,
    date: "2024-03-12T11:00:00-03:00",
    icon: "restaurant",
    category: "Health",
    priority: 3,
    duration: "1 hora",
    durationMinutes: 60,
    frequency: "Diário",
    goal: 30,
    progress: 20,
    createdBy: "Usuario6",
    notes: "Focar em uma dieta equilibrada e nutrição.",
    tags: ["nutrição", "saúde"],
    reminder: false,
    color: categories.find((cat) => cat.name === "Health")?.color ?? "#000",
    difficulty: "Medium",
  },
  {
    id: 7,
    name: "Aprendizado de Línguas",
    description: "Praticar um novo idioma diariamente.",
    completed: false,
    date: "2024-09-10T13:00:00-03:00",
    icon: "translate",
    category: "Education",
    priority: 1,
    duration: "30 mins",
    durationMinutes: 30,
    frequency: "Diário",
    goal: 25,
    progress: 10,
    createdBy: "Usuario7",
    notes: "Usar aplicativos de aprendizado de idiomas.",
    tags: ["aprendizado", "idioma"],
    reminder: true,
    color: categories.find((cat) => cat.name === "Education")?.color ?? "#000",
    difficulty: "Medium",
  },
  {
    id: 8,
    name: "Corrida",
    description: "Correr à noite.",
    completed: true,
    date: "2024-11-20T15:00:00-03:00",
    icon: "directions-run",
    category: "Fitness",
    priority: 2,
    duration: "30 mins",
    durationMinutes: 30,
    frequency: "Diário",
    goal: 50,
    progress: 40,
    createdBy: "Usuario8",
    notes: "Acompanhar distância e velocidade.",
    tags: ["corrida", "cardio"],
    reminder: false,
    color: categories.find((cat) => cat.name === "Fitness")?.color ?? "#000",
    difficulty: "Hard",
  },
  {
    id: 9,
    name: "Escrita de Diário",
    description: "Escrever uma entrada no diário todos os dias.",
    completed: false,
    date: "2024-08-05T16:00:00-03:00",
    icon: "create",
    category: "Personal Development",
    priority: 3,
    duration: "15 mins",
    durationMinutes: 15,
    frequency: "Diário",
    goal: 35,
    progress: 20,
    createdBy: "Usuario9",
    notes: "Refletir sobre as experiências e pensamentos diários.",
    tags: ["escrita", "reflexão"],
    reminder: true,
    color: categories.find((cat) => cat.name === "Personal Development")?.color ?? "#000",
    difficulty: "Easy",
  },
  {
    id: 10,
    name: "Natação",
    description: "Nadar para se manter ativo e saudável.",
    completed: true,
    date: "2024-12-01T18:00:00-03:00",
    icon: "pool",
    category: "Health",
    priority: 1,
    duration: "1 hora",
    durationMinutes: 60,
    frequency: "Semanal",
    goal: 60,
    progress: 50,
    createdBy: "Usuario10",
    notes: "Participar de um clube de natação local.",
    tags: ["natação", "fitness"],
    reminder: false,
    color: categories.find((cat) => cat.name === "Health")?.color ?? "#000",
    difficulty: "Medium",
  },
]
