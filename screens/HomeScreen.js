import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import firestore from "@react-native-firebase/firestore"

const HomeScreen = () => {
  const [newTodo, setNewTodo] = useState('');
  const [items, setItems] = useState([]);
  const cTodos = firestore().collection("ToDos")
  const addNewTodo = ()=>{
    cTodos.add({
      title : newTodo,
      complete : false
    })
    .then(()=> console.log("Add new todo"))
    .catch(e=> console.log(e.message))
  }

  useEffect(()=>{
    cTodos.onSnapshot(
      listTodos=>{
        var result = []
        listTodos.forEach(
          todo =>{
            const {title,complete} = todo.data()
            result.push({
              id : todo.id,
              title,
              complete
            })
          }
        )
        //console.log(result)
        setItems(result)
      }
    )
  })

  const handleAddItem = () => {
    if (text.trim() !== '') {
      setItems([...items, text]);
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập dữ liệu..."
          onChangeText={setNewTodo}
          value={newTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={addNewTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {items.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.item, { textDecorationLine: item.complete ? 'line-through' : 'none' }]}
            onPress={() => toggleComplete(index)}
          >
            <Text>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  item: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
});


export default HomeScreen;