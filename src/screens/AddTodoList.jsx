import axios from "axios";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";



const AddTodoScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  const handleSubmit = async () => {
    // Logic to add the todo item
    // Navigate back or show success message
    const response = await axios.post("http://localhost:3002/api/todo", {
      title: title,
      description: description,
    });
    alert('Successfully Added')
    navigation.navigate('TodoList')
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />
      <TouchableOpacity
        style={
          description === "" || title === ""
            ? styles.addButtonDisabled
            : styles.addButton
        }
        disabled={description === "" || title === ""}
        onPress={handleSubmit}
      >
        <Text style={styles.addButtonText}>Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    color:'#222222',
    fontSize: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    color:"#222222"
  },
  input: {
    borderWidth: 1,
    // borderColor: "gray",
    borderRadius: '4px',
     border: '1px #B3B3B9 solid',
    marginBottom: 20,
    padding: 10,
  },
  radioContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  radioText: {
    marginRight: 10,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 10,
  },
  radioSelected: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: "blue",
  },
  addButton: {
    backgroundColor: "#337529",
    padding: 10,
    alignItems: "center",
  },
  addButtonDisabled: {
    backgroundColor: "rgb(149 205 158)",
    padding: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 18,
  },
});

export default AddTodoScreen;
