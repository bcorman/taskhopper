import React from "react";
import {
  FlatList,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Platform,
} from "react-native";
import uuid from "react-native-uuid";
import TodoContainer from "./TodoContainer.jsx";
import NewTodoFooter from "../components/NewTodoFooter.jsx";
import {seedData} from "../seedData";

/* This container handles the bulk of the work in the app. 
It renders a View containing a KeyboardAvoidingView and the New Todo button footer
Inside the KeyboardAvoidingView a Flatlist handles the rendering of each Todo
*/

const TodosContainer = ({showComplete}) => {
  /* State keeps track of todos, as well as the id of the currently active todo.
 This id passed to the Options component (The vertical dots button where a todo's priority can be changed),
 and ensures that only one options menu is open at a time. */
  const [todos, setTodos] = React.useState(sort(seedData));
  const [openFormID, setFormID] = React.useState(null);

  // Sort todos by priority. If priorities are equal, sort by dateCreated
  function sort(todos) {
    return todos.sort(
      (a, b) => a.priority - b.priority || a.dateCreated - b.dateCreated,
    );
  }

  const addTodo = () => {
    // set formID to null to close any open forms
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
                  actions={{updateTodo, deleteTodo, setFormID}}
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
  contentContainer: {
    paddingBottom: 20,
  },
});

export default TodosContainer;
