const APP_CONSTANTS = {
  DATA: {
    FIRST_TIME_ON_APP: "first_time_on_app",
    SELECTED_DATE: "selected_date",
  },
  NAV: {
    HABITS_HOME: "(habits)",
    SETTINGS: "settings",
    STATS: "stats",
    HABIT_MANAGER: "habitsManager",
  },
  IMAGES: {
    SCENE_1: "/assets/images/header-img-principal-opacity.png",
    SCENE_2: "@/assets/images/scene_1-sky-and-birds.png",
  },
  HABIT: {
    FREQUENCY: {
      DAILY: "DAILY" as const,
      WEEKLY: "WEEKLY" as const,
      MONTHLY: "MONTHLY" as const,
      YEARLY: "YEARLY" as const,
      SINGLE: "SINGLE" as const,
    },
    GOAL: {
      GOAL_LABELS: [
        {
          LABEL: "Quantidade" as const,
          VALUE: "BY_UNITS" as const,
        },
        {
          LABEL: "Tempo" as const,
          VALUE: "BY_TIME" as const,
        },
      ],
      GOAL_UNITS_VALUES: ["TIME", "CUP", "PAGE", "KILOMETER"],
      GOAL_WHEEL_PICKER: {
        TIME: [
          {
            value: [0, 23],
            type: "RANGE",
            title: "Hora",
            sufix: "h",
            keyValue: "hours",
          },
          {
            value: [0, 59],
            type: "RANGE",
            title: "Minuto",
            sufix: "min",
            keyValue: "minutes",
          },
          ,
          {
            value: [0, 59],
            type: "RANGE",
            title: "Segundos",
            sufix: "s",
            keyValue: "seconds",
          },
        ],
        UNITS: [
          {
            value: [1, 999],
            type: "RANGE",
            title: "Quantidade",
            keyValue: "count",
          },
          {
            label: ["Vez", "Copo", "Pagina", "Quilometro"],
            value: ["TIME", "CUP", "PAGE", "KILOMETER"],
            type: "TEXT",
            title: "Qual o tipo de medida?",
            keyValue: "type",
          },
        ],
      },
      GOAL_DETAILS_INITIAL_VALUES: {
        hours: 0,
        minutes: 30,
        seconds: 0,
        count: 1,
        type: "TIME", // "TIME" | "CUP" | "PAGE" | "KILOMETER"
      },
    },
    HABIT_ICONS: [
      { key: "1", name: "check-circle", description: "To mark completed tasks" },
      { key: "2", name: "alarm", description: "To set habit reminders" },
      { key: "3", name: "fitness-center", description: "For physical activities" },
      { key: "4", name: "restaurant", description: "For healthy eating habits" },
      { key: "5", name: "bedtime", description: "To track sleep schedules" },
      { key: "6", name: "water-drop", description: "To monitor water intake" },
      { key: "7", name: "directions-walk", description: "For daily walks and steps" },
      { key: "8", name: "book", description: "For daily reading" },
      { key: "9", name: "self-improvement", description: "For meditation and mindfulness" },
      { key: "10", name: "brush", description: "For hygiene habits like brushing teeth" },
      { key: "11", name: "eco", description: "For eco-friendly and sustainable habits" },
      { key: "12", name: "health-and-safety", description: "For health habits" },
      { key: "13", name: "calendar-today", description: "For habit calendar view" },
      { key: "14", name: "favorite", description: "For favorite or most important habits" },
      { key: "15", name: "sports-basketball", description: "For sports activities" },
      { key: "16", name: "hiking", description: "For hiking and outdoor activities" },
      { key: "17", name: "music-note", description: "For music practice or listening to music" },
      { key: "18", name: "wb-sunny", description: "For outdoor weather-related habits" },
      { key: "19", name: "smoke-free", description: "To monitor non-smoking habit" },
      { key: "20", name: "mood", description: "To track daily mood" },
      { key: "21", name: "nature", description: "For outdoor activities" },
      { key: "22", name: "spa", description: "For relaxation habits" },
      { key: "23", name: "fastfood", description: "For eating habits" },
      { key: "24", name: "local-drink", description: "To monitor beverage consumption" },
      { key: "25", name: "directions-bike", description: "For cycling" },
      { key: "26", name: "emoji-people", description: "For social interactions" },
      { key: "27", name: "emoji-objects", description: "For hobbies and interests" },
      { key: "28", name: "emoji-nature", description: "For nature activities" },
      { key: "29", name: "emoji-food-beverage", description: "For food and drink habits" },
      { key: "30", name: "flaky", description: "To monitor consistency" },
      { key: "31", name: "cleaning-services", description: "For cleaning habits" },
      { key: "32", name: "psychology", description: "To monitor mental health" },
      { key: "33", name: "science", description: "For scientific activities" },
      { key: "34", name: "sports-soccer", description: "For sports activities" },
      { key: "35", name: "travel-explore", description: "For travel and exploration habits" },
      { key: "36", name: "handyman", description: "For DIY activities" },
      { key: "37", name: "biotech", description: "For health monitoring" },
      { key: "38", name: "architecture", description: "For design and planning" },
      { key: "39", name: "volunteer-activism", description: "For volunteering and activism" },
    ],
  },
}

export default APP_CONSTANTS
