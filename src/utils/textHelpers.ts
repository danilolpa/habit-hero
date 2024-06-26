const capitalizeFirstLetter = (string: string) => {
  if (typeof string !== "string" || string.length === 0) {
    throw new Error("Text must be a non-empty string")
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const pluralizeIfNeeded = (string: string, quantity: number) => {
  if (typeof string !== "string" || string.length === 0) {
    throw new Error("Text must be a non-empty string")
  }

  if (string.endsWith("s")) {
    return string
  }
  if (quantity > 1) {
    return string + "s"
  }
  return string
}

export { capitalizeFirstLetter, pluralizeIfNeeded }
