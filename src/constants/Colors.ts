const tintColorLight = "#00ADB5"
const tintColorDark = "#fff"

const primaryColor = "#00ADB5"
const secondaryColor = "#00ADB5"

const Colors = {
  light: {
    text: "#000",
    background: "#f59",
    tint: primaryColor,
    tabIconDefault: "#ccc",
    tabIconSelected: primaryColor,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: primaryColor,
    tabIconDefault: "#ccc",
    tabIconSelected: primaryColor,
  },
}

// Definindo o tipo de um tema de cores
interface ThemeColors {
  primary: string
  secondary: string
  background: string
  text: string
  [key: string]: string
}

// Definindo as cores principais
const mainColors: ThemeColors = {
  text: "#000",
  background: "#9f5",
  tint: primaryColor,
  tabIconDefault: "#ccc",
  tabIconSelected: primaryColor,
  primary: "",
  secondary: "",
}

// Função para criar um tema estendendo as cores principais
const createTheme = (overrides: Partial<ThemeColors>): ThemeColors => {
  return {
    ...mainColors,
    ...overrides,
  }
}

const darkTheme = createTheme({
  background: "#2c3e50",
  text: "#ecf0f1",
})

const lightTheme = createTheme({
  background: "#f90",
  text: "#000000",
})

const getThemeColors = (colorScheme?: "light" | "dark") => {
  return colorScheme === "light" ? lightTheme : darkTheme
}

export { mainColors, darkTheme, lightTheme, createTheme, Colors, getThemeColors }
