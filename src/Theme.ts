export const primaryColor = "#00ADB5"

interface ColorShades {
  lightest?: string
  lighter?: string
  light?: string
  base: string
  dark?: string
  darkest?: string
}
export type HabitColorNameType =
  | "primary"
  | "red"
  | "pink"
  | "lightPurple"
  | "purple"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "blue"

export interface HabitColorType {
  name: HabitColorNameType
  hex: string
  rgb: string
  rgba: string
  contrastColor: string
}

interface Theme {
  colors: {
    [key: string]: ColorShades
  }
  spaces: {
    defaultSpace: number
    [key: string]: string | number
  }
  radius: {
    [key: string]: number
  }
  font: {
    sizes: {
      [key: string]: number
    }
    familyDefault: {
      [key: string]: string
    }
  }
  habitColors: HabitColorType[]
}

// Definindo as cores principais
// Guia para nomes de cores:
// lightest, lighter, light: lighten, base, dark, darker, darkest
// Paleta de cores: https://colorhunt.co/palette/222831393e4600adb5eeeeee

const theme: Theme = {
  colors: {
    primary: {
      light: "#18f8f4",
      base: primaryColor,
      dark: "#125d67",
    },
    black: {
      lightest: "#444d5e",
      lighter: "#3C4555",
      light: "#2B323E",
      base: "#222831",
      dark: "#232323",
      darkest: "#000000",
    },
    white: {
      lightest: "#FFFFFF",
      lighter: "#ebeced",
      light: "#F8FAED",
      base: "#EEEEEE",
      dark: "#DEDEDE",
      darkest: "#828282",
    },
    green: {
      base: "#379777",
    },
    yellow: {
      base: "#FFB74D",
    },
    red: {
      base: "#DD5746",
    },
    blue: {
      base: "#5A72A0",
    },
    orange: {
      base: "#EF9C66",
    },
  },
  spaces: {
    defaultSpace: 16,
  },
  radius: {
    radius8: 8,
    radius16: 16,
    radius20: 20,
    radius24: 24,
  },
  font: {
    sizes: {
      fontSize12: 12,
      fontSize14: 14,
      fontSize16: 16,
      fontSize18: 18,
      fontSize20: 20,
      fontSize24: 24,
      fontSize28: 28,
      fontSize32: 32,
      fontSize36: 36,
      fontSize40: 40,
      fontSize48: 48,
      fontSize56: 56,
    },
    familyDefault: {
      extraLight: "Mukta-ExtraLight",
      light: "Mukta-Light",
      regular: "Mukta-Regular",
      medium: "Mukta-Medium",
      semiBold: "Mukta-SemiBold",
      bold: "Mukta-Bold",
      extraBold: "Mukta-ExtraBold",
    },
  },
  habitColors: [
    {
      name: "primary",
      hex: "#00ADB5",
      rgb: "rgb(0, 173, 181)",
      rgba: "rgba(0, 173, 181, 0.5)",
      contrastColor: "#FFFFFF",
    },
    {
      name: "red",
      hex: "#FF6666",
      rgb: "rgb(255, 102, 102)",
      rgba: "rgba(255, 102, 102, 0.5)",
      contrastColor: "#FFFFFF",
    },
    {
      name: "pink",
      hex: "#F06292",
      rgb: "rgb(240, 98, 146)",
      rgba: "rgba(240, 98, 146, 0.5)",
      contrastColor: "#FFFFFF",
    },
    {
      name: "lightPurple",
      hex: "#BA68C8",
      rgb: "rgb(186, 104, 200)",
      rgba: "rgba(186, 104, 200, 0.5)",
      contrastColor: "#FFFFFF",
    },
    {
      name: "purple",
      hex: "#9575CD",
      rgb: "rgb(149, 117, 205)",
      rgba: "rgba(149, 117, 205, 0.5)",
      contrastColor: "#FFFFFF",
    },
    {
      name: "orange",
      hex: "#FFB74D",
      rgb: "rgb(255, 183, 77)",
      rgba: "rgba(255, 183, 77, 0.5)",
      contrastColor: "#232323",
    },
    {
      name: "yellow",
      hex: "#FFD54F",
      rgb: "rgb(255, 213, 79)",
      rgba: "rgba(255, 213, 79, 0.5)",
      contrastColor: "#232323",
    },
    {
      name: "green",
      hex: "#81C784",
      rgb: "rgb(129, 199, 132)",
      rgba: "rgba(129, 199, 132, 0.5)",
      contrastColor: "#FFFFFF",
    },
    {
      name: "teal",
      hex: "#4DB6AC",
      rgb: "rgb(77, 182, 172)",
      rgba: "rgba(77, 182, 172, 0.5)",
      contrastColor: "#232323",
    },
    {
      name: "blue",
      hex: "#64B5F6",
      rgb: "rgb(100, 181, 246)",
      rgba: "rgba(100, 181, 246, 0.5)",
      contrastColor: "#232323",
    },
  ],
}

const getColorHexByName = (name: string) => {
  const color = theme.habitColors.find((c) => c.name === name)
  return color?.hex ? color?.hex : primaryColor
}

const getColorNameByHex = (hex: string) => {
  const color = theme.habitColors.find((c) => c.hex === hex)
  return color?.name
}
const getColorContrastColorByHex = (hex: string) => {
  const color = theme.habitColors.find((c) => c.hex === hex)
  return color?.contrastColor || theme.colors.white.base
}

export { theme, getColorHexByName, getColorNameByHex, getColorContrastColorByHex }
