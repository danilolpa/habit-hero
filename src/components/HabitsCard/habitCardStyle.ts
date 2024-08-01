import { theme } from "@/Theme"
import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
  card: {
    marginTop: 10,
    borderRadius: 20,
    borderCurve: "circular",
    display: "flex",
    flexDirection: "row",
    gap: 4,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: theme.spaces.defaultSpace,
    paddingLeft: theme.spaces.defaultSpace,
    borderBottomWidth: 3,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: theme.colors.black.darkest,
    minHeight: 70,
  },
  cardContentIcon: {
    display: "flex",
    fontSize: 30,
  },

  cardContentCenter: {
    display: "flex",
    flexGrow: 1,
    marginLeft: 8,
    paddingVertical: 5,
    flexShrink: 1,
  },
  cardContentHabit: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    fontSize: 18,
    lineHeight: 18,
    paddingTop: 8,
    top: 5,
  },
  itemContainer: {
    marginHorizontal: theme.spaces.defaultSpace,
    backgroundColor: "#fff", // Necessário para o Swipeable funcionar corretamente
  },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  concluded: {
    backgroundColor: theme.colors.green.base,
    fontSize: 12,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    color: theme.colors.white.base,
    width: 100,
    marginRight: theme.spaces.defaultSpace,
    // top: 12,
    marginTop: 10,
    borderRadius: 10,
  },
})

export default styles
