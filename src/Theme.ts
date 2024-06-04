const primaryColor = "#00ADB5"

interface ColorShades {
  [key: string]: string
}

interface Theme {
  colors: {
    [key: string]: ColorShades
  }
  spaces: {
    defaultSpace: number
    [key: string]: string | number
  }
  font: {
    sizes: {
      [key: string]: number
    }
    familyDefault: {
      [key: string]: string
    }
  }
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
      light: "#393E46",
      base: "#222831",
      dark: "#232323",
      darkest: "#000000",
    },
    white: {
      lightest: "#FFFFFF",
      light: "#F8FAED",
      base: "#EEEEEE",
      dark: "#DEDEDE",
    },
  },
  spaces: {
    defaultSpace: 16,
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
}

export { theme }
