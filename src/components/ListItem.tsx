import React from "react"
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native"
import { Swipeable } from "react-native-gesture-handler"

interface ListItemProps {
  item: { id: number; name: string }
  onDelete: (id: number) => void
}

export default function ListItem({ item, onDelete }: ListItemProps) {
  const handleDelete = (id: number) => {
    Alert.alert(
      "Confirmar exclusão",
      "Tem certeza de que deseja excluir este item?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Confirmar", onPress: () => onDelete(id) },
      ],
      { cancelable: true },
    )
  }
  const renderLeftActions = () => (
    <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.leftAction}>
      <Text style={styles.actionText}>Delete</Text>
    </TouchableOpacity>
  )
  return (
    <Swipeable
      renderLeftActions={renderLeftActions}
      friction={3}
      enableTrackpadTwoFingerGesture
      leftThreshold={70}
    >
      <View style={styles.item}>
        <Text>{item.item.name}</Text>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    color: "#333",
    backgroundColor: "#fff",
  },
  leftAction: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
})
