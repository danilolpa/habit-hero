import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    // salvar erro
    console.error("Erro ao salvar dado", e)
  }
}

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    // ler erro
    console.error("Erro ao ler dado", e)
  }
}

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (e) {
    // remover erro
    console.error("Erro ao remover dado", e)
  }
}

export const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys()
  } catch (e) {
    console.error("Erro ao obter todas as chaves", e)
  }
}
