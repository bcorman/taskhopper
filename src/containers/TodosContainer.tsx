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
import {Todo, Todos} from "../shared/interfaces/Todos.interface";
/* This container handles the bulk of the work in the app. 
It renders a View containing a KeyboardAvoidingView and the New Todo button footer
Inside the KeyboardAvoidingView a Flatlist handles the rendering of each Todo
*/

const TodosContainer = ({showComplete}) => {
  /* State keeps track of todos, as well as the id of the currently active todo.
 This id passed to the Options component (The vertical dots button where a todo's priority can be changed),
 and ensures that only one options menu is open at a time. */
  const [todos, setTodos] = React.useState(seedData);
  const [openFormID, setFormID] = React.useState(null);

  // Flatlist needs the todos as an array
  function listSortedTodos(todoItems: Todos): Todo[] {
    return Object.keys(todoItems)
      .map(todoID => todoItems[todoID])
      .sort(
        (a, b) =>
          a.priority - b.priority ||
          a.dateCreated.valueOf() - b.dateCreated.valueOf(),
      );
  }

  const addTodo = () => {
    // set formID to null to close any open forms
    setFormID(null);
    const id = uuid.v4().toString();
    const newTodo = {
      text: "",
      complete: false,
      priority: 0,
      dateCreated: new Date(),
      id,
    };

    setTodos(prevTodos => {
      // create shallow copy of todos in state, then add new todo
      return {...prevTodos, [id]: newTodo};
    });
  };

  const deleteTodo = id => {
    setTodos(prevTodos => {
      // make shallow copy, then delete
      const updatedTodos = {...prevTodos};
      delete updatedTodos[id];
      return updatedTodos;
    });
  };

  const updateTodo = (id: string, update: {}) => {
    setTodos(prevTodos => {
      const updatedTodo = {
        [id]: {
          ...prevTodos[id],
          ...update,
        },
      };
      return {...prevTodos, ...updatedTodo};
    });
  };

  const showTodos = (showCompletedTodos: boolean) => {
    // Get an array of the todos object in state, then sort array by priority
    // The todos in state are not mutated, only the array being mapped from them is being sorted
    const listedTodos = listSortedTodos(todos);
    const newTodo = listedTodos.filter(todo => todo.text === "");
    const incomplete = listedTodos.filter(todo => !todo.complete && todo.text);
    const complete = listedTodos.filter(
      todo => showCompletedTodos && todo.complete,
    );

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
