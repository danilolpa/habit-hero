import { Platform } from "react-native"

const usePlatformContent = (platform: "ios" | "android", content: any) => {
  if (Platform.OS === platform) {
    return content
  }
  return null
}

export default usePlatformContent
