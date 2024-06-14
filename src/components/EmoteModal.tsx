// EmoteModal.js
import React, { useState } from "react"
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons" // ou outra biblioteca de ícones

const emotes = [
  { id: "1", name: "face", code: "face" },
  { id: "2", name: "thumbs_up", code: "thumb_up" },
  { id: "3", name: "star", code: "star" },
  { id: "4", name: "favorite", code: "favorite" },
  { id: "5", name: "check_circle", code: "check_circle" },
  { id: "6", name: "pets", code: "pets" },
  { id: "7", name: "mood", code: "mood" },
  { id: "8", name: "whatshot", code: "whatshot" },
  { id: "9", name: "accessibility", code: "accessibility" },
  { id: "10", name: "build", code: "build" },
]

const EmoteModal = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedEmote, setSelectedEmote] = useState(null)

  const openModal = (emote) => {
    setSelectedEmote(emote)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setSelectedEmote(null)
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={emotes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item} onPress={() => openModal(item)}>
            <Icon name={item.code} size={30} />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Selected Emote</Text>
            {selectedEmote && (
              <>
                <Icon name={selectedEmote.code} size={50} />
                <Text style={styles.modalText}>{selectedEmote.name}</Text>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  itemText: {
    marginLeft: 10,
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 18,
    marginTop: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
})

export default EmoteModal
