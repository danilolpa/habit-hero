import AsyncStorage from "@react-native-async-storage/async-storage"

const storage = AsyncStorage

export const getData = async (key: string): Promise<string | null> => {
  try {
    const value = await storage.getItem(key)
    return value
  } catch (error) {
    console.error(`Failed to get data for key ${key}:`, error)
    return null
  }
}

export const storeData = async (key: string, value: string): Promise<void> => {
  try {
    console.log("storeData key:", key)
    console.log("storeData value:", value)
    storage.clear()

    await storage.setItem(key, value)
  } catch (error) {
    console.error(`Failed to store data for key ${key}:`, error)
  }
}

export const removeData = async (key: string): Promise<void> => {
  try {
    await storage.removeItem(key)
  } catch (error) {
    console.error(`Failed to remove data for key ${key}:`, error)
  }
}

export const getAllKeys = async (): Promise<string[]> => {
  try {
    const keys = await storage.getAllKeys()
    return keys ?? []
  } catch (error) {
    console.error("Failed to get all keys:", error)
    return []
  }
}
export const clearAll = async (): Promise<void> => {
  try {
    await storage.clear()
  } catch (error) {
    console.error("Failed to clear all data:", error)
  }
}
