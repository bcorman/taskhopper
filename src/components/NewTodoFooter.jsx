import React from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class NewTodoFooter extends React.Component {
  addTodo = () => this.props.addTodo();
  render() {
    return (
      <TouchableOpacity
        style={styles.pressable}
        onPressIn={() =>
          setTimeout(() => {
            this.addTodo();
          }, 120)
        }>
        <View style={styles.container}>
          <Icon.Button
            name="add-circle-outline"
            style={styles.button}
            backgroundColor="rgba(0,0,0,0)"
            color={"blue"}
            underlayColor="rgba(0,0,0,0)"
            size={40}
            onPress={this.addTodo}
          />
          <Text style={styles.text}>New Todo</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

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
  },
  pressable: {},
});
