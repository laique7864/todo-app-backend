import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const navigation = useNavigation();
  const fetchData = async () => {
    try {
      // Replace with your API endpoint
      const response = await axios.get("http://localhost:3002/api/todos");
      console.log(response);
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchData();
  
      // Optional: Return a cleanup function if needed
      return () => {
        // Cleanup if necessary
      };
    }, [])
  );
  const handeDelete = async (id) => {
    const response = await axios.delete(`http://localhost:3002/api/todo/${id}`);
    fetchData();
    alert("delete succes");
  };
  const handelUpdate = async (id) => {
    const response = await axios.put(`http://localhost:3002/api/todo/${id}`, {
      completed: true,
    });
    fetchData();
    alert("Completed Success");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton}>
        <Text
          style={styles.addButtonText}
          onPress={() => navigation.navigate("AddTodo")}
        >
          Add Todo
        </Text>
      </TouchableOpacity>
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={item.completed ? styles.completed : styles.pending}>
                {item.completed ? "Completed" : "Pending"}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handelUpdate(item._id)}
              >
                <Text style={styles.buttonText}>Complete</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handeDelete(item._id)}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEF4",
    justifyContent: "center",
  },
  listItem: {
    backgroundColor: "#FFFF",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#555",
  },
  completed: {
    color: "green",
  },
  pending: {
    color: "red",
  },
  addButton: {
    backgroundColor: "#337529", // A pleasant green color
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    flex: 1, // less space than text
  },
  textContainer: {
    flex: 3, // gives more space to text
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: "#35752B", // Yellow color for edit
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#FF6F6F", // Red color for delete
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  detailsButton: {
    backgroundColor: "#4CAF50", // Green color for details
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    alignSelf: "stretch",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
