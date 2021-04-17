import React from "react";
import {StyleSheet, View} from "react-native";
import TextEditor from "../components/TextEditor";
import StatusContainer from "./StatusContainer";
import Options from "../components/Options";

const TodoContainer = ({todo, openFormID, actions}) => {
  // Set todo to active if it contains no text
  const [isActive, setActive] = React.useState(!todo.text || false);
  const backgroundColor = ["#ff7a7a", "#fdffc7", "#b3e8ff"][todo.priority];
  const toggleComplete = () => {
    if (todo.text) {
      actions.updateTodo(todo.id, {
        complete: !todo.complete,
      });
    }
  };

  return (
    <View style={{...styles.container, backgroundColor}}>
      <StatusContainer
        data={{complete: todo.complete, id: todo.id}}
        toggleComplete={toggleComplete}
      />
      <TextEditor data={{todo, isActive}} actions={{...actions, setActive}} />
      <Options
        data={{priority: todo.priority, id: todo.id, openFormID}}
        setFormID={actions.setFormID}
        updateTodo={actions.updateTodo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default TodoContainer;
