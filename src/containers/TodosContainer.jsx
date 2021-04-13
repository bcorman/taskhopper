import React from "react";
import {
  FlatList,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from "react-native";
import uuid from "react-native-uuid";
import TodoContainer from "./TodoContainer";
import NewTodoFooter from "../components/NewTodoFooter";
import Options from "../components/Options";
import {seedData} from "../seedData";

const TodosContainer = ({showComplete}) => {
  const [todos, setTodos] = React.useState(sort(seedData));
  const [openFormID, setFormID] = React.useState(null);

  function sort(todos) {
    return todos.sort(
      (a, b) => a.priority - b.priority || a.dateCreated - b.dateCreated,
    );
  }

  const addTodo = () => {
    // If a new todo is added, close any open forms
    setFormID(null);
    const newTodo = {
      text: "",
      complete: false,
      priority: 0,
      id: uuid.v4(),
      dateCreated: new Date(),
    };
    setTodos(prevTodos => sort([...prevTodos, newTodo]));
  };

  const deleteTodo = id => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== id);
    });
  };

  const updateTodo = (id, update) => {
    setTodos(prevTodos => {
      return sort(
        prevTodos.map(todo => {
          return todo.id === id ? {...todo, ...update} : todo;
        }),
      );
    });
  };

  const showTodos = showComplete => {
    const newTodo = todos.filter(todo => todo.text === "");
    const incomplete = todos.filter(todo => !todo.complete && todo.text);
    const complete = todos.filter(todo => showComplete && todo.complete);

    return newTodo.length
      ? [...incomplete, ...newTodo, ...complete]
      : [...incomplete, ...complete];
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        style={styles.keyboard}>
        <FlatList
          data={showTodos(showComplete)}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.contentContainer}
          renderItem={({item}) => (
            <View style={styles.combinedContainer}>
              <View style={styles.todoContainer}>
                <TodoContainer
                  todo={item}
                  openFormID={openFormID}
                  setFormID={id => setFormID(id)}
                  actions={{updateTodo, deleteTodo}}
                />
              </View>
              <View style={styles.optionsContainer}>
                <Options
                  priority={item.priority}
                  id={item.id}
                  openFormID={openFormID}
                  setFormID={setFormID}
                  updateTodo={updateTodo}
                />
              </View>
            </View>
          )}
        />
      </KeyboardAvoidingView>
      <NewTodoFooter addTodo={addTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  combinedContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
    marginVertical: Platform.OS === "android" ? 12 : 9,
  },
  keyboard: {
    flex: 1,
  },
  todoContainer: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  optionsContainer: {
    zIndex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
});

export default TodosContainer;
