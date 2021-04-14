import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const NewTodoFooter = ({addTodo}) => {
  return (
    <TouchableOpacity
      style={styles.pressable}
      onPressIn={() =>
        // add a slight delay so the button animation is visible
        setTimeout(() => {
          addTodo();
        }, 120)
      }>
      <View style={styles.container}>
        <Icon.Button
          name="add-circle-outline"
          style={styles.button}
          backgroundColor="#FAFAFA"
          color={"#223843"}
          underlayColor="#FAFAFA"
          size={40}
          onPress={addTodo}
        />
        <Text style={[styles.text, styles.color]}>New Todo</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 2,
  },
  button: {
    marginLeft: 5,
  },
  text: {
    marginLeft: 5,
    fontSize: 24,
    fontWeight: "500",
  },
  color: {
    color: "#223843",
  },
});

export default NewTodoFooter;
