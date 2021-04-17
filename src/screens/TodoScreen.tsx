import React from "react";
import {StyleSheet, View} from "react-native";
import Header from "../components/Header";
import TodosContainer from "../containers/TodosContainer";

const TodoScreen = () => {
  const [showComplete, toggleShowComplete] = React.useState(false);

  return (
    <View style={styles.container}>
      <Header
        title={showComplete ? "Show Incomplete" : "Show Complete"}
        toggleShowComplete={() => toggleShowComplete(show => !show)}
      />
      <TodosContainer showComplete={showComplete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
  },
});

export default TodoScreen;
