import { useEffect, useState } from "react";
import { Button, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native-web";
import { alugarLivro, getLivros } from "../services/api.js";
import { StyleSheet, Modal } from "react-native";

export default function HomeScreen({ navigation }) {
    const [books, setBooks] = useState([]);

    const [nome, setNome] = useState("");
    const [aniversario, setAniversario] = useState("");
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");
    const [isAlertVisible, setIsAlertVisible] = useState(false);


    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };
  
    const toggleAlert = () => {
        setIsAlertVisible(!isAlertVisible);
    };

    const getData = async () => {
        const data = await getLivros();

        setBooks(data);
    }

    const handleSubmit = async () => {
      if (!nome.trim() || !aniversario.trim()) {
          setAlertMessage("Por favor, preencha todos os campos.");
          setIsAlertVisible(true);
          return;
      }
      try {
          const data = await alugarLivro(selectedBook, nome, aniversario);
          setAlertMessage(data.message); 
          setIsModalVisible(false); 
          setIsAlertVisible(true); 
          getData();
          
          setNome("");
          setAniversario("");
      } catch (error) {
          setAlertMessage("Ocorreu um erro ao tentar alugar o livro. Tente novamente.");
          setIsAlertVisible(true);
      }
  };

    useEffect(() => {
        getData()
    }, [])
    
    return (
       <View
            style={styles.container}
       >
            <ScrollView
                contentContainerStyle={styles.scrollView}
            >
                {books.map((item) => (
                   <View style={styles.card} key={item.id}>
                   <View style={styles.cardHeader}>
                       <Text style={styles.cardTitle}>{item.titulo}</Text>
                   </View>
                   <View style={styles.cardContent}>
                       <Text style={styles.cardText}>Autor: {item.autor}</Text>
                       <Text style={styles.cardText}>Ano de Lançamento: {item.ano}</Text>
                       <Text style={styles.cardText}>Quantidade Disponível: {item.quantidade}</Text>
                   </View>
                   <TouchableOpacity style={styles.button} onPress={() => [setIsModalVisible(true), setSelectedBook(item.id)]}>
                       <Text style={styles.buttonText}>Emprestar</Text>
                   </TouchableOpacity>
               </View>
                ))}  
            </ScrollView>

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={toggleModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Informações do Empréstimo</Text>
                        <Text style={styles.modalBookTitle}>
                            Livro: {selectedBook?.titulo}
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite seu nome completo"
                            value={nome}
                            onChangeText={setNome}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Digite sua data de nascimento"
                            value={aniversario}
                            onChangeText={setAniversario}
                        />
                        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                            <Text style={styles.buttonText}>Confirmar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={toggleModal}
                        >
                            <Text style={styles.buttonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal
                visible={isAlertVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={toggleAlert}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Aviso</Text>
                        <Text style={styles.alertMessage}>{alertMessage}</Text>
                        <TouchableOpacity style={styles.button} onPress={toggleAlert}>
                            <Text style={styles.buttonText}>Fechar</Text>
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
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
  },
  scrollView: {
      flexGrow: 1,
      justifyContent: 'center',  
      alignItems: 'center',      
      backgroundColor: '#f0f0f0',
      padding: 20,
  },
  card: {
      backgroundColor: '#fff',
      borderRadius: 10,
      width: '80%',
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderLeftWidth: 5,
      borderColor: '#007BFF', 
      padding: 15,
  },
  cardHeader: {
      borderBottomWidth: 2,
      borderBottomColor: '#007BFF',
      paddingBottom: 10,
      marginBottom: 10,
  },
  cardTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
  },
  cardContent: {
      marginTop: 10,
  },
  cardText: {
      fontSize: 16,
      marginBottom: 8,
      color: '#555',
  },
  button: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 15,
  },
  buttonText: {
      color: '#fff',
      fontSize: 16,
  },
  modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
  },
  modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      width: "80%",
      alignItems: "center",
  },
  modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
  },
  modalBookTitle: {
      fontSize: 18,
      marginBottom: 10,
      color: "#555",
  },
  input: {
      width: "100%",
      height: 40,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
      paddingLeft: 10,
  },
  cancelButton: {
      backgroundColor: "#FF4D4D",
  },
});