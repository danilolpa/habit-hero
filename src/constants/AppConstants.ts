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
      DAILY: "daily" as const,
      WEEKLY: "weekly" as const,
      MONTHLY: "monthly" as const,
      YEARLY: "yearly" as const,
      SINGLE: "single" as const,
    },
  },
}

export default APP_CONSTANTS
