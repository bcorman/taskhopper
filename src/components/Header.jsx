import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Platform} from "react-native";

const Header = ({title, toggleShowComplete}) => {
  return (
    <View style={styles.header}>
      <View style={styles.title}>
        <Text style={styles.text}>Taskhopper</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={toggleShowComplete}>
        <Text style={{...styles.text, ...styles.buttonText}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === "android" ? 65 : 40,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    marginRight: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#686963",
  },
  buttonText: {
    fontSize: 14,
    textAlign: "center",
  },
});
export default Header;
